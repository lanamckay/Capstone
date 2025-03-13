import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import NavBar from "../components/NavBar";

export default function ActivityScreen({ navigation }) {
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

  const deleteNotification = (index) => {
    setBreachEvents((prevEvents) => prevEvents.filter((_, i) => i !== index));
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.alertContainer}>
      <Text style={styles.alertText}>
        •{" "}
        <Text style={styles.redText}>Bob</Text> left{" "}
        <Text style={styles.redText}>Geofence</Text> at {item.timestamp}
      </Text>
    </View>
  );

  const handlePress = () => {
    // Navigating to HomeScreen
    navigation.navigate("HomeScreen");
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.content}>
        <Text style={styles.header}>Activity</Text>
        <FlatList
          data={breachEvents}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  <TouchableOpacity onPress={handlePress}>
    <Text style={{ color: "blue", textDecorationLine: "underline", fontSize: 18, marginTop: -120, }}>
      Live Location
    </Text>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginTop: 15,
  },
  alertText: {
    color: "#721c24",
    flex: 1,
  },
  redText: {
    color: "red",
  },
  navContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  liveLocationContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  liveLocationText: {
    color: "blue",
    textDecorationLine: "underline",
    fontSize: 16,
  },
});
