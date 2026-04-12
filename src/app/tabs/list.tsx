import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { TabScreenChrome } from "../../components/header";

export default function ListTab() {
  return (
    <TabScreenChrome
      header={{
        variant: "centered",
        title: "List",
      }}
    >
      <View style={styles.body}>
        <Text style={styles.placeholder}>Saved list goes here.</Text>
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
