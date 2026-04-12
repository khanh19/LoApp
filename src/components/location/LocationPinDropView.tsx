import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MapView, { type Region } from "react-native-maps";

const FG = "#111827";
const MUTED = "#64748B";

interface LocationResult {
  label: string;
  latitude: number;
  longitude: number;
}

interface LocationPinDropViewProps {
  initialLatitude?: number;
  initialLongitude?: number;
  onConfirm: (result: LocationResult) => void;
}

const DELTA = 0.01;

export function LocationPinDropView({
  initialLatitude = 10.7769,
  initialLongitude = 106.7009,
  onConfirm,
}: LocationPinDropViewProps) {
  const mapRef = useRef<MapView>(null);
  const [region, setRegion] = useState<Region>({
    latitude: initialLatitude,
    longitude: initialLongitude,
    latitudeDelta: DELTA,
    longitudeDelta: DELTA,
  });
  const [addressLabel, setAddressLabel] = useState("Move the map to pick a location");
  const [isResolving, setIsResolving] = useState(false);

  const reverseGeocode = useCallback(async (lat: number, lng: number) => {
    setIsResolving(true);
    try {
      const [result] = await Location.reverseGeocodeAsync({
        latitude: lat,
        longitude: lng,
      });
      if (result) {
        const parts = [result.name, result.district, result.city].filter(Boolean);
        setAddressLabel(parts.join(", ") || `${lat.toFixed(4)}, ${lng.toFixed(4)}`);
      }
    } catch {
      setAddressLabel(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);
    } finally {
      setIsResolving(false);
    }
  }, []);

  useEffect(() => {
    reverseGeocode(initialLatitude, initialLongitude);
  }, [initialLatitude, initialLongitude, reverseGeocode]);

  const handleRegionChangeComplete = useCallback(
    (newRegion: Region) => {
      setRegion(newRegion);
      reverseGeocode(newRegion.latitude, newRegion.longitude);
    },
    [reverseGeocode],
  );

  const handleRecenter = useCallback(async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      const pos = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      const newRegion: Region = {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        latitudeDelta: DELTA,
        longitudeDelta: DELTA,
      };
      mapRef.current?.animateToRegion(newRegion, 400);
    } catch {
      /* location unavailable */
    }
  }, []);

  const handleConfirm = useCallback(() => {
    onConfirm({
      label: addressLabel,
      latitude: region.latitude,
      longitude: region.longitude,
    });
  }, [addressLabel, onConfirm, region]);

  return (
    <View style={styles.container}>
      <View style={styles.mapWrap}>
        <MapView
          ref={mapRef}
          style={StyleSheet.absoluteFill}
          initialRegion={region}
          onRegionChangeComplete={handleRegionChangeComplete}
          showsUserLocation
          showsMyLocationButton={false}
        />

        {/* Center pin overlay */}
        <View style={styles.pinWrap} pointerEvents="none">
          <Ionicons name="location-sharp" size={40} color="#EF4444" />
        </View>

        {/* Recenter button */}
        <Pressable style={styles.recenterBtn} onPress={handleRecenter}>
          <Ionicons name="navigate" size={20} color="#3B82F6" />
        </Pressable>
      </View>

      <View style={styles.footer}>
        <View style={styles.addressRow}>
          <Ionicons name="location-outline" size={20} color={MUTED} />
          {isResolving ? (
            <ActivityIndicator size="small" color={MUTED} style={styles.addressLoader} />
          ) : (
            <Text style={styles.addressText} numberOfLines={2}>
              {addressLabel}
            </Text>
          )}
        </View>

        <Pressable style={styles.confirmBtn} onPress={handleConfirm}>
          <Text style={styles.confirmText}>Confirm Location</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapWrap: {
    flex: 1,
    overflow: "hidden",
    borderRadius: 16,
    marginHorizontal: 20,
    marginTop: 8,
  },
  pinWrap: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 40,
  },
  recenterBtn: {
    position: "absolute",
    bottom: 12,
    right: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  addressLoader: {
    marginLeft: 4,
  },
  addressText: {
    flex: 1,
    fontSize: 14,
    color: FG,
  },
  confirmBtn: {
    backgroundColor: FG,
    borderRadius: 14,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  confirmText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
