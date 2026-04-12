import { Ionicons } from "@expo/vector-icons";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { BottomTabBarHeightCallbackContext } from "@react-navigation/bottom-tabs";
import { CommonActions } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import React, { useContext, useEffect } from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const ACTIVE_COLOR = "#0f172b";
const INACTIVE_COLOR = "#90a1b9";
const PLUS_BG = "#202737";
const BAR_BG = "#FFFFFF";

const BAR_HEIGHT = 65;
const BAR_BOTTOM_MARGIN = 10;
const BAR_MARGIN_H = 16;
const PLUS_SIZE = 52;
/** How far the + button's bottom edge dips below the bar's top edge. */
const PLUS_OVERLAP = 14;
/** Extra padding ring drawn behind the + button to visually blend it with the bar edge. */
const RING_EXTRA = 6;

const HIDDEN_ROUTES = new Set(["profile"]);

function TabItem({
  route,
  state,
  descriptors,
  navigation,
}: {
  route: BottomTabBarProps["state"]["routes"][0];
  state: BottomTabBarProps["state"];
  descriptors: BottomTabBarProps["descriptors"];
  navigation: BottomTabBarProps["navigation"];
}) {
  const focused = state.routes[state.index].key === route.key;
  const { options } = descriptors[route.key];
  const color = focused ? ACTIVE_COLOR : INACTIVE_COLOR;

  const label =
    typeof options.tabBarLabel === "string"
      ? options.tabBarLabel
      : typeof options.title === "string"
        ? options.title
        : route.name;

  const icon = options.tabBarIcon?.({ focused, color, size: 24 }) ?? (
    <Ionicons name="ellipse-outline" size={24} color={color} />
  );

  const onPress = () => {
    if (Platform.OS === "ios" || Platform.OS === "android") {
      void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    const event = navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    });
    if (!focused && !event.defaultPrevented) {
      navigation.dispatch({
        ...CommonActions.navigate(route),
        target: state.key,
      });
    }
  };

  return (
    <Pressable
      accessibilityRole="tab"
      accessibilityState={{ selected: focused }}
      accessibilityLabel={options.tabBarAccessibilityLabel ?? label}
      onPress={onPress}
      style={styles.tabPressable}
    >
      <View style={styles.tabInner}>
        {icon}
        <Text
          style={[
            styles.label,
            { color, fontWeight: focused ? "700" : "500" },
          ]}
          numberOfLines={1}
        >
          {label}
        </Text>
      </View>
    </Pressable>
  );
}

export function FloatingTabBar({
  state,
  descriptors,
  navigation,
  insets,
}: BottomTabBarProps) {
  const onHeightChange = useContext(BottomTabBarHeightCallbackContext);

  const barBottom = BAR_BOTTOM_MARGIN + insets.bottom;
  const barTop = barBottom + BAR_HEIGHT;
  const plusBottom = barTop - PLUS_OVERLAP;
  const totalHeight = plusBottom + PLUS_SIZE + 8;

  useEffect(() => {
    onHeightChange?.(barTop + 8);
  }, [barTop, onHeightChange]);

  const visibleRoutes = state.routes.filter((r) => !HIDDEN_ROUTES.has(r.name));
  const leftRoutes = visibleRoutes.slice(0, 2);
  const rightRoutes = visibleRoutes.slice(2, 4);

  const ringSize = PLUS_SIZE + RING_EXTRA * 2;
  const centerGapWidth = ringSize + 8;

  return (
    <View
      pointerEvents="box-none"
      style={[styles.wrapper, { height: totalHeight }]}
    >
      {/* White pill bar */}
      <View
        style={[
          styles.bar,
          { bottom: barBottom, left: BAR_MARGIN_H, right: BAR_MARGIN_H },
        ]}
      >
        <View style={styles.tabGroup}>
          {leftRoutes.map((route) => (
            <TabItem
              key={route.key}
              route={route}
              state={state}
              descriptors={descriptors}
              navigation={navigation}
            />
          ))}
        </View>

        {/* Gap for the + button */}
        <View style={{ width: centerGapWidth }} />

        <View style={styles.tabGroup}>
          {rightRoutes.map((route) => (
            <TabItem
              key={route.key}
              route={route}
              state={state}
              descriptors={descriptors}
              navigation={navigation}
            />
          ))}
        </View>
      </View>

      {/* White "collar" ring — sits between the bar top and the + button,
          giving the visual impression of the bar curving around the button. */}
      <View
        pointerEvents="none"
        style={[
          styles.ring,
          {
            width: ringSize,
            height: ringSize,
            borderRadius: ringSize / 2,
            bottom: plusBottom - RING_EXTRA,
          },
        ]}
      />

      {/* Floating "+" action button */}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Add"
        style={({ pressed }) => [
          styles.plusBtn,
          { bottom: plusBottom },
          pressed && styles.plusBtnPressed,
        ]}
        onPress={() => {
          void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  bar: {
    position: "absolute",
    height: BAR_HEIGHT,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: BAR_HEIGHT / 2,
    backgroundColor: BAR_BG,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(15, 23, 42, 0.12)",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
      },
      android: {
        elevation: 10,
      },
      default: {},
    }),
  },
  tabGroup: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  tabPressable: {
    flex: 1,
    alignItems: "center",
  },
  tabInner: {
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    paddingVertical: 8,
  },
  label: {
    fontSize: 10,
    letterSpacing: 0.25,
  },
  ring: {
    position: "absolute",
    alignSelf: "center",
    backgroundColor: BAR_BG,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(15, 23, 42, 0.10)",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
      },
      default: {},
    }),
  },
  plusBtn: {
    position: "absolute",
    alignSelf: "center",
    width: PLUS_SIZE,
    height: PLUS_SIZE,
    borderRadius: PLUS_SIZE / 2,
    backgroundColor: PLUS_BG,
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.22,
        shadowRadius: 8,
      },
      android: {
        elevation: 12,
      },
      default: {},
    }),
  },
  plusBtnPressed: {
    opacity: 0.85,
  },
});
