import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Modal,
  RefreshControl,
} from "react-native";
import TopBar from "@/components/catches/TopBar";
import SearchFilterCard from "@/components/catches/SearchFilterCard";
import StatsRow from "@/components/catches/StatRow";
import CatchesList from "@/components/catches/CatchesList";
import CreateCatchContainer from "@/components/addCatch/CreateCatchContainer";
import { supabase } from "@/lib/supabase";
import type { CatchRow } from "../../components/common/types";
import type { CatchItem } from "../../components/common/types";

export default function CatchesScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [catches, setCatches] = useState<CatchItem[]>([]);

  useEffect(() => {
    fetchCatches();
  }, []);

  async function onRefresh() {
    setRefreshing(true);
    await fetchCatches();
    setRefreshing(false);
  }

  async function fetchCatches() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("catches")
      .select(
        `
    *,
    catch_photos ( image_url ),
    fish_species ( swedish_name, english_name )
  `
      )
      .eq("user_id", user.id)
      .order("caught_at", { ascending: false });

    if (error || !data) {
      console.error("Error fetching catches:", error);
      return;
    }

    const mapped = data.map(mapCatch);
    setCatches(mapped);
  }

  function getSpeciesCount(list: CatchItem[]) {
    const set = new Set(list.map((c) => c.species));
    return set.size.toString();
  }

  function getBiggestCatch(list: CatchItem[]) {
    const weights = list
      .map((c) => parseFloat(c.weight))
      .filter((n) => !isNaN(n));

    if (weights.length === 0) return "—";

    return `${Math.max(...weights)} kg`;
  }

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

  return (
    <View style={styles.screen}>
      <TopBar
        subtitle={`${catches.length} catches logged`}
        onAddCatch={() => setShowCreateModal(true)}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#5ACCF2"
            colors={["#5ACCF2"]}
          />
        }
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
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#0A121A" },
  scroll: { flex: 1 },
  scrollContent: { padding: 16 },
});
