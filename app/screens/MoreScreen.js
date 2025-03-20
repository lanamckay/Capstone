import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "../components/NavBar";

export default function MoreScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedField, setSelectedField] = useState("");
  const [inputValue, setInputValue] = useState("");

  const openModal = (field) => {
    setSelectedField(field);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setInputValue("");
  };

  const saveChanges = () => {
    console.log(`${selectedField} updated to:`, inputValue);
    closeModal();
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.content}>
        <Text style={styles.header}>Account Setting</Text>

        <View style={styles.menu}>
          <MenuItem icon="card" text="Update Name" onPress={() => openModal("Name")} />
          <MenuItem icon="mail" text="Update Email" onPress={() => openModal("Email")} />
          <MenuItem icon="lock-closed" text="Update Password" onPress={() => openModal("Password")} />
          <MenuItem icon="call" text="Update Phone Number" onPress={() => openModal("Phone Number")} />
          <MenuItem icon="home" text="Update Home Address" onPress={() => openModal("Home Address")} />
          <MenuItem icon="log-out" text="Logout" onPress={() => navigation.reset({ index: 0, routes: [{ name: "StartScreen" }] })} />
        </View>
      </View>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Update {selectedField}</Text>
            <TextInput 
              style={styles.input} 
              placeholder={`Enter new ${selectedField}`} 
              value={inputValue} 
              onChangeText={setInputValue} 
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={closeModal} style={styles.cancelButton}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={saveChanges} style={styles.saveButton}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

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
  safeContainer: { flex: 1, backgroundColor: "white" },
  content: { flex: 1, backgroundColor: "white", padding: 20 },
  header: { fontSize: 18, fontWeight: "bold", color: "green", marginBottom: 10 },
  menu: { marginTop: 15, borderTopWidth: 0, borderColor: "#ddd" },
  menuItem: { flexDirection: "row", alignItems: "center", paddingVertical: 18, borderBottomWidth: 1, borderColor: "#ddd" },
  menuText: { fontSize: 16, marginLeft: 10 },
  navContainer: { position: "absolute", bottom: 0, width: "100%" },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" },
  modalContent: { width: "80%", padding: 20, backgroundColor: "white", borderRadius: 10, alignItems: "center" },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  input: { width: "100%", borderWidth: 1, borderColor: "gray", padding: 10, borderRadius: 5, marginBottom: 15 },
  buttonContainer: { flexDirection: "row", justifyContent: "space-between", width: "100%" },
  cancelButton: { flex: 1, padding: 10, backgroundColor: "gray", borderRadius: 5, alignItems: "center", marginRight: 5 },
  saveButton: { flex: 1, padding: 10, backgroundColor: "green", borderRadius: 5, alignItems: "center", marginLeft: 5 },
  buttonText: { color: "white", fontSize: 16 },
});
