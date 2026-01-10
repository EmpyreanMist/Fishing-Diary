import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Modal, Pressable, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../../lib/supabase";
import CatchCard from "../common/CatchCard";
import type { CatchItem, CatchRow } from "../common/types";

export default function RecentCatches({
  refreshSignal,
}: {
  refreshSignal: number;
}) {
  const [recentCatches, setRecentCatches] = useState<CatchItem[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    fetchRecentCatches();
  }, [refreshSignal]);

  async function fetchRecentCatches(): Promise<void> {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

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
        fish_species ( id, english_name ),
        lures!catches_lure_id_fkey ( name, brand )
      `
      )
      .eq("user_id", user.id)
      .order("caught_at", { ascending: false })
      .limit(3);

    if (error || !data) {
      return;
    }

    const mapped = data.map((c: CatchRow) => {
      const speciesRow = Array.isArray(c.fish_species)
        ? c.fish_species[0]
        : c.fish_species;
      const species = speciesRow?.english_name?.trim() || "Unknown";
      const speciesId = speciesRow ? String(speciesRow.id) : "unknown";

      const lureObj = Array.isArray(c.lures) ? c.lures[0] : c.lures;

      const lure = lureObj
        ? lureObj.brand
          ? `${lureObj.brand} ${lureObj.name}`
          : lureObj.name
        : "-";

      const notes = c.notes?.trim();

      return {
        id: c.id.toString(),
        speciesId,
        species,
        weight:
          typeof c.weight_kg === "number" ? `${c.weight_kg} kg` : "-",
        length:
          typeof c.length_cm === "number" ? `${c.length_cm} cm` : "-",
        lake: c.location_name?.trim() || "-",
        date: c.caught_at
          ? new Date(c.caught_at).toLocaleDateString("en-US")
          : "-",
        photos:
          c.catch_photos?.map((p) => p.image_url).filter(Boolean) ?? [],
        lure,
        notes: notes && notes.length > 0 ? notes : "-",
      };
    });
    setRecentCatches(mapped);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="fish-outline" size={20} color="#5ACCF2" />
        <Text style={styles.title}>Recent Catches</Text>
      </View>

      <Text style={styles.subtitle}>Your latest fishing successes</Text>

      <View style={{ gap: 12, marginTop: 12 }}>
        {recentCatches.length === 0 ? (
          <Text style={{ color: "#A5B2C4" }}>No recent catches yet.</Text>
        ) : (
          recentCatches.map((item) => (
            <CatchCard
              key={item.id}
              item={item}
              onImagePress={(url: string) => setSelectedImage(url)}
            />
          ))
        )}
      </View>

      <Modal visible={selectedImage !== null} transparent animationType="fade">
        <Pressable
          style={styles.modalBackground}
          onPress={() => setSelectedImage(null)}
        >
          {selectedImage && (
            <Image source={{ uri: selectedImage }} style={styles.fullImage} />
          )}
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121B22",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: "#1E2A38",
    marginTop: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  title: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
    marginLeft: 6,
  },
  subtitle: {
    color: "#A5B2C4",
    fontSize: 13,
  },

  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.85)",
    alignItems: "center",
    justifyContent: "center",
  },
  fullImage: {
    width: "90%",
    height: "70%",
    borderRadius: 12,
    resizeMode: "contain",
  },
});
