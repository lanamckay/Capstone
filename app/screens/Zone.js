import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker, Circle } from "react-native-maps";
import NavBar from "../components/NavBar";

export default function Zone({ route, navigation }) {
  const { zoneId } = route.params;
  const [zone, setZone] = useState(null);
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
  // Fetch zone details based on the ID
  useEffect(() => {
    const fetchZoneDetails = async () => {
      try {
        const response = await fetch(
          `https://t0acfkle3f.execute-api.us-east-2.amazonaws.com/dev?user_id=1`
        );
        const data = await response.json();
        const selectedZone = data.find((z) => z.id === zoneId);
        setZone(selectedZone);
      } catch (error) {
        console.error("Failed to fetch zone details:", error);
      }
    };

    fetchZoneDetails();
  }, [zoneId]);

  if (!zone) {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <Text style={styles.loadingText}>Loading Zone Details...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Zone {zone.id}</Text>
      </View>

      {/* Weekly Schedule */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Weekly Schedule</Text>
          <View style={styles.daysContainer}>
            {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
              <View
                key={day}
                style={[
                  styles.dayButton,
                  zone.days.includes(day) && styles.activeDay,
                ]}
              >
                <Text
                  style={[
                    styles.dayText,
                    zone.days.includes(day) && styles.activeDayText,
                  ]}
                >
                  {day}
                </Text>
                {zone.days.includes(day) && (
                  <View style={styles.zoneInfo}>
                    <View style={styles.radiusZoneInfo}>
                      <Text style={styles.zoneRadius}>{zone.radius}km</Text>
                    </View>
                    <Text style={styles.activeLabel}>Active:</Text>
                    <Text style={styles.timeLabel}>
                      {formatTime(zone.start_time)} -{" "}
                      {formatTime(zone.end_time)}
                    </Text>
                    {/* <Text style={styles.activeTime}>
                      Active: {zone.start_time} - {zone.end_time}
                    </Text> */}
                  </View>
                )}
              </View>
            ))}
          </View>

          {/* Map */}
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: zone.origin_latitude,
              longitude: zone.origin_longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{
                latitude: zone.origin_latitude,
                longitude: zone.origin_longitude,
              }}
            />
            <Circle
              center={{
                latitude: zone.origin_latitude,
                longitude: zone.origin_longitude,
              }}
              radius={zone.radius * 1000} // Convert from km to meters
              strokeColor="red"
              fillColor="rgba(255,0,0,0.2)"
            />
          </MapView>
        </View>
      </ScrollView>

      {/* NavBar */}
      <NavBar style={styles.navBar} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#FAF9F6",
  },
  loadingText: {
    flex: 1,
    textAlign: "center",
    marginTop: 100,
    fontSize: 18,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },
  contentContainer: {
    padding: 20,
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  daysContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  dayButton: {
    flex: 1,
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    backgroundColor: "#EEE",
    marginHorizontal: 2,
  },
  activeDay: {
    backgroundColor: "#2E466E",
  },
  dayText: {
    fontSize: 12,
    color: "black",
    fontWeight: "bold",
  },
  activeDayText: {
    color: "white",
  },
  radiusZoneInfo: {
    backgroundColor: "white",
    display: "flex",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 100,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    aspectRatio: 1,
  },
  zoneInfo: {
    marginTop: 5,
    alignItems: "center",
  },
  zoneRadius: {
    fontSize: 9,
    color: "black",
  },
  activeTime: {
    fontSize: 12,
    color: "white",
  },
  activeLabel: {
    fontSize: 12,
    color: "white",
    textAlign: "center",
  },
  timeLabel: {
    fontSize: 10,
    color: "white",
    textAlign: "center",
  },
  map: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginTop: 20,
  },
});
