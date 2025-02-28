import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "../components/NavBar";

export default function ActivityScreen() {
  const [breachEvents, setBreachEvents] = useState([]);

  useEffect(() => {
    fetch("https://nufoyigs2l.execute-api.us-east-2.amazonaws.com/breach-events")
      .then((response) => response.json())
      .then((data) => {
        if (data.breach_events) {
          setBreachEvents(data.breach_events);
        }
      })
      .catch((error) => console.error("Error fetching breach events:", error));
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.alertContainer}>
      <Text style={styles.alertText}>
        User {item.user_id} left geofence at {item.timestamp} and is located at 
        ({item.latitude}, {item.longitude}).
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.content}>
        <Text style={styles.header}>Activity</Text>
        <FlatList
          data={breachEvents}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      </View>
      <View style={styles.navContainer}>
        <NavBar />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
    marginBottom: 10,
  },
  alertContainer: {
    backgroundColor: "#f8d7da",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  alertText: {
    color: "#721c24",
  },
  navContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});
