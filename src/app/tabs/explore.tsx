import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { HeaderIconButton, TabScreenChrome } from "../../components/header";

export default function ExploreTab() {
  return (
    <TabScreenChrome
      header={{
        variant: "inline",
        title: "Explore",
        subtitle: "Trending near you",
        right: (
          <HeaderIconButton
            name="options-outline"
            accessibilityLabel="Filters and sort"
            onPress={() => undefined}
          />
        ),
      }}
    >
      <View style={styles.body}>
        <Text style={styles.placeholder}>Discover feed goes here.</Text>
      </View>
    </TabScreenChrome>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  placeholder: {
    fontSize: 15,
    color: "#64748b",
    textAlign: "center",
  },
});
