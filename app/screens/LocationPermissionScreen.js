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
      <View style={styles.overlayContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>

        <Text style={styles.header}>Allow Location Permission</Text>
        <Text style={styles.description}>
          Select <Text style={{ fontWeight: "bold" }}>"Allow Location" </Text> 
          on your device to track your loved one and create zones.
        </Text>

        <View style={styles.imageContainer}>
        <Image source={require("../../assets/map.png")} style={styles.mapImage} />
          <View style={styles.locationIcon}>
            <Ionicons name="location" size={30} color="white" />
          </View>
        </View>

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
    backgroundColor: "#EAEAEA",
    justifyContent: "center",
    alignItems: "center",
  },
  overlayContainer: {
    backgroundColor: "white",
    width: "85%",
    padding: 20,
    borderRadius: 30,
    alignItems: "center",
    elevation: 5,
    minHeight: 650,
    maxHeight: 650,
    justifyContent: "space-between",
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 5,
  },
  description: {
    textAlign: "center",
    marginBottom: 20,
  },
  imageContainer: {
    marginVertical: 40,
    position: "relative",
  },
  mapImage: {
    width: 200,
    height: 150,
    borderRadius: 10,
  },
  allowButton: {
    backgroundColor: "#6BBE6C",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  allowButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerText: {
    textAlign: "center",
    fontSize: 12,
    color: "gray",
  },
});