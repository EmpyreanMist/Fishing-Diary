import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";
import { supabase } from "@/lib/supabase";

interface AddCustomLureModalProps {
  visible: boolean;
  onClose: () => void;
  onCreated: () => void;
}

export default function AddCustomLureModal({
  visible,
  onClose,
  onCreated,
}: AddCustomLureModalProps) {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const [weight, setWeight] = useState("");

  const saveLure = async () => {
    const { error } = await supabase.from("user_lures").insert({
      name,
      brand,
      color,
      weight_gram: Number(weight),
    });

    if (!error) {
      await onCreated();
      onClose();
      setName("");
      setBrand("");
      setColor("");
      setWeight("");
    }
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.backdrop}>
        <View style={styles.modal}>
          {/* Header */}
          <View style={styles.headerRow}>
            <Text style={styles.headerTitle}>Add Custom Lure</Text>

            <TouchableOpacity onPress={onClose}>
              <Text style={styles.headerButton}>Close</Text>
            </TouchableOpacity>
          </View>

          {/* Inputs */}
          <TextInput
            placeholder="Brand"
            placeholderTextColor="#94A3B8"
            value={brand}
            onChangeText={setBrand}
            style={styles.input}
          />

          <TextInput
            placeholder="Name"
            placeholderTextColor="#94A3B8"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />

          <TextInput
            placeholder="Color"
            placeholderTextColor="#94A3B8"
            value={color}
            onChangeText={setColor}
            style={styles.input}
          />

          <TextInput
            placeholder="Weight (g)"
            placeholderTextColor="#94A3B8"
            value={weight}
            onChangeText={setWeight}
            keyboardType="numeric"
            style={styles.input}
          />

          {/* Save button */}
          <TouchableOpacity style={styles.saveButton} onPress={saveLure}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },

  modal: {
    width: "85%",
    backgroundColor: "#1E293B",
    borderRadius: 12,
    padding: 16,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#475569",
    marginBottom: 15,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  headerButton: {
    color: "#5ACCF2",
    fontSize: 16,
    fontWeight: "600",
  },

  input: {
    backgroundColor: "#0A121A",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#334155",
    color: "#fff",
    paddingHorizontal: 12,
    height: 42,
    marginBottom: 12,
  },

  saveButton: {
    backgroundColor: "#5ACCF2",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
  },

  saveButtonText: {
    color: "#0A121A",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },
});
