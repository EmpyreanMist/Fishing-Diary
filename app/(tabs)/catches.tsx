import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, Modal } from "react-native";
import TopBar from "@/components/catches/TopBar";
import SearchFilterCard from "@/components/catches/SearchFilterCard";
import StatsRow from "@/components/catches/StatRow";
import CatchesList from "@/components/catches/CatchesList";
import { DUMMY_CATCHES } from "@/components/catches/dummy/dummyCatches";
import CreateCatchContainer from "@/components/addCatch/CreateCatchContainer";
import { supabase } from "@/lib/supabase";
import type { CatchRow } from "../../components/common/types";
import type { CatchItem } from "../../components/common/types";

export default function CatchesScreen() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [catches, setCatches] = useState<CatchItem[]>([]);

  useEffect(() => {
    fetchCatches();
  }, []);

  async function fetchCatches() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("catches")
      .select("*")
      .eq("user_id", user.id);

    if (error) {
      console.error("Error fetching catches:", error);
      return;
    }

    const mapped = data.map(mapCatch);
    setCatches(mapped);
  }

  function mapCatch(row: CatchRow): CatchItem {
    return {
      id: row.id,
      species: row.fish_species_id?.toString() ?? "Unknown",
      weight: row.weight_kg ? `${row.weight_kg} kg` : "—",
      length: row.length_cm ? `${row.length_cm} cm` : "—",
      lake: row.location_name ?? "—",
      date: row.caught_at ? new Date(row.caught_at).toLocaleDateString() : "—",
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
      >
        <SearchFilterCard />
        <StatsRow
          total={`${DUMMY_CATCHES.length}`}
          biggest={"2.3 kg"}
          species={"3"}
        />
        <CatchesList data={DUMMY_CATCHES} />
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
