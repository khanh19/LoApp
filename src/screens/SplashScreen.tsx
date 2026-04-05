import { SplashScreen as ExpoSplashScreen } from "expo-router";
import React, { useEffect, type ComponentType, type ReactNode } from "react";
import {
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { YStack as TamaguiYStack } from "tamagui";

import { Logo } from "../components/Logo";
import { SPLASH_BACKGROUND, SPLASH_DURATION_MS } from "../constants";

/** Tamagui `YStack` strict props reject RN `StyleSheet` + React children together; runtime behavior is correct. */
const YStack = TamaguiYStack as unknown as ComponentType<{
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}>;

type Props = {
  onFinished: () => void;
};

export default function SplashScreen({ onFinished }: Props) {
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        void ExpoSplashScreen.hideAsync();
      });
    });
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const t = setTimeout(onFinished, SPLASH_DURATION_MS);
    return () => clearTimeout(t);
  }, [onFinished]);

  return (
    <YStack style={styles.root}>
      <YStack style={styles.card}>
        <Logo />
      </YStack>

      <YStack style={styles.tagline}>
        <Text style={styles.social}>Social Discovery</Text>
        <View style={styles.rule} />
        <Text style={styles.vietnam}>VIETNAM</Text>
      </YStack>
    </YStack>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: SPLASH_BACKGROUND,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  card: {
    width: 128,
    height: 128,
    backgroundColor: "#fff",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
  },
  tagline: {
    marginTop: 12,
    alignItems: "center",
  },
  social: {
    fontSize: 22,
    color: "#0f172a",
    fontStyle: "italic",
  },
  rule: {
    width: 32,
    height: 1,
    backgroundColor: "#0f172a",
    opacity: 0.2,
    marginVertical: 12,
  },
  vietnam: {
    fontSize: 12,
    color: "#94a3b8",
    fontWeight: "500",
    letterSpacing: 3,
  },
});
