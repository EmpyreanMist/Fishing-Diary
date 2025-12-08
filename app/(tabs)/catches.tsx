import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Modal,
  ActivityIndicator,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";

import TopBar from "@/components/catches/TopBar";
import SearchFilterCard from "@/components/catches/SearchFilterCard";
import StatsRow from "@/components/catches/StatRow";
import CatchesList from "@/components/catches/CatchesList";
import CreateCatchContainer from "@/components/addCatch/CreateCatchContainer";

import { supabase } from "@/lib/supabase";
import type { CatchRow, CatchItem } from "../../components/common/types";

export default function CatchesScreen() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [catches, setCatches] = useState<CatchItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      async function load() {
        try {
          setLoading(true);
          setErrorMsg(null);

          const { data: auth } = await supabase.auth.getUser();
          const user = auth.user;

          if (!user) {
            setErrorMsg("You must be logged in to see your catches.");
            return;
          }

          const { data, error } = await supabase
            .from("catches")
            .select(
              `
              *,
              catch_photos ( image_url ),
              fish_species ( english_name, swedish_name )
            `
            )
            .eq("user_id", user.id)
            .order("caught_at", { ascending: false });

          if (error) throw error;

          if (isActive) {
            setCatches(data.map(mapCatch));
          }
        } catch (err) {
          console.error("Catches load error:", err);
          setErrorMsg("Failed to load catches.");
        } finally {
          if (isActive) setLoading(false);
        }
      }

      load();

      return () => {
        isActive = false;
      };
    }, [])
  );

  function mapCatch(row: CatchRow): CatchItem {
    return {
      id: row.id,
      species: row.fish_species?.english_name ?? "Unknown",
      weight: row.weight_kg ? `${row.weight_kg} kg` : "—",
      length: row.length_cm ? `${row.length_cm} cm` : "—",
      lake: row.location_name ?? "—",
      date: row.caught_at ? new Date(row.caught_at).toLocaleDateString() : "—",
      photos: row.catch_photos?.map((p) => p.image_url) ?? [],
    };
  }

  function getSpeciesCount(list: CatchItem[]) {
    return new Set(list.map((c) => c.species)).size.toString();
  }

  function getBiggestCatch(list: CatchItem[]) {
    const weights = list
      .map((c) => parseFloat(c.weight))
      .filter((n) => !isNaN(n));
    return weights.length ? `${Math.max(...weights)} kg` : "—";
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.safe} edges={[]}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#5ACCF2" />
          <Text style={styles.loadingText}>Loading catches…</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (errorMsg) {
    return (
      <SafeAreaView style={styles.safe} edges={[]}>
        <View style={styles.center}>
          <Text style={styles.errorText}>{errorMsg}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <TopBar
        subtitle={`${catches.length} catches logged`}
        onAddCatch={() => setShowCreateModal(true)}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
      >
        <SearchFilterCard />

        <StatsRow
          total={`${catches.length}`}
          biggest={getBiggestCatch(catches)}
          species={getSpeciesCount(catches)}
        />

        <CatchesList data={catches} />

        <View style={{ height: 24 }} />
      </ScrollView>

      <Modal
        visible={showCreateModal}
        animationType="slide"
        onRequestClose={() => setShowCreateModal(false)}
      >
        <CreateCatchContainer onClose={() => setShowCreateModal(false)} />
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#0A121A",
  },
  scroll: { flex: 1 },
  scrollContent: { padding: 16 },
  center: {
    flex: 1,
    backgroundColor: "#0A121A",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  loadingText: {
    marginTop: 10,
    color: "#98A6B3",
  },
  errorText: {
    color: "#FF6B6B",
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 20,
  },
});
