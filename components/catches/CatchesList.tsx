import React, { useState } from "react";
import {
  FlatList,
  Text,
  View,
  Modal,
  Pressable,
  Image,
  StyleSheet,
} from "react-native";
import CatchRow from "./CatchRow";
import type { CatchItem } from "../../components/common/types";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
  data: CatchItem[];
  title?: string;
};

export default function CatchesList({ data, title = "All Catches" }: Props) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      {/* STATIC BACKGROUND CONTAINER — same as RecentCatches */}
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>

        <FlatList
          data={data}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <LinearGradient
              colors={["#1A2732", "#0E141B"]} // SAME gradient as RecentCatches
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.card}
            >
              <CatchRow item={item} onImagePress={setSelectedImage} />
            </LinearGradient>
          )}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          scrollEnabled={false}
          contentContainerStyle={{ paddingTop: 4 }}
        />
      </View>

      <Modal
        visible={selectedImage !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedImage(null)}
      >
        <Pressable
          style={styles.modalBackground}
          onPress={() => setSelectedImage(null)}
        >
          <Image source={{ uri: selectedImage! }} style={styles.fullImage} />
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  // SAME container as RecentCatches
  container: {
    backgroundColor: "#121B22",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#1E2A38",
    marginTop: 20,
  },

  title: {
    color: "#E5E7EB",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },

  // SAME card style as RecentCatches.card
  card: {
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: "#1C2E40",
  },

  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.85)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: {
    width: "90%",
    height: "70%",
    resizeMode: "contain",
    borderRadius: 12,
  },
});
