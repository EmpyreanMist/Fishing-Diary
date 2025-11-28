import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Modal } from "react-native";
import TopBar from "@/components/catches/TopBar";
import SearchFilterCard from "@/components/catches/SearchFilterCard";
import StatsRow from "@/components/catches/StatRow";
import CatchesList from "@/components/catches/CatchesList";
import { DUMMY_CATCHES } from "@/components/catches/dummy/dummyCatches";
import CreateCatchContainer from "@/components/addCatch/CreateCatchContainer";

export default function CatchesScreen() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <View style={styles.screen}>
      <TopBar
        subtitle={`${DUMMY_CATCHES.length} catches logged`}
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
