import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
  type BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import React, {
  forwardRef,
  useCallback,
  useMemo,
  useState,
} from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useLocation } from "../../lib/context/LocationContext";
import { LocationPinDropView } from "./LocationPinDropView";
import { LocationSearchView } from "./LocationSearchView";

const FG = "#111827";
const MUTED = "#64748B";

type Tab = "search" | "pin";

interface LocationResult {
  label: string;
  latitude: number;
  longitude: number;
}

export const LocationPickerSheet = forwardRef<BottomSheetModal>(
  function LocationPickerSheet(_props, ref) {
    const [activeTab, setActiveTab] = useState<Tab>("search");
    const { location, setLocation } = useLocation();
    const insets = useSafeAreaInsets();

    const snapPoints = useMemo(() => ["70%", "95%"], []);

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.4}
        />
      ),
      [],
    );

    const handleSelect = useCallback(
      (result: LocationResult) => {
        setLocation(result);
        if (ref && "current" in ref) {
          ref.current?.dismiss();
        }
      },
      [ref, setLocation],
    );

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        index={0}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={styles.indicator}
        backgroundStyle={styles.sheetBackground}
        enableDynamicSizing={false}
      >
        <BottomSheetView
          style={[styles.content, { paddingBottom: insets.bottom }]}
        >
          <Text style={styles.title}>Choose Location</Text>

          <View style={styles.tabRow}>
            <Pressable
              style={[styles.tab, activeTab === "search" && styles.tabActive]}
              onPress={() => setActiveTab("search")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "search" && styles.tabTextActive,
                ]}
              >
                Search
              </Text>
            </Pressable>
            <Pressable
              style={[styles.tab, activeTab === "pin" && styles.tabActive]}
              onPress={() => setActiveTab("pin")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "pin" && styles.tabTextActive,
                ]}
              >
                Pin Drop
              </Text>
            </Pressable>
          </View>

          <View style={styles.body}>
            {activeTab === "search" ? (
              <LocationSearchView onSelect={handleSelect} />
            ) : (
              <LocationPinDropView
                initialLatitude={location.latitude}
                initialLongitude={location.longitude}
                onConfirm={handleSelect}
              />
            )}
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

const styles = StyleSheet.create({
  sheetBackground: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  indicator: {
    backgroundColor: "#CBD5E1",
    width: 36,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: FG,
    textAlign: "center",
    marginTop: 4,
    marginBottom: 16,
  },
  tabRow: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginBottom: 12,
    backgroundColor: "rgba(15, 23, 42, 0.05)",
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  tabActive: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: MUTED,
  },
  tabTextActive: {
    color: FG,
  },
  body: {
    flex: 1,
  },
});
