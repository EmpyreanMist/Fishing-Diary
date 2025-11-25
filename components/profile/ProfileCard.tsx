import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/providers/AuthProvider";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import ActionButton from "../ui/ActionButton";

export default function ProfileCard() {
  const { user } = useAuth();

  const [profile, setProfile] = useState<{
    first_name: string;
    last_name: string;
    phone_number: string | null;
    bio: string | null;
    avatar_url: string | null;
  } | null>(null);

  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);

  // Local editable fields
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");

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
      setFirst(data.first_name ?? "");
      setLast(data.last_name ?? "");
      setPhone(data.phone_number ?? "");
      setBio(data.bio ?? "");
    }

    loadProfile(user.id);
  }, [user]);

  async function saveChanges() {
    if (!user) return;
    try {
      setSaving(true);

      const { error } = await supabase
        .from("profiles")
        .update({
          first_name: first.trim(),
          last_name: last.trim(),
          phone_number: phone.trim(),
          bio: bio.trim(),
        })
        .eq("id", user.id);

      if (error) {
        console.error("Profile update error:", error);
        return;
      }

      setProfile((prev) =>
        prev
          ? {
              ...prev,
              first_name: first,
              last_name: last,
              phone_number: phone,
              bio,
            }
          : prev
      );

      setEditMode(false);
    } finally {
      setSaving(false);
    }
  }

  function cancelEdit() {
    if (!profile) return;
    setFirst(profile.first_name ?? "");
    setLast(profile.last_name ?? "");
    setPhone(profile.phone_number ?? "");
    setBio(profile.bio ?? "");
    setEditMode(false);
  }

  if (!user || !profile) return null;

  const fullName = `${profile.first_name} ${profile.last_name}`;

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Profile Information</Text>

        {!editMode && (
          <ActionButton label={"Edit"} onPress={() => setEditMode(true)} />
          /*           <TouchableOpacity
            style={styles.editButton}
            onPress={() => setEditMode(true)}
          >
            <Ionicons name="pencil-outline" size={16} color="#0f172a" />
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity> */
        )}
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
        <Text style={styles.label}>First name</Text>
        <TextInput
          style={styles.input}
          editable={editMode}
          value={first}
          onChangeText={setFirst}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Last name</Text>
        <TextInput
          style={styles.input}
          editable={editMode}
          value={last}
          onChangeText={setLast}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Phone</Text>
        <TextInput
          style={styles.input}
          editable={editMode}
          value={phone}
          onChangeText={setPhone}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Bio</Text>
        <TextInput
          style={[styles.input, styles.bioInput]}
          editable={editMode}
          multiline
          value={bio}
          onChangeText={setBio}
        />
      </View>

      {editMode && (
        <View style={{ flexDirection: "row", marginTop: 10, gap: 10 }}>
          <ActionButton
            label={saving ? "Saving..." : "Save"}
            onPress={saveChanges}
            icon="checkmark-outline"
            color="green"
            size="md"
            disabled={saving}
          />

          <ActionButton
            label="Cancel"
            onPress={cancelEdit}
            icon="close-outline"
            color="red"
            size="md"
            disabled={saving}
          />
        </View>
      )}
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
