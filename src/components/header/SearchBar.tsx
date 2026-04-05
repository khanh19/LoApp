import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

const FG = "#111827";
const MUTED = "#64748B";

interface SearchBarProps {
  placeholder?: string;
  onChangeText?: (text: string) => void;
  value?: string;
}

export function SearchBar({
  placeholder = "Search venues, friends, vibes...",
  onChangeText,
  value,
}: SearchBarProps) {
  return (
    <View style={styles.bar}>
      <Ionicons name="search-outline" size={17} color={MUTED} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={MUTED}
        returnKeyType="search"
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "rgba(15, 23, 42, 0.05)",
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 46,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(15, 23, 42, 0.08)",
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: FG,
  },
});
