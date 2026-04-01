import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Platform, StyleSheet, View } from "react-native";

export default function TabLayout() {
  const isIOS = Platform.OS === "ios";
  const isWeb = Platform.OS === "web";

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#7C6FF7',
        tabBarInactiveTintColor: '#8878C3',
        headerShown: true,
        headerStyle: { backgroundColor: '#F7F5FF' },
        headerShadowVisible: false,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: isIOS ? "transparent" : "#fff",
          borderTopWidth: 1,
          borderTopColor: "#EDE9FF",
          elevation: 0,
          ...(isWeb ? { height: 84 } : {}),
        },
        tabBarBackground: () =>
          isIOS ? (
            <BlurView
              intensity={100}
              tint="light"
              style={StyleSheet.absoluteFill}
            />
          ) : (
            <View style={[StyleSheet.absoluteFill, { backgroundColor: "#fff" }]} />
          ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "DevMood",
          headerTitleStyle: {
            fontFamily: "Inter_700Bold",
            fontSize: 20,
            color: "#1A1A2E",
          },
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Feather name="home" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          headerTitleStyle: {
            fontFamily: "Inter_700Bold",
            fontSize: 20,
            color: "#1A1A2E",
          },
          tabBarLabel: "History",
          tabBarIcon: ({ color }) => (
            <Feather name="clock" size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
