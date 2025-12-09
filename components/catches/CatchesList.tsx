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

type Props = {
  data: CatchItem[];
  title?: string;
};

export default function CatchesList({ data, title = "All Catches" }: Props) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <Text
        style={{
          color: "#E5E7EB",
          fontSize: 18,
          fontWeight: "700",
          marginTop: 20,
          marginBottom: 10,
        }}
      >
        {title}
      </Text>

      <FlatList
        data={data}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <CatchRow item={item} onImagePress={setSelectedImage} />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        scrollEnabled={false}
        contentContainerStyle={{ paddingTop: 4 }}
      />

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
