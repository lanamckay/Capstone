import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "../components/NavBar";

export default function ActivityScreen({ navigation }) {
  const [breachEvents, setBreachEvents] = useState([]);

  useEffect(() => {
    fetch("https://nufoyigs2l.execute-api.us-east-2.amazonaws.com/breach-events")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data); // Debugging log
        if (data.breach_events && Array.isArray(data.breach_events)) {
          setBreachEvents(data.breach_events);
        } else {
          console.error("Unexpected API response format:", data);
        }
      })
      .catch((error) => console.error("Error fetching breach events:", error));
  }, []);

  const renderItem = ({ item }) => {
    const eventType = item.event_type ? item.event_type.trim().toUpperCase() : "UNKNOWN";
    console.log("Received event type:", eventType); // Debugging log

    let eventMessage;
    if (eventType === "GEOFENCE_BREACHED") {
      eventMessage = (
        <>
          • <Text style={styles.redText}>Bob</Text> left <Text style={styles.redText}>Geofence</Text> at {item.timestamp}
        </>
      );
    } else if (eventType === "FALL_DETECTED") {
      eventMessage = (
        <>
          • <Text style={styles.redText}>Bob</Text> had a <Text style={styles.redText}>Fall Detected</Text> at {item.timestamp}
        </>
      );
    } else {
      eventMessage = <>• <Text style={styles.redText}>Unknown Event</Text> at {item.timestamp}</>;
    }

    return <View style={styles.alertContainer}><Text style={styles.alertText}>{eventMessage}</Text></View>;
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.content}>
        <Text style={styles.header}>Activity</Text>
        {breachEvents.length === 0 ? (
          <Text style={styles.noEventsText}>No events recorded</Text>
        ) : (
          <FlatList
            data={breachEvents}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            style={styles.flatList}
          />
        )}
        {/* Add extra spacing below the list to make sure the button is not hidden */}
        <View style={styles.spacer}></View>
        <View style={styles.liveLocationContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
            <Text style={styles.liveLocationText}>Live Location</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.navContainer}>
        <NavBar />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: { flex: 1, backgroundColor: "white" },
  content: { flex: 1, backgroundColor: "white", padding: 20 },
  header: { fontSize: 18, fontWeight: "bold", color: "green", marginBottom: 10 },
  alertContainer: { padding: 10, borderBottomWidth: 1, borderBottomColor: "#ccc", marginTop: 10 },
  alertText: { color: "#721c24" },
  redText: { color: "red", fontWeight: "bold" },
  navContainer: { position: "absolute", bottom: 0, width: "100%" },
  liveLocationContainer: { 
    alignItems: "center", 
    marginTop: 20, 
    padding: 10, 
    backgroundColor: "white", 
    marginBottom: 40 // Ensure there's space at the bottom of the screen
  },
  liveLocationText: { color: "blue", textDecorationLine: "underline", fontSize: 16 },
  noEventsText: { textAlign: "center", fontSize: 16, color: "gray", marginTop: 20 },
  spacer: {
    height: 60, // This adds extra space to ensure the button doesn't get cut off
  },
  flatList: {
    flex: 1, // Allow FlatList to take all available space
  },
});
