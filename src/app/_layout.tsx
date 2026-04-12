import React from "react";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import {
  PlayfairDisplay_400Regular,
  PlayfairDisplay_600SemiBold,
  useFonts,
} from "@expo-google-fonts/playfair-display";
import { SplashScreen, Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TamaguiProvider } from "tamagui";

import { LocationProvider } from "../lib/context/LocationContext";
import { setupReactotron } from "../lib/reactotron";
import tamaguiConfig from "../tamagui.config";

import { QueryProvider } from "../lib/providers/QueryProvider";

setupReactotron();

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_400Regular,
    PlayfairDisplay_600SemiBold,
  });

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TamaguiProvider config={tamaguiConfig} defaultTheme="light">
        <QueryProvider>
          <LocationProvider>
            <BottomSheetModalProvider>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="tabs" options={{ headerShown: false }} />
              </Stack>
            </BottomSheetModalProvider>
          </LocationProvider>
        </QueryProvider>
      </TamaguiProvider>
    </GestureHandlerRootView>
  );
}
