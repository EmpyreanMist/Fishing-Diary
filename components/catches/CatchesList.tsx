import React from "react";
import { FlatList, Text, View } from "react-native";
import CatchRow from "./CatchRow";
import type { CatchItem } from "./types/catch";

type Props = {
  data: CatchItem[];
  title?: string;
};

/**
 * Renders a titled, non-scrollable list of catch items.
 *
 * Displays a header with the provided `title` and a FlatList of `data` where each item is rendered via `CatchRow`.
 *
 * @param data - The array of catch items to display.
 * @param title - Optional header text shown above the list; defaults to "All Catches".
 * @returns A React element containing the header and a non-scrollable list of catches.
 */
export default function CatchesList({ data, title = "All Catches" }: Props) {
  return (
    <>
      <Text style={{
        color: "#E5E7EB",
        fontSize: 18,
        fontWeight: "700",
        marginTop: 20,
        marginBottom: 10,
      }}>
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