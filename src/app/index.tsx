import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Placeholder from "@/assets/svgs/ImagePicker";
import Colors from "@/src/constants/Colors";
import { useRouter } from "expo-router";
import axios from "axios";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dr90bp2gl/image/upload";
const UPLOAD_PRESET = "wrapped";

const Profile: React.FC = () => {
  const router = useRouter();
  const [profileImage, setProfileImage] = React.useState<string | null>(null);
  const [uploading, setUploading] = React.useState<boolean>(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      uploadImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      uploadImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (imageUri: string) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", {
      uri: imageUri,
      type: "image/jpeg",
      name: "profile.jpg",
    } as any);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await axios.post(CLOUDINARY_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setProfileImage(response.data.secure_url);
      Alert.alert("Upload Success!", "Your profile image has been uploaded.", [
        {
          text: "OK",
        },
      ]);
    } catch (error) {
      Alert.alert("Upload Failed", "Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ marginTop: "auto" }}>
        <Text style={styles.title}>Add a profile photo</Text>

        <View style={styles.imageContainer}>
          {!profileImage && (
            <View style={styles.inlineText}>
              <Text style={{ textAlign: "center", color: Colors.white }}>
                +
              </Text>
            </View>
          )}
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <View>
              <Placeholder />
            </View>
          )}
        </View>

        {!profileImage && (
          <Text style={styles.subtitle}>
            Add a photo so your friends{"\n"} can find you
          </Text>
        )}
      </View>

      <View style={styles.buttonView}>
        {uploading && <ActivityIndicator size="large" color={Colors.primary} />}

        <TouchableOpacity
          style={[styles.button, styles.chooseButton]}
          onPress={pickImage}
          disabled={uploading}
        >
          <Text style={[styles.buttonText, { color: Colors.primary }]}>
            {profileImage ? "Change photo" : "Choose a photo"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.takeButton]}
          onPress={
            profileImage ? () => router.push("/invite-Friends") : takePhoto
          }
          disabled={uploading}
        >
          <Text style={[styles.buttonText, styles.takeButtonText]}>
            {profileImage ? "Next" : "Take a photo"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "600",
    color: Colors.black,
    marginBottom: 8,
  },
  inlineText: {
    width: 20,
    height: 20,
    backgroundColor: Colors.blue,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 5,
    right: 5,
    zIndex: 2,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 20,
    textAlign: "center",
  },
  imageContainer: {
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 100,
    borderRadius: 50,
    marginHorizontal: "auto",
    position: "relative",
    backgroundColor: Colors.placeholder,
  },
  profileImage: {
    borderRadius: 50,
    width: "100%",
    height: "100%",
  },
  buttonView: {
    marginTop: "auto",
    width: "100%",
    alignItems: "center",
  },
  button: {
    width: "100%",
    marginTop: 5,
    padding: 15,
    borderRadius: 32,
    alignItems: "center",
    marginVertical: 10,
  },
  chooseButton: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  takeButton: {
    backgroundColor: Colors.primary,
  },
  buttonText: {
    fontSize: 16,
  },
  takeButtonText: {
    color: "white",
  },
});

export default Profile;
