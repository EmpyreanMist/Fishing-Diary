import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Image,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { supabase } from "@/lib/supabase";
import { uploadLurePhoto } from "@/lib/catches/uploadLurePhoto";
import ActionButton from "../ui/ActionButton";

interface AddCustomLureModalProps {
  visible: boolean;
  onClose: () => void;
  onCreated: () => void;
  userId: string;
}

export default function AddCustomLureModal({
  visible,
  onClose,
  onCreated,
  userId,
}: AddCustomLureModalProps) {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const [weight, setWeight] = useState("");
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") return;

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) setPhotoUri(result.assets[0].uri);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) setPhotoUri(result.assets[0].uri);
  };

  const saveLure = async () => {
    try {
      const { data: lure, error } = await supabase
        .from("user_lures")
        .insert({
          name,
          brand,
          color,
          weight_gram: Number(weight) || null,
          user_id: userId,
        })
        .select()
        .single();

      const lureId = lure.id;

      if (photoUri) {
        await uploadLurePhoto(photoUri, userId, lureId);
      }

      onCreated();
      onClose();

      setName("");
      setBrand("");
      setColor("");
      setWeight("");
      setPhotoUri(null);
    } catch (err) {
      console.log("Error creating lure:", err);
    }
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.centered}>
        <View style={styles.card}>
          <Text style={styles.title}>Add Custom Lure</Text>

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
            style={styles.input}
          />

          {photoUri && (
            <Image source={{ uri: photoUri }} style={styles.previewImage} />
          )}

          <View style={{ flexDirection: "row", gap: 10, marginVertical: 8 }}>
            <ActionButton
              label="Take Photo"
              icon="camera"
              color="green"
              size="md"
              width="48%"
              onPress={takePhoto}
            />

            <ActionButton
              label="Library"
              icon="image"
              color="green"
              size="md"
              width="48%"
              onPress={pickImage}
            />
          </View>

          <ActionButton
            label="Save Lure"
            color="blue"
            size="lg"
            onPress={saveLure}
          />

          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#1E293B",
    borderRadius: 12,
    width: "85%",
    padding: 20,
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 15,
  },
  input: {
    backgroundColor: "#0A121A",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#334155",
    color: "#fff",
    paddingHorizontal: 10,
    height: 40,
    marginBottom: 10,
  },
  previewImage: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    marginBottom: 12,
  },
  closeText: {
    color: "#94A3B8",
    textAlign: "center",
    marginTop: 15,
    fontSize: 16,
  },
});
