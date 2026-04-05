import { Ionicons } from "@expo/vector-icons";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { BottomTabBarHeightCallbackContext } from "@react-navigation/bottom-tabs";
import { CommonActions } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import { useContext } from "react";
import {
  LayoutChangeEvent,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { SPLASH_BACKGROUND } from "../../constants";

const ACTIVE = "#111827";
const INACTIVE = "#94a3b8";
const PILL_BG = "#FFFFFF";
const BAR_MARGIN_ABOVE_HOME = 12;
const PILL_MIN_HEIGHT = 56;

function resolveTabLabel(
  options: BottomTabBarProps["descriptors"][string]["options"],
  routeName: string,
  focused: boolean,
  color: string,
): string {
  const { tabBarLabel, title } = options;
  if (typeof tabBarLabel === "string") return tabBarLabel;
  if (typeof tabBarLabel === "function") {
    const rendered = tabBarLabel({
      focused,
      color,
      position: "below-icon",
      children: typeof title === "string" ? title : routeName,
    });
    if (typeof rendered === "string") return rendered;
  }
  if (typeof title === "string") return title;
  return routeName;
}

export function FloatingTabBar({
  state,
  descriptors,
  navigation,
  insets,
}: BottomTabBarProps) {
  const onHeightChange = useContext(BottomTabBarHeightCallbackContext);

  const handleLayout = (e: LayoutChangeEvent) => {
    onHeightChange?.(e.nativeEvent.layout.height);
  };

  return (
    <View
      pointerEvents="box-none"
      style={[
        styles.outer,
        {
          paddingBottom: BAR_MARGIN_ABOVE_HOME + insets.bottom,
          paddingHorizontal: 20,
        },
      ]}
      onLayout={handleLayout}
    >
      <View style={styles.pill}>
        {state.routes.map((route, index) => {
          const focused = state.index === index;
          const { options } = descriptors[route.key];
          const color = focused ? ACTIVE : INACTIVE;
          const label = resolveTabLabel(options, route.name, focused, color);

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

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          const icon = options.tabBarIcon?.({
            focused,
            color,
            size: 24,
          }) ?? <Ionicons name="ellipse-outline" size={24} color={color} />;

          return (
            <Pressable
              key={route.key}
              accessibilityRole="tab"
              accessibilityState={{ selected: focused }}
              accessibilityLabel={options.tabBarAccessibilityLabel ?? label}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabPressable}
            >
              <View
                style={[styles.tabInner, focused && styles.tabInnerFocused]}
              >
                {icon}
                <Text style={[styles.label, { color }]} numberOfLines={1}>
                  {label}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    backgroundColor: "#FFFFFF",
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: PILL_MIN_HEIGHT,
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 28,
    backgroundColor: PILL_BG,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(15, 23, 42, 0.08)",
    ...Platform.select({
      ios: {
        shadowColor: "#0f172a",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
      },
      android: {
        elevation: 10,
      },
      default: {},
    }),
  },
  tabPressable: {
    flex: 1,
  },
  tabInner: {
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 22,
  },
  tabInnerFocused: {
    backgroundColor: SPLASH_BACKGROUND,
  },
  label: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.15,
  },
});
