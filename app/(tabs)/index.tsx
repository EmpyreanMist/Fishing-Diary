import { StyleSheet, Text, View } from "react-native";
import ActionButton from "@/components/ui/ActionButton";
import CatchForm from "@/components/addCatch/CatchForm";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Supabase URL:</Text>
        <Text>{process.env.EXPO_PUBLIC_SUPABASE_URL || "❌ Not loaded"}</Text>
        <Text>Supabase Key:</Text>
        <Text>
          {process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY
            ? "✅ Exists"
            : "❌ Not found"}
        </Text>
      </View>

      <CatchForm stmt={true} />

      <Text style={styles.title}>🏠 Home</Text>

      <View style={styles.buttonContainer}>
        <ActionButton
          label="Add Catch"
          color="green"
          icon="location-outline"
          size="md"
          onPress={() => console.log("Add Catch pressed")}
        />
        <ActionButton
          label="Add Trip"
          color="blue"
          icon="location-outline"
          size="md"
          onPress={() => console.log("Add trip pressed")}
        />
      </View>

      <Text style={styles.subtitle}>Fishing app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: "20%",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingTop: "20%",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
  },
});
