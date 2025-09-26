import { StyleSheet, Text, View } from "react-native";

export default function statsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Super cool stats</Text>
      <Text style={styles.subtitle}>statistics</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
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
