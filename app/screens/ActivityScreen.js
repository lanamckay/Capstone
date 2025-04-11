import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "../components/NavBar";

// Utility function to convert UTC to EST
const convertUTCtoEST = (utcTimestamp) => {
  // Parse the timestamp as UTC
  const date = new Date(utcTimestamp + 'Z'); // Adding 'Z' to indicate UTC time
  
  // Format options for EST
  const options = {
    timeZone: 'America/New_York',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };
  
  // Get the time in EST
  const timeString = date.toLocaleTimeString('en-US', options);
  
  // Get the date in EST
  const dateString = date.toLocaleDateString('en-US', {
    timeZone: 'America/New_York',
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  });
  
  return `${dateString} ${timeString}`;
};

export default function ActivityScreen({ navigation }) {
  const [breachEvents, setBreachEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = () => {
      fetch("https://nufoyigs2l.execute-api.us-east-2.amazonaws.com/breach-events")
        .then((response) => response.json())
        .then((data) => {
          console.log("Fetched data:", data);
          if (data.breach_events && Array.isArray(data.breach_events)) {
            setBreachEvents(data.breach_events);
          } else {
            console.error("Unexpected API response format:", data);
          }
        })
        .catch((error) => console.error("Error fetching breach events:", error));
    };

    // Initial fetch
    fetchEvents();

    // Fetch every 3 seconds
    const intervalId = setInterval(fetchEvents, 3000);

    // Clean up on unmount
    return () => clearInterval(intervalId);
  }, []);

  const renderItem = ({ item }) => {
    const eventType = item.event_type ? item.event_type.trim().toUpperCase() : "UNKNOWN";
    const estTime = convertUTCtoEST(item.timestamp);

    let eventMessage;
    if (eventType === "GEOFENCE_BREACHED") {
      eventMessage = (
        <>
          • <Text style={styles.redText}>Bob</Text> left <Text style={styles.redText}>Geofence</Text> at {estTime}
        </>
      );
    } else if (eventType === "GEOFENCE_REENTERED") {
      eventMessage = (
        <>
          • <Text style={styles.greenText}>Bob</Text> re-entered <Text style={styles.greenText}>Geofence</Text> at {estTime}
        </>
      );
    } else if (eventType === "FALL_DETECTED") {
      eventMessage = (
        <>
          • <Text style={styles.redText}>Bob</Text> had a <Text style={styles.redText}>Fall Detected</Text> at {estTime}
        </>
      );
    } else {
      eventMessage = <>• <Text style={styles.redText}>Unknown Event</Text> at {estTime}</>;
    }

    return <View style={styles.alertContainer}><Text style={styles.alertText}>{eventMessage}</Text></View>;
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.content}>
        <View style={styles.liveLocationContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
            <Text style={styles.liveLocationText}>Live Location</Text>
          </TouchableOpacity>
        </View>
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
  liveLocationContainer: { 
    alignItems: "center", 
    marginTop: 10, 
    marginBottom: 20, 
    padding: 10, 
    backgroundColor: "#f8f8f8", 
    borderRadius: 8,
  },
  liveLocationText: { color: "blue", textDecorationLine: "underline", fontSize: 20 },
  alertContainer: { padding: 10, borderBottomWidth: 1, borderBottomColor: "#ccc", marginTop: 10 },
  alertText: { color: "#721c24" },
  redText: { color: "red", fontWeight: "bold" },
  greenText: { color: "green", fontWeight: "bold" },
  navContainer: { position: "absolute", bottom: 0, width: "100%" },
  noEventsText: { textAlign: "center", fontSize: 16, color: "gray", marginTop: 20 },
  flatList: { flex: 1 },
});
