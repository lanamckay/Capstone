import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "../components/NavBar";

export default function HomeScreen({ navigation, route }) {
  const [devices, setDevices] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (route.params?.careZoneId) {
      setDevices([{ id: route.params.careZoneId, name: "Lana" }]);
    }
    if (route.params?.selectedImage) {
      setSelectedImage(route.params.selectedImage);
    }
  }, [route.params?.careZoneId, route.params?.selectedImage]);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>Devices ( {devices.length} )</Text>

        {devices.length > 0 ? (
          devices.map((device) => (
            <View key={device.id} style={styles.card}>
              <Text style={styles.cardTitle}>{device.name}</Text>
              <Text style={styles.cardText}>⚬ No Zones</Text>

              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: 43.4723,
                  longitude: -80.5256,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
              >
                <Marker
                  coordinate={{ latitude: 43.4723, longitude: -80.5256 }}
                  title="Lana"
                >
                  {selectedImage && <Image source={{ uri: selectedImage }} style={styles.markerImage} />}
                </Marker>
              </MapView>
            </View>
          ))
        ) : (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>No Devices</Text>
            <Text style={styles.cardText}>
              You currently have no devices set up. Click Add New Device Below to get started!
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("LocationPermissionScreen")}
            >
              <Ionicons name="add" size={16} color="white" />
              <Text style={styles.buttonText}>Add New Device</Text>
            </TouchableOpacity>
          </View>
        )}
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
    marginTop: 30,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardText: {
    textAlign: "left",
    marginVertical: 5,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E2A5B",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: "flex-start",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    marginLeft: 8,
  },
  map: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  markerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "white",
  },
});
