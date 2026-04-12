import { Ionicons } from "@expo/vector-icons";
import React, { type ComponentProps } from "react";
import { Pressable, StyleSheet, View } from "react-native";

const FG = "#111827";

type IonName = ComponentProps<typeof Ionicons>["name"];

export interface HeaderIconButtonProps {
  name: IonName;
  onPress: () => void;
  accessibilityLabel: string;
}

export function HeaderIconButton({
  name,
  onPress,
  accessibilityLabel,
}: HeaderIconButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      hitSlop={10}
      onPress={onPress}
      style={({ pressed }) => [styles.hit, pressed && styles.hitPressed]}
    >
      <View style={styles.circle}>
        <Ionicons name={name} size={22} color={FG} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  hit: {
    padding: 2,
  },
  hitPressed: {
    opacity: 0.65,
  },
  circle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(15, 23, 42, 0.06)",
  },
});
