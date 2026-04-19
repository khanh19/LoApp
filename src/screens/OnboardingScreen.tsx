import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import * as SystemUI from "expo-system-ui";
import React, { type ComponentProps, useLayoutEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  type VenueChoice,
  onboardingVenueChoices,
} from "../data/onboarding-venues";

const FG = "#111827";

interface CityCard {
  id: string;
  name: string;
  country: string;
  image: string;
}

const CITY_CARDS: CityCard[] = [
  {
    id: "hanoi",
    name: "Hanoi",
    country: "Vietnam",
    image:
      "https://images.unsplash.com/photo-1509030450996-dd1a26dda07a?w=800&q=80",
  },
  {
    id: "hcmc",
    name: "Ho Chi Minh City",
    country: "Vietnam",
    image:
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&q=80",
  },
  {
    id: "hoian",
    name: "Hoi An City",
    country: "Vietnam",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  },
];

type IonName = ComponentProps<typeof Ionicons>["name"];

const CATEGORY_ITEMS: { id: string; icon: IonName }[] = [
  { id: "Restaurants", icon: "restaurant-outline" },
  { id: "Cafes", icon: "cafe-outline" },
  { id: "Bars", icon: "wine-outline" },
  { id: "Entertainment", icon: "sparkles-outline" },
  { id: "Itineraries", icon: "map-outline" },
  { id: "Visits", icon: "eye-outline" },
];

interface VibeItem {
  id: string;
  label: string;
  desc: string;
  icon: IonName;
  cardBg: string;
  titleColor: string;
}

const VIBE_ITEMS: VibeItem[] = [
  {
    id: "chill",
    label: "Chill & Relaxed",
    desc: "Slow pace, comfortable spots, easy conversations",
    icon: "cafe-outline",
    cardBg: "#e4f0ff",
    titleColor: "#111827",
  },
  {
    id: "trendy",
    label: "Trendy & Aesthetic",
    desc: "Beautiful spaces, popular spots, worth sharing",
    icon: "sparkles-outline",
    cardBg: "#f6db93",
    titleColor: "#725a00",
  },
  {
    id: "social",
    label: "Social & Lively",
    desc: "Crowded energy, group vibes, buzzing atmosphere",
    icon: "moon-outline",
    cardBg: "#ffe4e4",
    titleColor: "#ff6565",
  },
  {
    id: "unique",
    label: "Unique & Hidden",
    desc: "Unexpected finds, only local knows!",
    icon: "diamond-outline",
    cardBg: "#e5ffe4",
    titleColor: "#089c03",
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
  const [favorites, setFavorites] = useState<string[]>([]);

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

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    );
  };

  const canContinue =
    (step === 1 && !!city) ||
    (step === 2 && categories.length > 0) ||
    (step === 3 && !!vibe) ||
    (step === 4 && favorites.length > 0);

  useLayoutEffect(() => {
    void SystemUI.setBackgroundColorAsync("#ffffff");
  }, []);

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={["top", "left", "right", "bottom"]}
    >
      <View style={styles.inner}>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <Text style={styles.stepLabel}>STEP {step} OF 4</Text>
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
            <StepPreference favorites={favorites} onToggle={toggleFavorite} />
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
                {step === 4 ? "Start Exploring!" : "Continue"}
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
  const [search, setSearch] = useState("");

  const filtered = search
    ? CITY_CARDS.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase()),
      )
    : CITY_CARDS;

  return (
    <View style={styles.stepSection}>
      <Text style={styles.h1}>Where are you{"\n"}exploring?</Text>
      <Text style={styles.sub}>
        Select your city to get localized recommendations.
      </Text>

      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color={FG} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#394665"
          value={search}
          onChangeText={setSearch}
          returnKeyType="search"
        />
        <Ionicons name="mic-outline" size={20} color="#070e1e" />
      </View>

      <Text style={styles.suggestedLabel}>Suggested for you</Text>

      <View style={styles.cityCardsColumn}>
        {filtered.map((c) => {
          const selected = city === c.id;
          return (
            <Pressable key={c.id} onPress={() => onSelect(c.id)}>
              <View
                style={[
                  styles.cityCard,
                  selected && styles.cityCardSelected,
                ]}
              >
                <Image
                  source={{ uri: c.image }}
                  style={StyleSheet.absoluteFillObject}
                  contentFit="cover"
                />
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.55)"]}
                  style={styles.cityCardGradient}
                />
                <View style={styles.cityCardText}>
                  <Text style={styles.cityCardName}>{c.name}</Text>
                  <Text style={styles.cityCardCountry}>{c.country}</Text>
                </View>
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
  const rows = [];
  for (let i = 0; i < CATEGORY_ITEMS.length; i += 2) {
    rows.push(CATEGORY_ITEMS.slice(i, i + 2));
  }

  return (
    <View style={styles.stepSection}>
      <Text style={styles.h1}>What are you into?</Text>
      <Text style={[styles.sub, styles.subTight]}>
        Pick up to 3 categories so Lô! can personalize your feed!
      </Text>
      <View style={styles.catGrid}>
        {rows.map((row, rowIdx) => (
          <View key={rowIdx} style={styles.catRow}>
            {row.map((cat) => {
              const selected = categories.includes(cat.id);
              return (
                <Pressable
                  key={cat.id}
                  onPress={() => onToggle(cat.id)}
                  style={styles.catItem}
                >
                  <View
                    style={[styles.catCell, selected && styles.catCellSelected]}
                  >
                    <Ionicons
                      name={cat.icon}
                      size={24}
                      color={selected ? "#fff" : FG}
                    />
                    <Text
                      style={[
                        styles.catLabel,
                        selected && styles.catLabelSelected,
                      ]}
                    >
                      {cat.id}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        ))}
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
      <Text style={styles.h1}>What is your vibe?</Text>
      <Text style={[styles.sub, styles.subTight]}>
        These helps Lô! finds the best spots that fits your interests!
      </Text>
      <View style={styles.colGap12}>
        {VIBE_ITEMS.map((v) => {
          const selected = vibe === v.id;
          return (
            <Pressable key={v.id} onPress={() => onSelect(v.id)}>
              <View
                style={[
                  styles.vibeRow,
                  { backgroundColor: v.cardBg },
                  selected && styles.vibeRowSelected,
                ]}
              >
                <View style={styles.vibeIconCircle}>
                  <Ionicons name={v.icon} size={20} color={v.titleColor} />
                </View>
                <View style={styles.vibeTextCol}>
                  <Text style={[styles.vibeTitle, { color: v.titleColor }]}>
                    {v.label}
                  </Text>
                  <Text style={styles.vibeDesc}>{v.desc}</Text>
                </View>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

function VenueCard({
  venue,
  selected,
  onToggle,
}: {
  venue: VenueChoice;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <Pressable onPress={onToggle}>
      <View style={[styles.venueCard, selected && styles.venueCardSelected]}>
        <View style={styles.venueImageWrap}>
          <Image
            source={{ uri: venue.image }}
            style={StyleSheet.absoluteFillObject}
            contentFit="cover"
          />
          {selected && (
            <View style={styles.venueCheckBadge}>
              <Ionicons name="checkmark" size={14} color="#fff" />
            </View>
          )}
          <View style={styles.venueDots}>
            {[0, 1, 2, 3].map((i) => (
              <View
                key={i}
                style={[styles.venueDot, i === 0 && styles.venueDotActive]}
              />
            ))}
          </View>
        </View>

        <View style={styles.venueBody}>
          <Text style={styles.venueName}>{venue.name}</Text>

          <View style={styles.venueMeta}>
            <Text style={styles.venueMetaText}>{venue.category}</Text>
            <View style={styles.venueMetaItem}>
              <Ionicons name="star" size={12} color="#f59e0b" />
              <Text style={styles.venueMetaGray}>{venue.rating}</Text>
            </View>
            <Text style={styles.venueMetaPrice}>{venue.price}</Text>
            <View style={styles.venueMetaItem}>
              <Ionicons name="location-outline" size={12} color="#4a5565" />
              <Text style={styles.venueMetaGray} numberOfLines={1}>
                {venue.location}
              </Text>
            </View>
          </View>

          <View style={styles.venueTags}>
            {venue.tags.map((tag, idx) => (
              <React.Fragment key={tag}>
                {idx > 0 && <View style={styles.venueTagDot} />}
                <Text style={styles.venueTagText}>{tag}</Text>
              </React.Fragment>
            ))}
          </View>
        </View>
      </View>
    </Pressable>
  );
}

function StepPreference({
  favorites,
  onToggle,
}: {
  favorites: string[];
  onToggle: (id: string) => void;
}) {
  return (
    <View style={styles.stepSection}>
      <Text style={styles.h1}>Pick some favorites!</Text>
      <Text style={[styles.sub, styles.subTight]}>
        Select as much as you can so Lô! can understand your taste better!
      </Text>
      <View style={styles.colGap16}>
        {onboardingVenueChoices.map((v) => (
          <VenueCard
            key={v.id}
            venue={v}
            selected={favorites.includes(v.id)}
            onToggle={() => onToggle(v.id)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  inner: {
    flex: 1,
    width: "100%",
    alignSelf: "stretch",
    backgroundColor: "#fff",
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
    width: "100%",
    backgroundColor: "#fff",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  stepLabel: {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: -0.31,
    color: "#000",
  },
  skipText: {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: -0.31,
    color: "#000",
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
    backgroundColor: "#fff",
  },
  continueBtn: {
    backgroundColor: FG,
    paddingVertical: 16,
    borderRadius: 65,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  continueBtnDisabled: {
    opacity: 0.45,
  },
  continueText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 17,
    letterSpacing: -0.08,
    lineHeight: 22,
  },
  scroll: {
    flex: 1,
    zIndex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  stepSection: {
    marginBottom: 24,
  },
  h1: {
    fontSize: 32,
    fontFamily: "PlayfairDisplay_600SemiBold",
    color: "#000",
    lineHeight: 38,
    letterSpacing: -0.45,
    marginBottom: 21,
  },
  sub: {
    fontSize: 15,
    color: "#8E8E93",
    letterSpacing: -0.23,
    lineHeight: 20,
    marginBottom: 16,
  },
  subTight: {
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F7",
    borderRadius: 100,
    paddingHorizontal: 11,
    paddingVertical: 11,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 17,
    letterSpacing: -0.08,
    lineHeight: 22,
    color: "#394665",
    padding: 0,
  },
  suggestedLabel: {
    fontSize: 15,
    color: "#8E8E93",
    letterSpacing: -0.23,
    lineHeight: 20,
    marginTop: 24,
    marginBottom: 17,
  },
  cityCardsColumn: {
    gap: 19,
  },
  cityCard: {
    height: 131,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "transparent",
  },
  cityCardSelected: {
    borderColor: FG,
  },
  cityCardGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  cityCardText: {
    position: "absolute",
    bottom: 12,
    left: 11,
    gap: 7,
  },
  cityCardName: {
    fontFamily: "PlayfairDisplay_400Regular",
    fontSize: 24,
    color: "#fff",
    letterSpacing: 0.5,
    lineHeight: 28,
  },
  cityCardCountry: {
    fontFamily: "PlayfairDisplay_400Regular",
    fontSize: 11,
    color: "rgba(255,255,255,0.75)",
    letterSpacing: 0.5,
    lineHeight: 15,
  },
  colGap12: {
    gap: 12,
  },
  colGap16: {
    gap: 16,
  },
  iconCircleSm: {
    width: 40,
    height: 40,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
  },
  catGrid: {
    gap: 16,
  },
  catRow: {
    flexDirection: "row",
    gap: 10,
  },
  catItem: {
    flex: 1,
  },
  catCell: {
    height: 92,
    borderRadius: 16,
    borderWidth: 1.66,
    borderColor: "#d9d9d9",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  catCellSelected: {
    borderColor: FG,
    backgroundColor: FG,
  },
  catLabel: {
    fontWeight: "700",
    fontSize: 14,
    color: FG,
    textAlign: "center",
    lineHeight: 21,
  },
  catLabelSelected: {
    color: "#fff",
  },
  vibeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 16,
    borderRadius: 10,
    borderWidth: 2.5,
    borderColor: "transparent",
  },
  vibeRowSelected: {
    borderColor: FG,
  },
  vibeIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 999,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  vibeTextCol: {
    flex: 1,
    gap: 2,
  },
  vibeTitle: {
    fontWeight: "700",
    fontSize: 16,
    lineHeight: 24,
  },
  vibeDesc: {
    fontSize: 13,
    color: "#64748b",
    lineHeight: 19,
  },
  venueCard: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#d9d9d9",
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  venueCardSelected: {
    borderColor: FG,
    borderWidth: 2,
  },
  venueImageWrap: {
    height: 185,
    position: "relative",
  },
  venueCheckBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 26,
    height: 26,
    borderRadius: 999,
    backgroundColor: FG,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  venueDots: {
    position: "absolute",
    bottom: 8,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    gap: 4,
  },
  venueDot: {
    width: 6,
    height: 6,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.5)",
  },
  venueDotActive: {
    backgroundColor: "#fff",
  },
  venueBody: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  venueName: {
    fontSize: 16,
    fontWeight: "700",
    color: FG,
    lineHeight: 18,
  },
  venueMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },
  venueMetaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  venueMetaText: {
    fontSize: 11,
    color: FG,
    lineHeight: 19,
  },
  venueMetaGray: {
    fontSize: 11,
    color: "#4a5565",
    lineHeight: 20,
  },
  venueMetaPrice: {
    fontSize: 11,
    color: "#364153",
    lineHeight: 20,
  },
  venueTags: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    flexWrap: "wrap",
  },
  venueTagDot: {
    width: 4,
    height: 4,
    borderRadius: 999,
    backgroundColor: FG,
  },
  venueTagText: {
    fontSize: 11,
    color: FG,
    lineHeight: 19,
  },
});
