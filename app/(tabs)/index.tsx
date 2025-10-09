import CatchForm from "@/components/addCatch/CatchForm";
import { StyleSheet, Image, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "@gluestack-ui/themed";
import ActionButton from "@/components/ui/ActionButton";

export default function HomeScreen() {
  const { width } = useWindowDimensions();

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <View style={styles.container}>
        <Image
          style={[styles.image, { width, height: width * 0.6 }]}
          source={require("../../assets/images/fishing.jpg")}
          resizeMode="cover"
        />
        <View style={styles.overlay}>
          <Text style={styles.title}>Fishing Diary</Text>
          <Text style={styles.subtitle}>Your digital angler's log</Text>
        </View>

        <View style={styles.topButtons}>
          <ActionButton label="+ Add Catch" />
          <ActionButton label="+ Add Trip" />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0A121A",
  },
  container: {
    backgroundColor: "#0A121A",
    alignItems: "center",
  },
  image: {
    alignSelf: "stretch",
  },
  overlay: {
    position: "absolute",
    top: "40%",
    left: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#F5F5F5",
  },
  subtitle: {
    fontSize: 18,
    color: "#F5F5F5",
    marginTop: 4,
  },
  topButtons: {
    flexDirection: "row",
    gap: 12,
    bottom: 12,
  },
});
