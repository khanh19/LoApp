import React, { type ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

import { HeaderIconButton } from "./HeaderIconButton";

const FG = "#111827";
const MUTED = "#64748B";

export interface HomeHeaderProps {
  variant: "home";
  title: string;
  subtitle?: string;
  onPressNotifications?: () => void;
  onPressSearch?: () => void;
}

export interface CenteredHeaderProps {
  variant: "centered";
  title: string;
  left?: ReactNode;
  right?: ReactNode;
}

export interface InlineHeaderProps {
  variant: "inline";
  title: string;
  subtitle?: string;
  right?: ReactNode;
}

export type ScreenHeaderProps =
  | HomeHeaderProps
  | CenteredHeaderProps
  | InlineHeaderProps;

export function ScreenHeader(props: ScreenHeaderProps) {
  if (props.variant === "home") {
    return (
      <View style={styles.block}>
        <View style={styles.homeTopRow}>
          <View style={styles.homeTopSpacer} />
          <View style={styles.homeActions}>
            {props.onPressNotifications ? (
              <HeaderIconButton
                name="notifications-outline"
                accessibilityLabel="Notifications"
                onPress={props.onPressNotifications}
              />
            ) : null}
            {props.onPressSearch ? (
              <HeaderIconButton
                name="search-outline"
                accessibilityLabel="Search"
                onPress={props.onPressSearch}
              />
            ) : null}
          </View>
        </View>
        <Text style={styles.homeTitle}>{props.title}</Text>
        {props.subtitle ? (
          <Text style={styles.homeSubtitle}>{props.subtitle}</Text>
        ) : null}
      </View>
    );
  }

  if (props.variant === "centered") {
    return (
      <View style={styles.centeredRow}>
        <View style={styles.centeredSide}>{props.left ?? null}</View>
        <View style={styles.centeredMiddle} pointerEvents="none">
          <Text style={styles.centeredTitle} numberOfLines={1}>
            {props.title}
          </Text>
        </View>
        <View style={[styles.centeredSide, styles.centeredSideEnd]}>
          {props.right ?? null}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.inlineRow}>
      <View style={styles.inlineTextCol}>
        <Text style={styles.inlineTitle}>{props.title}</Text>
        {props.subtitle ? (
          <Text style={styles.inlineSubtitle}>{props.subtitle}</Text>
        ) : null}
      </View>
      {props.right ? (
        <View style={styles.inlineTrailing}>{props.right}</View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    paddingBottom: 4,
  },
  homeTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  homeTopSpacer: {
    flex: 1,
  },
  homeActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  homeTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: FG,
    letterSpacing: -0.5,
    lineHeight: 34,
  },
  homeSubtitle: {
    marginTop: 6,
    fontSize: 15,
    color: MUTED,
    lineHeight: 20,
  },
  centeredRow: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 44,
  },
  centeredSide: {
    width: 48,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  centeredSideEnd: {
    alignItems: "flex-end",
  },
  centeredMiddle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  centeredTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: FG,
    textAlign: "center",
  },
  inlineRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    minHeight: 44,
  },
  inlineTextCol: {
    flex: 1,
    minWidth: 0,
  },
  inlineTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: FG,
    letterSpacing: -0.3,
  },
  inlineSubtitle: {
    marginTop: 2,
    fontSize: 14,
    color: MUTED,
  },
  inlineTrailing: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
