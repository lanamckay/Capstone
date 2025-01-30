import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "../components/NavBar";

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>Devices</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>No Devices</Text>
          <Text style={styles.cardText}>
            You currently have no devices set up. Click Add New Device Below to get started!
          </Text>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("LocationPermissionScreen")}>
            <Ionicons name="add" size={16} color="white" />
            <Text style={styles.buttonText}>Add New Device</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    flex: 1,
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
    alignItems: "center",
    marginTop: 30,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardText: {
    textAlign: "center",
    marginVertical: 10,
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#2C3E50",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    marginLeft: 8,
  },
  navBar: {
    backgroundColor: "#E0E9D5",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingBottom: 10,
  },
});
