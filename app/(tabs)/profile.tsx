import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { router } from "expo-router";
import { useAuth } from "../context/AuthContext";

const Profile: React.FC = () => {
  const { user }: { user: any } = useAuth(); // Explicitly typing `useAuth`

  return (
    <View style={styles.container}>
      {/* Foto Profil */}
      <Image
        source={{
          uri: `https://ui-avatars.com/api/?name=${decodeURI(user.name)}`,
        }}
        style={styles.profileImage}
      />

      {/* Nama dan Email */}
      <ThemedText style={styles.name}>{user.name}</ThemedText>
      <Text style={styles.email}>{user.email}</Text>

      {/* Navigasi */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.editProfileButton]}
          onPress={() => router.push("/edit-profile")}
        >
          <Text style={styles.buttonText}>Edit Profil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.changePasswordButton]}
          onPress={() => router.push("/change-password")}
        >
          <Text style={styles.buttonText}>Ubah Password</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.logoutButton]}
          onPress={() => router.push("/")}
        >
          <Text style={styles.buttonText}>Keluar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#ddd",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
    width: "100%",
    paddingHorizontal: 30,
  },
  button: {
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },
  editProfileButton: {
    backgroundColor: "#4CAF50",
  },
  changePasswordButton: {
    backgroundColor: "#2196F3",
  },
  logoutButton: {
    backgroundColor: "#FF6F61",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Profile;
