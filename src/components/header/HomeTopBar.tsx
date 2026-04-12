import { Ionicons } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import React, { useCallback, useRef } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { useLocation } from "../../lib/context/LocationContext";
import { LocationPickerSheet } from "../location/LocationPickerSheet";
import { LocationPill } from "./LocationPill";

const FG = "#111827";

interface HomeTopBarProps {
  onBellPress?: () => void;
}

export function HomeTopBar({ onBellPress }: HomeTopBarProps) {
  const sheetRef = useRef<BottomSheetModal>(null);
  const { location } = useLocation();

  const handleLocationPress = useCallback(() => {
    sheetRef.current?.present();
  }, []);

  return (
    <>
      <View style={styles.bar}>
        <View style={styles.center} pointerEvents="box-none">
          <LocationPill label={location.label} onPress={handleLocationPress} />
        </View>

        <View style={styles.left}>
          <Image
            source={require("@/assets/images/app-icon.png")}
            style={styles.logo}
            contentFit="contain"
          />
        </View>

        <View style={styles.right}>
          <Pressable style={styles.bellWrap} hitSlop={8} onPress={onBellPress}>
            <Ionicons name="notifications-outline" size={22} color={FG} />
          </Pressable>
        </View>
      </View>

      <LocationPickerSheet ref={sheetRef} />
    </>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 14,
  },
  center: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  left: {
    width: 38,
    height: 38,
  },
  logo: {
    position: "absolute",
    left: 0,
    top: -4,
    width: 90,
    height: 46,
  },
  right: {},
  bellWrap: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: "rgba(15, 23, 42, 0.10)",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});
