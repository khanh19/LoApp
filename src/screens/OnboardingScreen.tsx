import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import * as SystemUI from "expo-system-ui";
import React, { type ComponentProps, useLayoutEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { SPLASH_BACKGROUND } from "../constants";
import { onboardingVenueChoices } from "../data/onboarding-venues";

const FG = "#111827";
const MUTED = "#64748B";

type IonName = ComponentProps<typeof Ionicons>["name"];

const CATEGORY_ITEMS: { id: string; icon: IonName }[] = [
  { id: "Restaurants", icon: "restaurant-outline" },
  { id: "Cafes", icon: "cafe-outline" },
  { id: "Bars", icon: "wine-outline" },
  { id: "Nightclubs", icon: "musical-notes-outline" },
  { id: "Art Galleries", icon: "color-palette-outline" },
];

const VIBE_ITEMS: { id: string; desc: string; icon: IonName }[] = [
  {
    id: "Cozy and chill",
    desc: "Quiet spots, good conversations",
    icon: "cafe-outline",
  },
  {
    id: "Aesthetic and trendy",
    desc: "Instagram-worthy, lively",
    icon: "sparkles-outline",
  },
  {
    id: "Party nightlife",
    desc: "High energy, music, dancing",
    icon: "moon-outline",
  },
  {
    id: "Hidden gems",
    desc: "Speakeasies, local favorites",
    icon: "compass-outline",
  },
];

type OnboardingScreenProps = {
  onFinished: () => void;
};

export default function OnboardingScreen({
  onFinished,
}: OnboardingScreenProps) {
  const [step, setStep] = useState(1);
  const [city, setCity] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [vibe, setVibe] = useState("");
  const [preference, setPreference] = useState("");

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else onFinished();
  };

  const toggleCategory = (cat: string) => {
    if (categories.includes(cat)) {
      setCategories(categories.filter((c) => c !== cat));
    } else if (categories.length < 3) {
      setCategories([...categories, cat]);
    }
  };

  const canContinue =
    (step === 1 && !!city) ||
    (step === 2 && categories.length > 0) ||
    (step === 3 && !!vibe) ||
    (step === 4 && !!preference);

  useLayoutEffect(() => {
    void SystemUI.setBackgroundColorAsync(SPLASH_BACKGROUND);
  }, []);

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={["top", "left", "right", "bottom"]}
    >
      <View style={styles.inner}>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <Text style={styles.stepLabel}>Step {step} of 4</Text>
            <Pressable onPress={onFinished} hitSlop={12}>
              <Text style={styles.skipText}>Skip</Text>
            </Pressable>
          </View>
          <View style={styles.progressRow}>
            {[1, 2, 3, 4].map((i) => (
              <View
                key={i}
                style={[
                  styles.progressSeg,
                  i <= step
                    ? styles.progressSegActive
                    : styles.progressSegInactive,
                ]}
              />
            ))}
          </View>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {step === 1 && <StepCity city={city} onSelect={setCity} />}
          {step === 2 && (
            <StepCategories categories={categories} onToggle={toggleCategory} />
          )}
          {step === 3 && <StepVibe vibe={vibe} onSelect={setVibe} />}
          {step === 4 && (
            <StepPreference preference={preference} onSelect={setPreference} />
          )}
        </ScrollView>

        <View style={styles.footer}>
          <Pressable onPress={handleNext} disabled={!canContinue}>
            <View
              style={[
                styles.continueBtn,
                !canContinue && styles.continueBtnDisabled,
              ]}
            >
              <Text style={styles.continueText}>
                {step === 4 ? "Start Exploring" : "Continue"}
              </Text>
              <Ionicons name="arrow-forward" size={20} color="#fff" />
            </View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

function StepCity({
  city,
  onSelect,
}: {
  city: string;
  onSelect: (c: string) => void;
}) {
  const cities = ["Ho Chi Minh City", "Hanoi", "Da Nang"];
  return (
    <View style={styles.stepSection}>
      <Text style={styles.h1}>Where are you exploring?</Text>
      <Text style={styles.sub}>
        Select your city to get localized recommendations.
      </Text>
      <View style={styles.colGap12}>
        {cities.map((c) => {
          const selected = city === c;
          return (
            <Pressable key={c} onPress={() => onSelect(c)}>
              <View
                style={[styles.cityRow, selected && styles.cityRowSelected]}
              >
                <View style={styles.cityRowLeft}>
                  <View
                    style={[
                      styles.iconCircleSm,
                      { backgroundColor: selected ? FG : "#fff" },
                    ]}
                  >
                    <Ionicons
                      name="location"
                      size={22}
                      color={selected ? "#fff" : FG}
                    />
                  </View>
                  <Text style={styles.cityName}>{c}</Text>
                </View>
                {selected ? <View style={styles.selectedDot} /> : null}
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

function StepCategories({
  categories,
  onToggle,
}: {
  categories: string[];
  onToggle: (c: string) => void;
}) {
  return (
    <View style={styles.stepSection}>
      <Text style={styles.h1}>What interests you?</Text>
      <Text style={[styles.sub, styles.subTight]}>
        Pick up to 3 categories to personalize your feed.
      </Text>
      <View style={styles.grid}>
        {CATEGORY_ITEMS.map((cat) => {
          const selected = categories.includes(cat.id);
          return (
            <Pressable
              key={cat.id}
              onPress={() => onToggle(cat.id)}
              style={styles.gridItem}
            >
              <View
                style={[styles.catCell, selected && styles.catCellSelected]}
              >
                <Ionicons
                  name={cat.icon}
                  size={26}
                  color={selected ? FG : MUTED}
                />
                <Text style={styles.catLabel}>{cat.id}</Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

function StepVibe({
  vibe,
  onSelect,
}: {
  vibe: string;
  onSelect: (v: string) => void;
}) {
  return (
    <View style={styles.stepSection}>
      <Text style={styles.h1}>What&apos;s your vibe?</Text>
      <Text style={[styles.sub, styles.subTight]}>
        This helps us curate the perfect spots for you.
      </Text>
      <View style={styles.colGap12}>
        {VIBE_ITEMS.map((v) => {
          const selected = vibe === v.id;
          return (
            <Pressable key={v.id} onPress={() => onSelect(v.id)}>
              <View
                style={[styles.vibeRow, selected && styles.vibeRowSelected]}
              >
                <View
                  style={[
                    styles.iconCircleMd,
                    { backgroundColor: selected ? FG : "#fff" },
                  ]}
                >
                  <Ionicons
                    name={v.icon}
                    size={22}
                    color={selected ? "#fff" : FG}
                  />
                </View>
                <View style={styles.vibeTextCol}>
                  <Text style={styles.vibeTitle}>{v.id}</Text>
                  <Text
                    style={[
                      styles.vibeDesc,
                      { color: selected ? "#475569" : MUTED },
                    ]}
                  >
                    {v.desc}
                  </Text>
                </View>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

function StepPreference({
  preference,
  onSelect,
}: {
  preference: string;
  onSelect: (id: string) => void;
}) {
  return (
    <View style={styles.stepSection}>
      <Text style={styles.h1}>Pick a favorite</Text>
      <Text style={[styles.sub, styles.subTight]}>
        Which of these looks more like your style?
      </Text>
      <View style={styles.colGap16}>
        {onboardingVenueChoices.map((v) => {
          const selected = preference === v.id;
          return (
            <Pressable key={v.id} onPress={() => onSelect(v.id)}>
              <View
                style={[styles.cardWrap, selected && styles.cardWrapSelected]}
              >
                <Image
                  source={{ uri: v.image }}
                  style={StyleSheet.absoluteFillObject}
                  contentFit="cover"
                />
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.85)"]}
                  style={styles.cardGradient}
                />
                <View style={styles.cardText}>
                  <Text style={styles.cardTitle}>{v.name}</Text>
                  <Text style={styles.cardCat}>{v.category}</Text>
                </View>
                {selected ? (
                  <View style={styles.heartBadge}>
                    <Ionicons name="heart" size={18} color="#fff" />
                  </View>
                ) : null}
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: SPLASH_BACKGROUND,
  },
  inner: {
    flex: 1,
    width: "100%",
    alignSelf: "stretch",
    backgroundColor: SPLASH_BACKGROUND,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
    width: "100%",
    backgroundColor: SPLASH_BACKGROUND,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  stepLabel: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 2,
    color: MUTED,
    textTransform: "uppercase",
  },
  skipText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#8E8E93",
  },
  progressRow: {
    flexDirection: "row",
    gap: 8,
    height: 6,
  },
  progressSeg: {
    flex: 1,
    height: 6,
    borderRadius: 999,
  },
  progressSegActive: {
    backgroundColor: FG,
  },
  progressSegInactive: {
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  footer: {
    padding: 16,
    backgroundColor: SPLASH_BACKGROUND,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "rgba(0,0,0,0.08)",
  },
  continueBtn: {
    backgroundColor: FG,
    paddingVertical: 14,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  continueBtnDisabled: {
    opacity: 0.45,
  },
  continueText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  scroll: {
    flex: 1,
    zIndex: 1,
    backgroundColor: SPLASH_BACKGROUND,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
    backgroundColor: SPLASH_BACKGROUND,
    flexGrow: 1,
  },
  stepSection: {
    marginBottom: 24,
  },
  h1: {
    fontSize: 32,
    fontWeight: "700",
    color: FG,
    lineHeight: 38,
    marginBottom: 8,
  },
  sub: {
    fontSize: 15,
    color: MUTED,
    marginBottom: 16,
  },
  subTight: {
    marginBottom: 16,
  },
  colGap12: {
    gap: 12,
  },
  colGap16: {
    gap: 16,
  },
  cityRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "transparent",
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  cityRowSelected: {
    borderColor: FG,
    backgroundColor: "#fff",
  },
  cityRowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconCircleSm: {
    width: 40,
    height: 40,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
  },
  iconCircleMd: {
    width: 48,
    height: 48,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontWeight: "600",
    fontSize: 16,
    color: FG,
  },
  selectedDot: {
    width: 12,
    height: 12,
    borderRadius: 999,
    backgroundColor: FG,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "space-between",
  },
  gridItem: {
    width: "47%",
  },
  catCell: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "transparent",
    backgroundColor: "rgba(0,0,0,0.05)",
    alignItems: "center",
    gap: 12,
    minHeight: 110,
    justifyContent: "center",
  },
  catCellSelected: {
    borderColor: FG,
    backgroundColor: "#fff",
  },
  catLabel: {
    fontWeight: "600",
    fontSize: 14,
    color: FG,
    textAlign: "center",
  },
  vibeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "transparent",
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  vibeRowSelected: {
    borderColor: FG,
    backgroundColor: "#fff",
  },
  vibeTextCol: {
    flex: 1,
  },
  vibeTitle: {
    fontWeight: "700",
    fontSize: 16,
    color: FG,
    marginBottom: 2,
  },
  vibeDesc: {
    fontSize: 13,
  },
  cardWrap: {
    height: 160,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 4,
    borderColor: "transparent",
  },
  cardWrapSelected: {
    borderColor: FG,
  },
  cardGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  cardText: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    lineHeight: 28,
  },
  cardCat: {
    fontSize: 13,
    color: "rgba(255,255,255,0.85)",
  },
  heartBadge: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 999,
    backgroundColor: FG,
    alignItems: "center",
    justifyContent: "center",
  },
});
