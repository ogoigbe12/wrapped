import { Stack } from "expo-router";
import "react-native-reanimated";
import React from "react";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function RootLayoutNav() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerTitle: "", headerTransparent: true }}
      />
      <Stack.Screen
        name="invite-Friends"
        options={{
          headerTitle: "",
          headerTransparent: true,
          headerShown: false,
        }}
      />
    </Stack>
  );
}
