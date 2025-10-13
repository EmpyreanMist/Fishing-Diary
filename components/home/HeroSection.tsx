import { StyleSheet, Image, useWindowDimensions } from "react-native";
import { Text, View } from "@gluestack-ui/themed";
import ActionButton from "@/components/ui/ActionButton";

export function HeroSection() {
  const { width } = useWindowDimensions();
  const isTablet = width > 700;

  return (
    <View style={styles.container}>
      <Image
        style={[styles.image, { width, height: width * 0.6 }]}
        source={require("@/assets/images/fishing.png")}
        resizeMode="cover"
      />

      <View style={[styles.overlay, { top: (width * 0.6) / 2 - 40 }]}>
        <Text style={[styles.title, { fontSize: isTablet ? 40 : 28 }]}>
          Fishing Diary
        </Text>
        <Text style={[styles.subtitle, { fontSize: isTablet ? 22 : 18 }]}>
          Your digital angler's log
        </Text>
      </View>

      <View style={styles.buttons}>
        <ActionButton label="+ Add Catch" />
        <ActionButton label="+ Add Trip" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0A121A",
    alignItems: "center",
  },
  image: {
    alignSelf: "stretch",
  },
  overlay: {
    position: "absolute",
    left: 20,
    transform: [{ translateY: -20 }],
  },
  title: {
    fontWeight: "bold",
    color: "#F5F5F5",
  },
  subtitle: {
    color: "#F5F5F5",
    marginTop: 4,
  },
  buttons: {
    flexDirection: "row",
    gap: 12,
    bottom: 12,
  },
});
