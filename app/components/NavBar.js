import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

const NavBar = () => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")} style={styles.navItemContainer}>
        <Icon name="home" size={20} color={route.name === "HomeScreen" ? "#000" : "#000"} />
        <Text
          style={[
            styles.navItem,
            route.name === "HomeScreen" ? styles.activeNavItem : null,
          ]}
        >
          Home
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("ActivityScreen")} style={styles.navItemContainer}>
        <Icon name="notifications" size={20} color={route.name === "ActivityScreen" ? "#000" : "#000"} />
        <Text
          style={[
            styles.navItem,
            route.name === "ActivityScreen" ? styles.activeNavItem : null,
          ]}
        >
          Activity
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("MoreScreen")} style={styles.navItemContainer}>
        <Icon name="menu" size={20} color={route.name === "MoreScreen" ? "#000" : "#000"} />
        <Text
          style={[
            styles.navItem,
            route.name === "MoreScreen" ? styles.activeNavItem : null,
          ]}
        >
          More
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#86CA70",
    paddingVertical: 30,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  navItemContainer: {
    alignItems: "center",
  },
  navItem: {
    fontSize: 18,
    fontWeight: "normal",
    color: "black",
  },
  activeNavItem: {
    fontWeight: "bold",
  },
});

export default NavBar;