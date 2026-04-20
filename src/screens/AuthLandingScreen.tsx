import { Image } from "expo-image";
import * as Linking from "expo-linking";
import { StatusBar } from "expo-status-bar";
import * as SystemUI from "expo-system-ui";
import React, { useLayoutEffect, useMemo } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import Svg, { ClipPath, Defs, Image as SvgImage, Path } from "react-native-svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HERO_URI =
  "https://images.unsplash.com/photo-1600494603989-9650f6f3ef2e?w=1200&q=85";
const PRIMARY = "#0D1321";
const BORDER = "#d9d9d9";
const TERMS_URL = "https://example.com/terms";

const CLIP_ID = "authLandingHeroClip";

export interface AuthLandingScreenProps {
  onLogIn: () => void;
  onSignUp: () => void;
}

export default function AuthLandingScreen({
  onLogIn,
  onSignUp,
}: AuthLandingScreenProps) {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const heroH = Math.min(Math.round(height * 0.46), 420);
  const w = Math.round(width);

  const pathD = useMemo(() => {
    const curve = 32;
    return `M 0 0 L ${w} 0 L ${w} ${heroH} Q ${w / 2} ${heroH - curve} 0 ${heroH} Z`;
  }, [w, heroH]);

  useLayoutEffect(() => {
    void SystemUI.setBackgroundColorAsync("#ffffff");
  }, []);

  return (
    <View style={styles.root}>
      <StatusBar style="light" />

      <View style={{ width: w, height: heroH }}>
        <Svg width={w} height={heroH} viewBox={`0 0 ${w} ${heroH}`}>
          <Defs>
            <ClipPath id={CLIP_ID}>
              <Path d={pathD} />
            </ClipPath>
          </Defs>
          <SvgImage
            width={w}
            height={heroH}
            href={{ uri: HERO_URI }}
            preserveAspectRatio="xMidYMid slice"
            clipPath={`url(#${CLIP_ID})`}
          />
        </Svg>
      </View>

      <View
        style={[
          styles.lower,
          { paddingBottom: Math.max(insets.bottom, 16), paddingHorizontal: 20 },
        ]}
      >
        <View style={styles.brandBlock}>
          <Image
            source={require("@/assets/images/app-icon.png")}
            style={styles.logo}
            contentFit="contain"
          />
          <Text style={styles.tagline}>
            Your vibe, your scene,{" "}
            <Text style={styles.taglineBold}>your Lo</Text>
          </Text>
        </View>

        <View style={styles.actions}>
          <Pressable
            onPress={onLogIn}
            style={({ pressed }) => [
              styles.btnPrimary,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.btnPrimaryText}>Log in</Text>
          </Pressable>

          <Pressable
            onPress={onSignUp}
            style={({ pressed }) => [
              styles.btnSecondary,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.btnSecondaryText}>Sign up</Text>
          </Pressable>
        </View>

        <Text style={styles.terms}>
          {`By continuing, you agree to Lo's `}
          <Text
            style={styles.termsLink}
            onPress={() => void Linking.openURL(TERMS_URL)}
          >
            Terms and Conditions
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },
  lower: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 20,
  },
  brandBlock: {
    gap: 12,
    alignItems: "flex-start",
  },
  logo: {
    width: 88,
    height: 65,
    borderRadius: 12,
  },
  tagline: {
    fontFamily: "PlayfairDisplay_400Regular",
    fontSize: 22,
    lineHeight: 30,
    color: PRIMARY,
    letterSpacing: -0.3,
    maxWidth: 320,
  },
  taglineBold: {
    fontFamily: "PlayfairDisplay_600SemiBold",
    fontWeight: "600",
  },
  actions: {
    gap: 12,
  },
  btnPrimary: {
    backgroundColor: PRIMARY,
    borderRadius: 65,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  btnPrimaryText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
    letterSpacing: -0.08,
    lineHeight: 22,
  },
  btnSecondary: {
    backgroundColor: "#fff",
    borderRadius: 65,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: BORDER,
  },
  btnSecondaryText: {
    color: "#000",
    fontSize: 17,
    fontWeight: "600",
    letterSpacing: -0.08,
    lineHeight: 22,
  },
  pressed: {
    opacity: 0.88,
  },
  terms: {
    fontSize: 13,
    lineHeight: 18,
    color: "#64748b",
    textAlign: "center",
    letterSpacing: -0.08,
  },
  termsLink: {
    textDecorationLine: "underline",
    color: PRIMARY,
    fontWeight: "500",
  },
});
