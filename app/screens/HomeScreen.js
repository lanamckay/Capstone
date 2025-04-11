import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "../components/NavBar";
import Button from "../components/Button";

const mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8ec3b9"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1a3646"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#64779e"
      }
    ]
  },
  {
    "featureType": "administrative.province",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#334e87"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6f9ba5"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3C7680"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#304a7d"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2c6675"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#255763"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#b0d5ce"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3a4762"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#0e1626"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#4e6d70"
      }
    ]
  }
];

export default function HomeScreen({ navigation, route }) {
  const [devices, setDevices] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [zones, setZones] = useState([]);
  const [region, setRegion] = useState({
    latitude: 43.4730,
    longitude: -80.5395,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  useEffect(() => {
    if (route.params?.careZoneId) {
      setDevices([{ id: route.params.careZoneId, name: "Bob" }]);
    }
    if (route.params?.selectedImage) {
      setSelectedImage(route.params.selectedImage);
    }

    const unsubscribe = navigation.addListener("focus", () => {
      fetchZones();
    });

    return unsubscribe;
  }, [navigation, route.params?.careZoneId, route.params?.selectedImage]);

  const fetchZones = async () => {
    try {
      const response = await fetch(
        "https://t0acfkle3f.execute-api.us-east-2.amazonaws.com/dev?user_id=1"
      );
      const data = await response.json();
      setZones(data);
    } catch (error) {
      console.error("Failed to fetch zones:", error);
    }
  };

  const zoomIn = () => {
    setRegion((prevRegion) => ({
      ...prevRegion,
      latitudeDelta: Math.max(prevRegion.latitudeDelta / 2, 0.002),
      longitudeDelta: Math.max(prevRegion.longitudeDelta / 2, 0.002),
    }));
  };

  const zoomOut = () => {
    setRegion((prevRegion) => ({
      ...prevRegion,
      latitudeDelta: prevRegion.latitudeDelta * 2,
      longitudeDelta: prevRegion.longitudeDelta * 2,
    }));
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>Devices ( {devices.length} )</Text>
        {devices.length > 0 ? (
          devices.map((device) => (
            <TouchableOpacity
              key={device.id}
              style={styles.card}
              onPress={() => navigation.navigate("UserZones")}
            >
              <Text style={styles.cardTitle}>{device.name}</Text>
              <Text style={styles.cardText}>
                {zones.length > 0 ? `${zones.length} Zones` : "No Zones"}
              </Text>
              {zones.length === 0 && (
                <Button
                  style={{ backgroundColor: "#2E466E", paddingVertical: 0 }}
                  mode="contained"
                  onPress={() => navigation.navigate("UserZones")}
                >
                  + Create Zone
                </Button>
              )}
              <View style={styles.mapContainer}>
                <MapView 
                  style={styles.map} 
                  region={region}
                  customMapStyle={mapStyle}
                >
                  <Marker coordinate={{ latitude: 43.4730, longitude: -80.5395 }} title="Bob">
                    <Image source={require('../../assets/man.jpg')} style={styles.markerImage} />
                  </Marker>
                </MapView>
                <View style={styles.zoomControls}>
                  <TouchableOpacity style={styles.zoomButton} onPress={zoomIn}>
                    <Ionicons name="add" size={24} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.zoomButton} onPress={zoomOut}>
                    <Ionicons name="remove" size={24} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
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
  safeContainer: { flex: 1, backgroundColor: "#FAF9F6" },
  container: { flex: 1, padding: 20, backgroundColor: "#FAF9F6" },
  header: { fontSize: 24, fontWeight: "bold", color: "black", marginTop: 20 },
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
  cardTitle: { fontSize: 18, fontWeight: "bold" },
  cardText: { textAlign: "left", marginVertical: 5 },
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
  buttonText: { color: "white", fontSize: 14, marginLeft: 8 },
  mapContainer: { position: "relative" },
  map: { width: "100%", height: 420, borderRadius: 10, marginTop: 10 },
  markerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "white",
  },
  zoomControls: { position: "absolute", top: 10, right: 10, flexDirection: "column" },
  zoomButton: {
    backgroundColor: "#2E466E",
    padding: 3,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
