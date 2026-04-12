import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, useWindowDimensions } from "react-native";

import { useLocation } from "../../lib/context/LocationContext";

const FG = "#111827";
const MUTED = "#64748B";

interface LocationPillProps {
  label?: string;
  onPress?: () => void;
}

export function LocationPill({ label, onPress }: LocationPillProps) {
  const { location } = useLocation();
  const { width: screenWidth } = useWindowDimensions();

  const displayLabel = label ?? location.label;
  const maxPillWidth = screenWidth * 0.5;

  return (
    <Pressable
      style={[styles.pill, { maxWidth: maxPillWidth }]}
      hitSlop={8}
      onPress={onPress}
    >
      <Ionicons name="location-sharp" size={14} color={FG} />
      <Text style={styles.label} numberOfLines={1}>
        {displayLabel}
      </Text>
      <Ionicons name="chevron-down" size={14} color={MUTED} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(15, 23, 42, 0.12)",
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: FG,
    flexShrink: 1,
  },
});
