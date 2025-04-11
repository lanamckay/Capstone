import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import Slider from "@react-native-community/slider";
import MapView, { Circle, Marker } from "react-native-maps";
import Background from "../components/Background";
import BackButton from "../components/BackButton";
import Header from "../components/Header";
import { theme } from "../core/theme";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const UW_LOCATION = {
  latitude: 43.4723,
  longitude: -80.5449,
  address: "200 University Ave W, Waterloo, ON N2L 3G5"
};

export default function CreateZone({ navigation }) {
  const [zoneName, setZoneName] = useState("1 km Neighbourhood");
  const [radius, setRadius] = useState(1000);
  const [selectedDays, setSelectedDays] = useState([]);
  const [allDay, setAllDay] = useState(false);
  const [coordinates, setCoordinates] = useState({
    latitude: 43.4715,
    longitude: -80.5449,
  });
  const [region, setRegion] = useState({
    latitude: 43.4715,
    longitude: -80.5449,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });
  const searchBarRef = React.useRef();
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const [timeStart, setTimeStart] = useState(() => {
    const t = new Date();
    t.setHours(8, 0, 0, 0);
    return t;
  });
  const [timeEnd, setTimeEnd] = useState(() => {
    const t = new Date();
    t.setHours(19, 0, 0, 0);
    return t;
  });
  const [address, setAddress] = useState("");

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    // Set coordinates to UW location
    setCoordinates({
      latitude: UW_LOCATION.latitude,
      longitude: UW_LOCATION.longitude,
    });

    // Update the region to center on UW
    setRegion({
      latitude: UW_LOCATION.latitude,
      longitude: UW_LOCATION.longitude,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    });

    // Update the search bar text
    if (searchBarRef.current) {
      searchBarRef.current.setAddressText(UW_LOCATION.address);
    }
  };

  const handleMarkerDragEnd = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setCoordinates({ latitude, longitude });
  };

  const handleAddressSelect = (data, details) => {
    const { lat, lng } = details.geometry.location;
    setCoordinates({ latitude: lat, longitude: lng });
    setRegion({ latitude: lat, longitude: lng, latitudeDelta: 0.02, longitudeDelta: 0.02 });
  };

  const handleAddZone = async () => {
    const formattedStartTime = allDay ? "00:01:00" : timeStart.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    const formattedEndTime = allDay ? "23:59:00" : timeEnd.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

    const newZone = {
      user_id: 1,
      name: zoneName,
      origin_latitude: coordinates.latitude,
      origin_longitude: coordinates.longitude,
      radius: radius / 1000,
      days: selectedDays,
      start_time: formattedStartTime,
      end_time: formattedEndTime,
    };

    try {
      const response = await fetch("https://tg9ugz35md.execute-api.us-east-2.amazonaws.com/add-geofence2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newZone),
      });

      const result = await response.json();
      if (response.status === 201) {
        Alert.alert("Success", "Zone added successfully!");
        navigation.goBack();
      } else {
        console.error("Error:", result.error);
        alert(`Failed to add zone: ${result.error}`);
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("An error occurred while adding the zone.");
    }
  };

  const toggleDay = (day) => {
    setSelectedDays((prev) => prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]);
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <View style={styles.container}>
        <View style={styles.searchSection}>
          <Text style={styles.header}>Create Zone</Text>
          <Text style={styles.label}>Name your zone</Text>
          <Text style={styles.subText}>e.g. 1 km Neighbourhood</Text>
          <TextInput style={styles.input} value={zoneName} onChangeText={setZoneName} />
          <Text style={styles.label}>Location</Text>
          <View style={styles.searchContainer}>
            <GooglePlacesAutocomplete
              ref={searchBarRef}
              placeholder="Search address"
              onPress={handleAddressSelect}
              query={{ key: 'AIzaSyBmTgrQsArW9zfyYRgRVMwX-8RLkQ4KV8o', language: 'en' }}
              styles={{
                container: { flex: 0 },
                listView: { 
                  backgroundColor: 'white',
                  position: 'absolute',
                  top: 45,
                  left: 0,
                  right: 0,
                  zIndex: 1001,
                  elevation: 5,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                },
                textInput: {
                  height: 38,
                  fontSize: 16,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 5,
                  paddingHorizontal: 10,
                  backgroundColor: 'white',
                },
              }}
              enablePoweredByContainer={false}
              fetchDetails={true}
              minLength={2}
              debounce={200}
            />
          </View>
          <TouchableOpacity style={styles.currentLocationButton} onPress={getCurrentLocation}>
            <Text style={styles.currentLocationText}>Use Current Location</Text>
          </TouchableOpacity>
        </View>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={true}
        >
          <View style={styles.formContainer}>
            <View style={styles.mapContainer}>
              <MapView
                style={styles.map}
                region={region}
                onRegionChangeComplete={setRegion}
              >
                <Marker
                  coordinate={coordinates}
                  draggable
                  onDragEnd={handleMarkerDragEnd}
                />
                <Circle
                  center={coordinates}
                  radius={radius}
                  strokeColor="red"
                  fillColor="rgba(255,0,0,0.2)"
                />
              </MapView>
            </View>

            <View style={styles.sliderContainer}>
              <Text>Radius: {radius / 1000} km</Text>
              <Slider style={styles.slider} minimumValue={500} maximumValue={10000} step={500} value={radius} onValueChange={setRadius} />
            </View>

            <Text style={styles.label}>Schedule</Text>
            <View style={styles.daysContainer}>
              {days.map((day) => (
                <TouchableOpacity
                  key={day}
                  style={[
                    styles.dayButton,
                    selectedDays.includes(day) && styles.selectedDay,
                    { marginHorizontal: 2 }
                  ]}
                  onPress={() => toggleDay(day)}
                >
                  <Text style={[
                    styles.dayText,
                    selectedDays.includes(day) ? styles.selectedDayText : styles.unselectedDayText
                  ]}>
                    {day}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.allDayContainer}>
              <TouchableOpacity 
                style={[styles.checkbox, allDay ? styles.checkedCheckbox : styles.uncheckedCheckbox]} 
                onPress={() => setAllDay(!allDay)}
              />
              <Text style={styles.allDayText}>All Day</Text>
            </View>

            {!allDay && (
              <View style={styles.timeContainer}>
                <View style={styles.timePickerContainer}>
                  <Text style={styles.timeLabel}>Start Time</Text>
                  <DateTimePicker value={timeStart} mode="time" is24Hour={true} display="compact" onChange={(e, t) => t && setTimeStart(t)} />
                </View>
                <View style={styles.timePickerContainer}>
                  <Text style={styles.timeLabel}>End Time</Text>
                  <DateTimePicker value={timeEnd} mode="time" is24Hour={true} display="compact" onChange={(e, t) => t && setTimeEnd(t)} />
                </View>
              </View>
            )}

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.addButton} onPress={handleAddZone}>
                <Text style={styles.addText}>Add Zone</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  searchSection: {
    backgroundColor: 'white',
    padding: 15,
    paddingTop: 40,
    zIndex: 1000,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 15,
    paddingTop: 0,
  },
  formContainer: {
    width: '100%',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: 'white',
  },
  searchContainer: {
    height: 40,
    marginBottom: 10,
    zIndex: 1000,
  },
  currentLocationButton: {
    backgroundColor: '#3446eb',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    zIndex: 1,
  },
  currentLocationText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  mapContainer: {
    height: 250,
    borderRadius: 10,
    marginVertical: 15,
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  sliderContainer: {
    marginTop: 10,
    marginBottom: 15,
  },
  slider: {
    width: '100%',
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 20,
    paddingHorizontal: 0,
    width: '100%',
  },
  dayButton: {
    backgroundColor: '#E8E8E8',
    borderRadius: 12,
    height: 40,
    width: '13%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
  },
  selectedDay: {
    backgroundColor: '#3446eb',
  },
  dayText: {
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  selectedDayText: {
    color: 'white',
  },
  unselectedDayText: {
    color: '#666',
  },
  timeContainer: {
    marginTop: 15,
  },
  timePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  timeLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  allDayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#3446eb',
    marginRight: 10,
  },
  checkedCheckbox: {
    backgroundColor: '#3446eb',
  },
  uncheckedCheckbox: {
    backgroundColor: 'white',
  },
  allDayText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#3446eb',
    marginRight: 10,
  },
  cancelText: {
    color: '#3446eb',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  addButton: {
    flex: 1,
    backgroundColor: '#3446eb',
    padding: 15,
    borderRadius: 5,
  },
  addText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
