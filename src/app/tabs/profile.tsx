import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { HeaderIconButton, TabScreenChrome } from "../../components/header";

export default function ProfileTab() {
  return (
    <TabScreenChrome
      header={{
        variant: "centered",
        title: "Profile",
        right: (
          <HeaderIconButton
            name="settings-outline"
            accessibilityLabel="Settings"
            onPress={() => undefined}
          />
        ),
      }}
    >
      <View style={styles.body}>
        <Text style={styles.placeholder}>Profile content goes here.</Text>
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
