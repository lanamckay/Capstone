import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "../components/NavBar";

export default function MoreScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.content}>
        <Text style={styles.header}>Account Setting</Text>

        <View style={styles.menu}>
          <MenuItem icon="card" text="Update Name" />
          <MenuItem icon="mail" text="Update Email" />
          <MenuItem icon="lock-closed" text="Update Password" />
          <MenuItem icon="call" text="Update Phone Number" />
          <MenuItem icon="home" text="Update Home Address" />
          <MenuItem icon="log-out" text="Logout" onPress={() => navigation.reset({
            index: 0,
            routes: [{ name: "StartScreen" }],
          })} />
        </View>
      </View>

      <View style={styles.navContainer}>
        <NavBar />
      </View>
    </SafeAreaView>
  );
}

const MenuItem = ({ icon, text, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Ionicons name={icon} size={20} color="black" />
    <Text style={styles.menuText}>{text}</Text>
  </TouchableOpacity>
);

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
  menu: {
    marginTop: 15,
    borderTopWidth: 0,
    borderColor: "#ddd",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  menuText: {
    fontSize: 16,
    marginLeft: 10,
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    alignSelf: "center",
  },
  deleteText: {
    fontSize: 16,
    color: "black",
    marginLeft: 5,
  },
  navContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});

