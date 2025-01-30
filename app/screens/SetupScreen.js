import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

export default function SetupScreen({ navigation }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.stepContainer}>
        <View style={styles.stepIndicator} />
        <Text style={styles.stepText}>Connect To Device</Text>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="bluetooth" size={16} color="white" />
          <Text style={styles.buttonText}>Connect</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.stepContainer}>
        <View style={styles.stepIndicator} />
        <Text style={styles.stepText}>Name Your CareZone</Text>
        <TextInput 
          style={styles.input} 
          placeholder="e.g. Bob or Janis" 
          placeholderTextColor="#A9A9A9"
        />
      </View>

      <View style={styles.stepContainer}>
        <View style={styles.stepIndicator} />
        <Text style={styles.stepText}>Upload Picture</Text>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Ionicons name="cloud-upload-outline" size={16} color="white" />
          <Text style={styles.buttonText}>Upload</Text>
        </TouchableOpacity>
        {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate("HomeScreen")}>
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
  stepContainer: {
    marginBottom: 30,
  },
  stepIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#6BBE6C",
    marginBottom: 5,
  },
  stepText: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E2A5B",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    marginLeft: 8,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#A9A9A9",
    paddingVertical: 5,
    fontSize: 14,
    color: "black",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginTop: 10,
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