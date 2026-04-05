import { StyleSheet, Text, View } from "react-native";

export default function ExploreScreen() {
  return (
    <View style={styles.root}>
      <Text style={styles.title}>Discover</Text>
      <Text style={styles.sub}>Tab content goes here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },
  sub: {
    fontSize: 15,
    color: "#64748b",
    textAlign: "center",
  },
});
