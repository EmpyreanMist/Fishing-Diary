import React, { useState, useCallback } from "react";
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
              id,
              weight_kg,
              length_cm,
              location_name,
              caught_at,
              notes,
              catch_photos ( image_url ),
              fish_species ( english_name ),
              lures!catches_lure_id_fkey ( name, brand )
            `
            )
            .eq("user_id", user.id)
            .order("caught_at", { ascending: false });

          if (error) throw error;

          if (isActive && data) {
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

  function mapCatch(c: CatchRow): CatchItem {
    const species = Array.isArray(c.fish_species)
      ? c.fish_species[0]?.english_name
      : c.fish_species?.english_name;

    const lureObj = Array.isArray(c.lures) ? c.lures[0] : c.lures;

    const lure = lureObj
      ? lureObj.brand
        ? `${lureObj.brand} ${lureObj.name}`
        : lureObj.name
      : null;

    return {
      id: c.id.toString(),
      species: species ?? "Unknown",
      weight: c.weight_kg ? `${c.weight_kg} kg` : "—",
      length: c.length_cm ? `${c.length_cm} cm` : "—",
      lake: c.location_name ?? "—",
      date: c.caught_at
        ? new Date(c.caught_at).toLocaleDateString("sv-SE")
        : "—",
      photos: c.catch_photos?.map((p) => p.image_url) ?? [],
      lure,
      notes: c.notes ?? null,
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
