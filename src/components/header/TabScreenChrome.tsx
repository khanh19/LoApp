import React, { type ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import type { ScreenHeaderProps } from "./ScreenHeader";
import { ScreenHeader } from "./ScreenHeader";

export interface TabScreenChromeProps {
  children: ReactNode;
  header: ScreenHeaderProps;
}

/**
 * Shared tab shell: top safe area, header with bottom hairline, scrollable body area.
 */
export function TabScreenChrome({ children, header }: TabScreenChromeProps) {
  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <View style={styles.headerWrap}>
        <ScreenHeader {...header} />
      </View>
      <View style={styles.body}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerWrap: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(15, 23, 42, 0.06)",
    backgroundColor: "#fff",
  },
  body: {
    flex: 1,
  },
});
