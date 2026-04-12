import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const FG = "#111827";
const MUTED = "#64748B";
const BORDER = "rgba(15, 23, 42, 0.08)";

interface LocationResult {
  label: string;
  latitude: number;
  longitude: number;
}

interface LocationSearchViewProps {
  onSelect: (result: LocationResult) => void;
}

export function LocationSearchView({ onSelect }: LocationSearchViewProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<LocationResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = useCallback(async () => {
    const trimmed = query.trim();
    if (!trimmed) return;

    setIsLoading(true);
    setHasSearched(true);
    try {
      const geocoded = await Location.geocodeAsync(trimmed);

      const labeled = await Promise.all(
        geocoded.slice(0, 10).map(async (g) => {
          const [reverse] = await Location.reverseGeocodeAsync({
            latitude: g.latitude,
            longitude: g.longitude,
          });
          const parts = [
            reverse?.name,
            reverse?.district,
            reverse?.city,
            reverse?.region,
          ].filter(Boolean);
          return {
            label: parts.join(", ") || `${g.latitude.toFixed(4)}, ${g.longitude.toFixed(4)}`,
            latitude: g.latitude,
            longitude: g.longitude,
          };
        }),
      );
      setResults(labeled);
    } catch {
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [query]);

  const handleUseCurrentLocation = useCallback(async () => {
    setIsLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      const pos = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      const [reverse] = await Location.reverseGeocodeAsync({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });
      const parts = [
        reverse?.name,
        reverse?.district,
        reverse?.city,
      ].filter(Boolean);
      onSelect({
        label: parts.join(", ") || "Current Location",
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });
    } catch {
      /* permission denied or location unavailable */
    } finally {
      setIsLoading(false);
    }
  }, [onSelect]);

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <Ionicons name="search-outline" size={18} color={MUTED} />
        <TextInput
          style={styles.input}
          placeholder="Search for a city or address..."
          placeholderTextColor={MUTED}
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
          autoFocus
        />
        {query.length > 0 && (
          <Pressable onPress={() => setQuery("")} hitSlop={8}>
            <Ionicons name="close-circle" size={18} color={MUTED} />
          </Pressable>
        )}
      </View>

      <Pressable style={styles.currentRow} onPress={handleUseCurrentLocation}>
        <View style={styles.currentIcon}>
          <Ionicons name="navigate" size={18} color="#3B82F6" />
        </View>
        <Text style={styles.currentText}>Use current location</Text>
      </Pressable>

      {isLoading && (
        <ActivityIndicator style={styles.loader} color={MUTED} />
      )}

      <FlatList
        data={results}
        keyExtractor={(_, i) => String(i)}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => (
          <Pressable
            style={styles.resultRow}
            onPress={() => onSelect(item)}
          >
            <Ionicons
              name="location-outline"
              size={20}
              color={MUTED}
              style={styles.resultIcon}
            />
            <Text style={styles.resultText} numberOfLines={2}>
              {item.label}
            </Text>
          </Pressable>
        )}
        ListEmptyComponent={
          hasSearched && !isLoading ? (
            <Text style={styles.emptyText}>No results found</Text>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginHorizontal: 20,
    marginTop: 8,
    marginBottom: 16,
    paddingHorizontal: 14,
    height: 46,
    backgroundColor: "rgba(15, 23, 42, 0.05)",
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: BORDER,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: FG,
  },
  currentRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: BORDER,
  },
  currentIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  currentText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#3B82F6",
  },
  loader: {
    marginTop: 20,
  },
  resultRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: BORDER,
  },
  resultIcon: {
    marginRight: 12,
  },
  resultText: {
    flex: 1,
    fontSize: 15,
    color: FG,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 32,
    fontSize: 14,
    color: MUTED,
  },
});
