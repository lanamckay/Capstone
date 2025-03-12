import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotificationsPermissionScreen({ navigation }) {
  const requestNotificationsPermission = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status === "granted") {
      navigation.navigate("SetupScreen");
    } else {
      alert("Notification permission is required to receive alerts.");
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.overlayContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>

        <Text style={styles.header}>Allow Notifications Permission</Text>
        <Text style={styles.description}>
        Select <Text style={{ fontWeight: "bold" }}>"Allow Notifications" </Text>on your device so we can let you know if your loved one leaves.
        </Text>

        <View style={styles.imageContainer}>
          <Image source={require("../../assets/women.jpg")} style={styles.mapImage} />
          <View style={styles.locationIcon}>
            <Ionicons name="notifications" size={30} color="white" />
          </View>
        </View>

        <TouchableOpacity style={styles.allowButton} onPress={requestNotificationsPermission}>
          <Text style={styles.allowButtonText}>Allow Notifications</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>You can’t skip this step. It’s too important!</Text>
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
