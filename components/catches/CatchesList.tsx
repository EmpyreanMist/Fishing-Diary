import React, { useState } from "react";
import {
  FlatList,
  View,
  Modal,
  Pressable,
  Image,
  StyleSheet,
  Text,
} from "react-native";
import CatchCard from "../common/CatchCard";
import type { CatchItem } from "../../components/common/types";

type Props = {
  data: CatchItem[];
  title?: string;
};

export default function CatchesList({ data, title = "All Catches" }: Props) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>

        <FlatList
          data={data}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <CatchCard item={item} onImagePress={setSelectedImage} />
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
