import ActionButton from "@/components/ui/ActionButton";
import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
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
        {/*         <ActionButton
          label="Add Trip"
          color="black"
          icon="location-outline"
          size="md"
          onPress={() => console.log("Add trip pressed")}
        /> */}
      </View>

      <Text style={styles.subtitle}> Fishing app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    /* justifyContent: "center", */
    paddingTop: "20%",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
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
