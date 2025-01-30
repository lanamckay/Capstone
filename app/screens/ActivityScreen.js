import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "../components/NavBar";

export default function ActivityScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.content}>
        <Text style={styles.header}>Activity</Text>
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
    marginTop: 20,
  },
  navContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});

