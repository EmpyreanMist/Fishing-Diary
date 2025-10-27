import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileCard() {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Profile Information</Text>
        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="pencil-outline" size={16} color="#0f172a" />
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.profileSection}>
        <Image
          source={require("@/assets/images/user-placeholder.png")}
          style={styles.avatar}
        />
        <View style={styles.nameContainer}>
          <Text style={styles.name}>John Anderson</Text>
          <Text style={styles.role}>Expert Angler</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.changePhotoBtn}>
        <Ionicons name="camera-outline" size={16} color="#fff" />
        <Text style={styles.changePhotoText}>Change Photo</Text>
      </TouchableOpacity>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          editable={false}
          value="John Anderson"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          editable={false}
          value="john@example.com"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Location</Text>
        <TextInput
          style={styles.input}
          editable={false}
          value="Minnesota, USA"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Bio</Text>
        <TextInput
          style={[styles.input, styles.bioInput]}
          editable={false}
          multiline
          value="Passionate angler exploring north"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#111827",
    borderRadius: 16,
    padding: 20,
    width: "100%",
    marginTop: 24,
    borderWidth: 1,
    borderColor: "#1e293b",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    color: "#f1f5f9",
    fontSize: 18,
    fontWeight: "700",
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#38bdf8",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  editText: {
    fontWeight: "600",
    marginLeft: 4,
    color: "#0f172a",
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#1e293b",
  },
  nameContainer: {
    marginLeft: 14,
  },
  name: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
  role: {
    color: "#94a3b8",
    fontSize: 13,
  },
  changePhotoBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e293b",
    borderRadius: 8,
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginBottom: 22,
  },
  changePhotoText: {
    color: "#f1f5f9",
    fontSize: 14,
    marginLeft: 6,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    color: "#94a3b8",
    fontSize: 14,
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#0f172a",
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 14,
    color: "#f1f5f9",
    borderWidth: 1,
    borderColor: "#1e293b",
    fontSize: 15,
    minHeight: 48,
  },
  bioInput: {
    height: 90,
    textAlignVertical: "top",
  },
});
