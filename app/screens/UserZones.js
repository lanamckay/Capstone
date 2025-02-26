import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import MapView, { Marker, Circle } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "../components/NavBar";
import Button from "../components/Button";

export default function UserZones({ navigation }) {
  const [zones, setZones] = useState([]);
  const formatTime = (timeString) => {
    const [hour, minute] = timeString.split(":");
    const date = new Date();
    date.setHours(parseInt(hour));
    date.setMinutes(parseInt(minute));

    // Format to 12-hour AM/PM format
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  // Fetch zones from the API
  useEffect(() => {
    const fetchZones = async () => {
      try {
        const response = await fetch(
          "https://t0acfkle3f.execute-api.us-east-2.amazonaws.com/dev?user_id=1"
        );
        const data = await response.json();
        setZones(data);
      } catch (error) {
        console.error("Failed to fetch zones:", error);
      }
    };

    fetchZones();
  }, []);
  const refreshZones = async () => {
    try {
      const response = await fetch(
        "https://t0acfkle3f.execute-api.us-east-2.amazonaws.com/dev?user_id=1"
      );
      const data = await response.json();
      setZones(data);
    } catch (error) {
      console.error("Failed to refresh zones:", error);
    }
  };
  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Zones ( {zones.length} )</Text>

        {zones.length === 0 ? (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>No Zones</Text>
            <Text style={styles.cardText}>⚬ You don't have any zones yet.</Text>
          </View>
        ) : (
          zones.map((zone) => (
            <TouchableOpacity
              key={zone.id}
              style={styles.card}
              onPress={() => navigation.navigate("Zone", { zoneId: zone.id })} // Pass zone ID to the Zone page
            >
              <Text style={styles.cardTitle}>{zone.name}</Text>
              <Text style={styles.cardText}>Days: {zone.days.join(", ")}</Text>
              <Text style={styles.cardText}>
                Active From: {formatTime(zone.start_time)} -{" "}
                {formatTime(zone.end_time)}
              </Text>

              {/* Map with Zone Radius */}
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: zone.origin_latitude,
                  longitude: zone.origin_longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
                onStartShouldSetResponder={() => true} // Prevent parent touch event
              >
                <Marker
                  coordinate={{
                    latitude: zone.origin_latitude,
                    longitude: zone.origin_longitude,
                  }}
                  title={`Zone ${zone.id}`}
                />
                <Circle
                  center={{
                    latitude: zone.origin_latitude,
                    longitude: zone.origin_longitude,
                  }}
                  radius={zone.radius * 1000} // Convert km to meters
                  strokeColor="red"
                  fillColor="rgba(255,0,0,0.2)"
                />
              </MapView>
            </TouchableOpacity>
          ))
        )}

        {/* Create Zone Button */}
        <Button
          style={{
            backgroundColor: "#2E466E",
            paddingVertical: 10,
            marginTop: 20,
            marginBottom: 80,
          }}
          mode="contained"
          onPress={() => navigation.navigate("CreateZone", { refreshZones })}
        >
          + Create Zone
        </Button>
      </ScrollView>
      <NavBar style={styles.navBar} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#FAF9F6",
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#FAF9F6",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginTop: 20,
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    marginTop: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardText: {
    textAlign: "left",
    marginVertical: 5,
  },
  map: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
});
