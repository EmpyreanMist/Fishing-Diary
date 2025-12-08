import React from "react";
import { FlatList, Text, View } from "react-native";
import CatchRow from "./CatchRow";
import type { CatchItem } from "../../components/common/types";

type Props = {
  data: CatchItem[];
  title?: string;
};

export default function CatchesList({ data, title = "All Catches" }: Props) {
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
        renderItem={({ item }) => <CatchRow item={item} />}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        scrollEnabled={false}
        contentContainerStyle={{ paddingTop: 4 }}
      />
    </>
  );
}
