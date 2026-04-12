import { Image } from "expo-image";
import React from "react";
import { StyleSheet, View } from "react-native";

export function Logo() {
  return (
    <View style={styles.wrap}>
      <Image
        source={require("@/assets/images/app-icon.png")}
        style={styles.image}
        contentFit="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: 120,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    width: 140,
    height: 56,
  },
});
