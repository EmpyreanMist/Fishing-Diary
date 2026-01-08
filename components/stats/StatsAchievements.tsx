import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
const achievements = [
  {
    title: "First Pike",
    description: "Caught your first pike",
    time: "2 days ago",
  },
  {
    title: "Early Bird",
    description: "5 catches before 7 AM",
    time: "1 week ago",
  },
  {
    title: "Explorer",
    description: "Fished at 5 different locations",
    time: "2 weeks ago",
  },
  {
    title: "Consistent Angler",
    description: "Fished 3 days in a row",
    time: "3 weeks ago",
  },
];

export function StatsAchievements() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="ribbon-outline" size={20} color="#5ACCF2" />
        <Text style={styles.title}>Recent Achievements</Text>
      </View>

      <Text style={styles.subtitle}>Milestones you've unlocked</Text>

      {achievements.map((item) => (
        <View key={item.title} style={styles.card}>
          <Ionicons
            name="medal-outline"
            size={22}
            color="#5ACCF2"
            style={styles.icon}
          />
          <View style={styles.textContainer}>
            <Text style={styles.achievementTitle}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.time}>{item.time}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121B22",
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginTop: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#F5F5F5",
    marginLeft: 8,
  },
  subtitle: {
    color: "#98A6B3",
    fontSize: 14,
    marginBottom: 18,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1D302880",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  achievementTitle: {
    color: "#F5F5F5",
    fontWeight: "bold",
    fontSize: 16,
  },
  description: {
    color: "#98A6B3",
    fontSize: 14,
    marginTop: 2,
  },
  time: {
    color: "#5ACCF2",
    fontSize: 12,
    marginTop: 4,
  },
});
