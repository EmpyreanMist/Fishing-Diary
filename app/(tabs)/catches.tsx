import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import TopBar from "@/components/catches/TopBar";
import SearchFilterCard from "@/components/catches/SearchFilterCard";
import StatsRow from "@/components/catches/StatRow";
import CatchesList from "@/components/catches/CatchesList";
import { DUMMY_CATCHES } from "@/components/catches/dummy/dummyCatches";

export default function CatchesScreen() {
  return (
    <View style={styles.screen}>
      <TopBar subtitle={`${DUMMY_CATCHES.length} catches logged`} onAddPress={() => {}} />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <SearchFilterCard />
        <StatsRow total={`${DUMMY_CATCHES.length}`} biggest={"2.3 kg"} species={"3"} />
        <CatchesList data={DUMMY_CATCHES} />
        <View style={{ height: 24 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#0A121A" },
  scroll: { flex: 1 },
  scrollContent: { padding: 16 },
});
