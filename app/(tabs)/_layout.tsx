import { router, Tabs } from "expo-router";
import React, { useEffect, useState } from "react";
import { Platform, Text, TouchableOpacity } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import Icon from "react-native-vector-icons/Ionicons"; // Make sure to import the correct icon set
import { useAuth } from "../context/AuthContext";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { user } = useAuth();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Mark as mounted
    if (!user && isMounted) {
      router.push("/"); // Redirect after mount
    }
  }, [user, isMounted]);

  if (!isMounted) return null; // Optionally return a loading indicator until mounted

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#8bc34a",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Beranda",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={34} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="permohonan/create"
        options={{
          title: "Buat Permohonan",
          tabBarIcon: ({ color }) => (
            <Icon size={28} name="add" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Icon size={28} name="person" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="change-password"
        options={{
          href: null,
          title: "Ubah Password",
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.push("/profile")}
              style={{ paddingLeft: 16 }}
            >
              <Icon name="arrow-back" size={28} color="black" />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="edit-profile"
        options={{
          href: null,
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.push("/profile")}
              style={{ paddingLeft: 16 }}
            >
              <Icon name="arrow-back" size={28} color="black" />
            </TouchableOpacity>
          ),
          title: "Edit Profile",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="permohonan/index"
        options={{
          href: null,
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.push("/home")}
              style={{ paddingLeft: 16 }}
            >
              <Icon name="arrow-back" size={28} color="black" />
            </TouchableOpacity>
          ),

          title: "Daftar Permohonan",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="documents/index"
        options={{
          href: null,
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.push("/home")}
              style={{ paddingLeft: 16 }}
            >
              <Icon name="arrow-back" size={28} color="black" />
            </TouchableOpacity>
          ),

          title: "Daftar Dokumen",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="informations/index"
        options={{
          href: null,
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.push("/home")}
              style={{ paddingLeft: 16 }}
            >
              <Icon name="arrow-back" size={28} color="black" />
            </TouchableOpacity>
          ),
          title: "Daftar Informasi",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
