import React, { useState, useCallback, useMemo } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Modal,
  ActivityIndicator,
  Text,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";

import { BaseHeader } from "@/components/common/BaseHeader";
import ActionButton from "@/components/ui/ActionButton";
import SearchFilterCard from "@/components/catches/SearchFilterCard";
import StatsRow from "@/components/catches/StatRow";
import CatchesList from "@/components/catches/CatchesList";
import CreateCatchContainer from "@/components/addCatch/CreateCatchContainer";

import { supabase } from "@/lib/supabase";
import type { CatchRow, CatchItem } from "../../components/common/types";

type SortOption =
  | "date_desc"
  | "date_asc"
  | "weight_desc"
  | "weight_asc"
  | "length_desc"
  | "length_asc";

type DropdownItem = {
  label: string;
  value: string;
};

const EMPTY_VALUE = "-";

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: "Date (newest)", value: "date_desc" },
  { label: "Date (oldest)", value: "date_asc" },
  { label: "Weight (heaviest)", value: "weight_desc" },
  { label: "Weight (lightest)", value: "weight_asc" },
  { label: "Length (longest)", value: "length_desc" },
  { label: "Length (shortest)", value: "length_asc" },
];

function parseNumber(value: string): number | null {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function parseDate(value: string): number | null {
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function compareMaybeNumber(
  a: number | null,
  b: number | null,
  direction: 1 | -1
) {
  if (a === null && b === null) return 0;
  if (a === null) return 1;
  if (b === null) return -1;
  if (a === b) return 0;
  return direction * (a - b);
}

function isSortOption(value: string): value is SortOption {
  return SORT_OPTIONS.some((option) => option.value === value);
}

export default function CatchesScreen() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [catches, setCatches] = useState<CatchItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [speciesIdFilter, setSpeciesIdFilter] = useState("");
  const [sort, setSort] = useState<SortOption>("date_desc");

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      async function load() {
        try {
          setLoading(true);
          setErrorMsg(null);

          const { data: auth } = await supabase.auth.getUser();
          const user = auth.user;

          if (!user) {
            setErrorMsg("You must be logged in to see your catches.");
            return;
          }

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
            .order("caught_at", { ascending: false });

          if (error) throw error;

          if (isActive) {
            setCatches((data ?? []).map(mapCatch));
          }
        } catch (err) {
          console.error("Catches load error:", err);
          setErrorMsg("Failed to load catches.");
        } finally {
          if (isActive) setLoading(false);
        }
      }

      load();

      return () => {
        isActive = false;
      };
    }, [])
  );

  function mapCatch(c: CatchRow): CatchItem {
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
      : EMPTY_VALUE;

    const notes = c.notes?.trim();

    return {
      id: c.id.toString(),
      speciesId,
      species,
      weight:
        typeof c.weight_kg === "number" ? `${c.weight_kg} kg` : EMPTY_VALUE,
      length:
        typeof c.length_cm === "number" ? `${c.length_cm} cm` : EMPTY_VALUE,
      lake: c.location_name?.trim() || EMPTY_VALUE,
      date: c.caught_at
        ? new Date(c.caught_at).toLocaleDateString("sv-SE")
        : EMPTY_VALUE,
      photos: c.catch_photos?.map((p) => p.image_url).filter(Boolean) ?? [],
      lure,
      notes: notes && notes.length > 0 ? notes : EMPTY_VALUE,
    };
  }

  function getSpeciesCount(list: CatchItem[]) {
    return new Set(list.map((c) => c.speciesId)).size.toString();
  }

  function getBiggestCatch(list: CatchItem[]) {
    const weights = list
      .map((c) => parseNumber(c.weight))
      .filter((n): n is number => n !== null);
    return weights.length ? `${Math.max(...weights)} kg` : EMPTY_VALUE;
  }

  const speciesOptions: DropdownItem[] = useMemo(() => {
    const map = new Map<string, string>();
    catches.forEach((item) => {
      if (!map.has(item.speciesId)) {
        map.set(item.speciesId, item.species);
      }
    });

    const options = Array.from(map.entries()).map(([value, label]) => ({
      label,
      value,
    }));

    options.sort((a, b) => a.label.localeCompare(b.label));

    return [{ label: "All species", value: "" }, ...options];
  }, [catches]);

  const filteredCatches = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const filtered = catches.filter((item) => {
      if (speciesIdFilter && item.speciesId !== speciesIdFilter) return false;
      if (!normalizedQuery) return true;

      const haystack = `${item.species} ${item.lake}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });

    return [...filtered].sort((a, b) => {
      switch (sort) {
        case "date_desc":
          return compareMaybeNumber(parseDate(a.date), parseDate(b.date), -1);
        case "date_asc":
          return compareMaybeNumber(parseDate(a.date), parseDate(b.date), 1);
        case "weight_desc":
          return compareMaybeNumber(
            parseNumber(a.weight),
            parseNumber(b.weight),
            -1
          );
        case "weight_asc":
          return compareMaybeNumber(
            parseNumber(a.weight),
            parseNumber(b.weight),
            1
          );
        case "length_desc":
          return compareMaybeNumber(
            parseNumber(a.length),
            parseNumber(b.length),
            -1
          );
        case "length_asc":
          return compareMaybeNumber(
            parseNumber(a.length),
            parseNumber(b.length),
            1
          );
        default:
          return 0;
      }
    });
  }, [catches, query, speciesIdFilter, sort]);

  function handleSortChange(value: string) {
    if (isSortOption(value)) {
      setSort(value);
    }
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.safe} edges={[]}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#5ACCF2" />
          <Text style={styles.loadingText}>Loading catches...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (errorMsg) {
    return (
      <SafeAreaView style={styles.safe} edges={[]}>
        <View style={styles.center}>
          <Text style={styles.errorText}>{errorMsg}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <BaseHeader
        title="My Catches"
        subtitle={`${filteredCatches.length} catches logged`}
        icon="Fish"
        theme="green"
        action={
          <ActionButton
            label="Add Catch"
            icon="add"
            color="transparent"
            size="md"
            onPress={() => setShowCreateModal(true)}
          />
        }
      >
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
      </BaseHeader>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
      >
        <SearchFilterCard
          query={query}
          onQueryChange={setQuery}
          speciesOptions={speciesOptions}
          onSpeciesChange={setSpeciesIdFilter}
          sortOptions={SORT_OPTIONS}
          onSortChange={handleSortChange}
        />

        <StatsRow
          total={`${filteredCatches.length}`}
          biggest={getBiggestCatch(filteredCatches)}
          species={getSpeciesCount(filteredCatches)}
        />

        <CatchesList data={filteredCatches} />

        <View style={{ height: 24 }} />
      </ScrollView>

      <Modal
        visible={showCreateModal}
        animationType="slide"
        onRequestClose={() => setShowCreateModal(false)}
      >
        <CreateCatchContainer onClose={() => setShowCreateModal(false)} />
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#0A121A",
  },
  scroll: { flex: 1 },
  scrollContent: { padding: 16 },
  center: {
    flex: 1,
    backgroundColor: "#0A121A",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  loadingText: {
    marginTop: 10,
    color: "#98A6B3",
  },
  errorText: {
    color: "#FF6B6B",
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 20,
  },
});
