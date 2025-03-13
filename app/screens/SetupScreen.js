import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SetupScreen({ navigation }) {
  const [showHelpCareZoneId, setShowHelpCareZoneId] = useState(false);
  const [showHelpNameCareZone, setShowHelpNameCareZone] = useState(false);
  const [careZoneId, setCareZoneId] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Setup Your CareZone</Text>
      <Text style={styles.subtitle}>Follow the steps below to complete your setup.</Text>
      
      <View style={styles.stepContainer}>
        <View style={styles.stepRow}>
          <View style={styles.stepIndicatorActive} />
          <Text style={styles.stepText}>Enter CareZone ID</Text>
          <TouchableOpacity onPress={() => setShowHelpCareZoneId(!showHelpCareZoneId)}>
            <Ionicons name="help-circle-outline" size={18} color="#6BBE6C" style={styles.helpIcon} />
          </TouchableOpacity>
        </View>
        {showHelpCareZoneId && <Text style={styles.helpText}>CareZone ID is found on the back of your device</Text>}
        <TextInput
          style={styles.input}
          placeholder="Enter CareZone ID"
          placeholderTextColor="#A9A9A9"
          onChangeText={(text) => setCareZoneId(text)}
          value={careZoneId}
        />
      </View>

      <View style={styles.stepContainer}>
        <View style={styles.stepRow}>
          <View style={styles.stepIndicatorActive} />
          <Text style={styles.stepText}>Name Your CareZone</Text>
          <TouchableOpacity onPress={() => setShowHelpNameCareZone(!showHelpNameCareZone)}>
            <Ionicons name="help-circle-outline" size={18} color="#6BBE6C" style={styles.helpIcon} />
          </TouchableOpacity>
        </View>
        {showHelpNameCareZone && <Text style={styles.helpText}>Name your CareZone after your loved one</Text>}
        <TextInput
          style={styles.input}
          placeholder="e.g. Bob"
          placeholderTextColor="#A9A9A9"
        />
      </View>

      {/* Next Button */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.navigate("HomeScreen", { careZoneId })}
      >
        <Text style={styles.nextButtonText}>Next</Text>
        <Ionicons name="arrow-forward" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "gray",
    marginBottom: 30,
  },
  stepContainer: {
    marginBottom: 20,
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  stepIndicatorActive: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: "#6BBE6C",
  },
  stepText: {
    fontSize: 16,
    fontWeight: "500",
  },
  helpIcon: {
    marginLeft: 5,
  },
  helpText: {
    fontSize: 12,
    color: "#6BBE6C",
    marginTop: 5,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#A9A9A9",
    paddingVertical: 5,
    fontSize: 14,
    color: "black",
    marginTop: 5,
  },
  nextButton: {
    backgroundColor: "#6BBE6C",
    paddingVertical: 15,
    borderRadius: 25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  nextButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
});
