import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/providers/AuthProvider";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function ProfileCard() {
  const { user } = useAuth();

  const [profile, setProfile] = useState<{
    first_name: string;
    last_name: string;
    phone_number: string | null;
    bio: string | null;
    avatar_url: string | null;
  } | null>(null);

  useEffect(() => {
    if (!user) return;

    async function loadProfile(userId: string) {
      const { data, error } = await supabase
        .from("profiles")
        .select("first_name, last_name, phone_number, bio, avatar_url")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Profile fetch error:", error);
        return;
      }

      setProfile(data);
    }

    loadProfile(user.id);
  }, [user]);

  if (!user) return null;
  if (!profile) return null;

  const fullName = `${profile.first_name} ${profile.last_name}`;

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
          source={
            profile.avatar_url
              ? { uri: profile.avatar_url }
              : require("@/assets/images/user-placeholder.png")
          }
          style={styles.avatar}
        />

        <View style={styles.nameContainer}>
          <Text style={styles.name}>{fullName}</Text>
          <Text style={styles.role}>{profile.phone_number ?? ""}</Text>
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          editable={false}
          value={user.email ?? ""}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} editable={false} value={fullName} />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Phone</Text>
        <TextInput
          style={styles.input}
          editable={false}
          value={profile.phone_number ?? ""}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Bio</Text>
        <TextInput
          style={[styles.input, styles.bioInput]}
          editable={false}
          multiline
          value={profile.bio ?? ""}
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
