import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LocationPermissionScreen({ navigation }) {
    const requestLocationPermission = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === "granted") {
          navigation.navigate("NotificationsPermissionScreen");
        } else {
          alert("Location permission is required to add a device.");
        }
      };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>

        <Text style={styles.header}>Allow Location Permission To Protect Your Loved One</Text>
        <Text style={styles.description}>
          Select <Text style={{ fontWeight: "bold" }}>"Allow While Using App"</Text> on the next screen
          in order to track your loved one and create zones.
        </Text>

        <TouchableOpacity style={styles.allowButton} onPress={requestLocationPermission}>
          <Text style={styles.allowButtonText}>Allow Location</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 40,
  },
  description: {
    textAlign: "center",
    marginVertical: 30,
  },
  allowButton: {
    backgroundColor: "#6BBE6C",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    top: 40,
  },
  allowButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
