import { Image } from "expo-image";
import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const FIGMA_WIDTH = 393;

// Venue photo assets from Figma design
const CARD_1_URI =
  "https://www.figma.com/api/mcp/asset/e8c063cb-9e38-4e82-b1e1-bfc68aff5418";
const CARD_2_URI =
  "https://www.figma.com/api/mcp/asset/6bffbd75-8e55-4faf-876e-76233becca33";
const CARD_3_URI =
  "https://www.figma.com/api/mcp/asset/a5e97e13-f4f4-4a8f-80c5-5417dc1844c3";

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

export default function WelcomeScreen({ onGetStarted }: WelcomeScreenProps) {
  const { width } = useWindowDimensions();
  const scale = width / FIGMA_WIDTH;

  const cardW = 214.926 * scale;
  const cardH = 292.993 * scale;

  return (
    <SafeAreaView style={styles.root} edges={["top", "left", "right"]}>
      {/* Cyan ambient glow */}
      <View
        style={[
          styles.glow,
          {
            left: (0.625 * FIGMA_WIDTH + 28.38) * scale,
            top: 231 * scale,
            width: 275 * scale,
            height: 426 * scale,
          },
        ]}
      />

      {/* Card 1 – outdoor venue, tilted left */}
      <View
        style={[
          styles.cardContainer,
          {
            left: 36.27 * scale,
            top: 92 * scale,
            width: 273 * scale,
            height: 332 * scale,
          },
        ]}
      >
        <View
          style={[
            styles.card,
            { width: cardW, height: cardH, transform: [{ rotate: "-12.49deg" }] },
          ]}
        >
          <Image
            source={{ uri: CARD_1_URI }}
            style={StyleSheet.absoluteFillObject}
            contentFit="cover"
          />
        </View>
      </View>

      {/* Card 2 – bar interior, tilted right */}
      <View
        style={[
          styles.cardContainer,
          {
            left: (0.125 * FIGMA_WIDTH + 24.73) * scale,
            top: 140 * scale,
            width: 303 * scale,
            height: 349 * scale,
          },
        ]}
      >
        <View
          style={[
            styles.card,
            { width: cardW, height: cardH, transform: [{ rotate: "20.38deg" }] },
          ]}
        >
          <Image
            source={{ uri: CARD_2_URI }}
            style={StyleSheet.absoluteFillObject}
            contentFit="cover"
          />
        </View>
      </View>

      {/* Card 3 – food spread, tilted left */}
      <View
        style={[
          styles.cardContainer,
          {
            left: 15 * scale,
            top: 257 * scale,
            width: 317 * scale,
            height: 356 * scale,
          },
        ]}
      >
        <View
          style={[
            styles.card,
            { width: cardW, height: cardH, transform: [{ rotate: "-24.48deg" }] },
          ]}
        >
          <Image
            source={{ uri: CARD_3_URI }}
            style={StyleSheet.absoluteFillObject}
            contentFit="cover"
          />
        </View>
      </View>

      {/* Lo! Logo */}
      <View
        style={[
          styles.logo,
          {
            left: (0.625 * FIGMA_WIDTH + 28.38) * scale,
            top: 101 * scale,
            width: 81 * scale,
            height: 78 * scale,
          },
        ]}
      >
        <Image
          source={require("@/assets/images/app-icon.png")}
          style={styles.logoImage}
          contentFit="contain"
        />
      </View>

      {/* Bottom content */}
      <SafeAreaView style={styles.bottomContent} edges={["bottom"]}>
        <View style={styles.textBlock}>
          <Text style={styles.headline}>
            <Text style={styles.headlineBold}>Discover </Text>
            <Text style={styles.headlineRegular}>your next{"\n"}</Text>
            <Text style={styles.headlineBold}>Favorite Spot</Text>
          </Text>
          <Text style={styles.subtitle}>
            See where your friends go, people&apos;s favorites and plan it all
            at once.
          </Text>
        </View>

        <Pressable
          onPress={onGetStarted}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>Get started</Text>
        </Pressable>
      </SafeAreaView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  glow: {
    position: "absolute",
    backgroundColor: "#00d9ff",
    borderRadius: 99999,
    opacity: 0.1,
  },
  cardContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 18.1,
    elevation: 8,
  },
  logo: {
    position: "absolute",
    borderRadius: 10,
    overflow: "hidden",
  },
  logoImage: {
    width: "100%",
    height: "100%",
  },
  bottomContent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 20,
  },
  textBlock: {
    gap: 12,
  },
  headline: {
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: -0.45,
    color: "#000000",
  },
  headlineBold: {
    fontFamily: "PlayfairDisplay_600SemiBold",
    fontWeight: "600",
  },
  headlineRegular: {
    fontFamily: "PlayfairDisplay_400Regular",
    fontWeight: "400",
  },
  subtitle: {
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.43,
    color: "#a0a0a0",
    fontWeight: "400",
  },
  button: {
    backgroundColor: "#111827",
    paddingVertical: 16,
    borderRadius: 65,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "600",
    letterSpacing: -0.08,
    lineHeight: 22,
  },
});
