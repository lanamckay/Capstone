import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotificationsPermissionScreen({ navigation }) {
  const requestNotificationsPermission = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status === "granted") {
      navigation.goBack();
    } else {
      alert("Notification permission is required to receive alerts.");
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>

        <Text style={styles.header}>Allow Notifications Permission</Text>
        <Text style={styles.description}>
          Allow notifications so we can let you know if your loved one leaves.
        </Text>
        <Text style={styles.subDescription}>
          <Text style={{ fontWeight: "bold" }}>
            We will not send you marketing messages with this permission.
          </Text>
        </Text>

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
    marginVertical: 10,
  },
  subDescription: {
    textAlign: "center",
    marginBottom: 30,
  },
  imageContainer: {
    position: "relative",
    alignItems: "center",
    marginVertical: 20,
  },
  image: {
    width: 250,
    height: 150,
    resizeMode: "contain",
  },
  iconOverlay: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#6BBE6C",
    borderRadius: 20,
    padding: 5,
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
  footerText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 12,
    color: "gray",
  },
});
