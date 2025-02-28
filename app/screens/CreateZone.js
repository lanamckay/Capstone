import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import Slider from "@react-native-community/slider";
import MapView, { Circle, Marker } from "react-native-maps";
import Background from "../components/Background";
import BackButton from "../components/BackButton";
import Header from "../components/Header";
import { theme } from "../core/theme";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function CreateZone({ navigation, route }) {
  const { refreshZones } = route.params;
  const [zoneName, setZoneName] = useState("5 km Neighbourhood");
  const [radius, setRadius] = useState(5000); // 5 km in meters
  const [selectedDays, setSelectedDays] = useState([]);
  const [timeStart, setTimeStart] = useState(new Date());
  const [timeEnd, setTimeEnd] = useState(new Date());
  const [allDay, setAllDay] = useState(true);
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const handleAddZone = async () => {
    const formattedStartTime = allDay
      ? "00:01:00"
      : timeStart.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });

    const formattedEndTime = allDay
      ? "23:59:00"
      : timeEnd.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });

    const newZone = {
      user_id: 1,
      name: zoneName,
      origin_latitude: 43.4715,
      origin_longitude: -80.5449,
      radius: radius / 1000,
      days: selectedDays,
      start_time: formattedStartTime,
      end_time: formattedEndTime,
    };

    try {
      const response = await fetch(
        "https://tg9ugz35md.execute-api.us-east-2.amazonaws.com/add-geofence2",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newZone),
        }
      );

      const result = await response.json();

      if (response.status === 201) {
        alert("Zone Added Successfully!");
        refreshZones();
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
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <ScrollView style={styles.container}>
        <View style={{ marginTop: 100 }}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 21,
              color: theme.colors.primary,
              fontWeight: "bold",
              paddingVertical: 12,
            }}
          >
            Create Zone
          </Text>
          {/* Zone Name Input */}
          <Text style={styles.label}>Name your zone</Text>
          <Text style={styles.subText}>e.g. 5 km Neighbourhood</Text>
          <TextInput
            style={styles.input}
            value={zoneName}
            onChangeText={setZoneName}
          />

          {/* Map Section */}
          <Text style={styles.label}>Name Type</Text>
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: 43.4715,
                longitude: -80.5449,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
              }}
            >
              <Marker coordinate={{ latitude: 43.4715, longitude: -80.5449 }} />
              <Circle
                center={{ latitude: 43.4715, longitude: -80.5449 }}
                radius={radius}
                strokeColor="red"
                fillColor="rgba(255,0,0,0.2)"
              />
            </MapView>
            <View style={styles.sliderContainer}>
              <Text>Radius: {radius / 1000} km</Text>
              <Slider
                style={styles.slider}
                minimumValue={500}
                maximumValue={10000}
                step={500}
                value={radius}
                onValueChange={setRadius}
              />
            </View>
          </View>

          {/* Schedule Selection */}
          <Text style={styles.label}>Schedule</Text>
          <View style={styles.daysContainer}>
            {days.map((day) => (
              <TouchableOpacity
                key={day}
                style={[
                  styles.dayButton,
                  selectedDays.includes(day) && styles.selectedDay,
                ]}
                onPress={() => toggleDay(day)}
              >
                <Text style={styles.dayText}>{day}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.allDayContainer}>
            <TouchableOpacity
              onPress={() => setAllDay((prev) => !prev)}
              style={styles.allDayCheckbox}
            >
              <View
                style={[
                  styles.checkbox,
                  allDay ? styles.checkedCheckbox : styles.uncheckedCheckbox,
                ]}
              />
              <Text style={styles.allDayText}>All Day</Text>
            </TouchableOpacity>
          </View>
          {!allDay && (
            <View style={styles.timeContainer}>
              <View style={styles.timePickerContainer}>
                <Text style={styles.timeLabel}>Start Time</Text>
                <DateTimePicker
                  value={timeStart}
                  mode="time"
                  is24Hour={true}
                  display="spinner"
                  onChange={(event, selectedTime) => {
                    if (selectedTime) {
                      setTimeStart(selectedTime);
                    }
                  }}
                />
              </View>

              <View style={styles.timePickerContainer}>
                <Text style={styles.timeLabel}>End Time</Text>
                <DateTimePicker
                  value={timeEnd}
                  mode="time"
                  is24Hour={true}
                  display="spinner"
                  onChange={(event, selectedTime) => {
                    if (selectedTime) {
                      setTimeEnd(selectedTime);
                    }
                  }}
                />
              </View>
            </View>
          )}
          {/* Time Selection */}

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addButton} onPress={handleAddZone}>
              <Text style={styles.addText}>Add Zone</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "80%",
    overflow: "hidden",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
  },
  subText: {
    fontSize: 12,
    color: "blue",
    marginBottom: 5,
  },
  input: {
    borderBottomWidth: 1,
    paddingVertical: 5,
    fontSize: 16,
  },
  mapContainer: {
    height: 250,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 50,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  sliderContainer: {
    alignItems: "center",
    paddingVertical: 10,
    width: "100%",
  },
  slider: {
    width: "90%",
  },
  daysContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  dayButton: {
    backgroundColor: "#DDD",
    padding: 10,
    borderRadius: 5,
  },
  selectedDay: {
    backgroundColor: "#3446eb",
  },
  dayText: {
    color: "white",
  },
  timeContainer: {
    justifyContent: "space-between",
    marginTop: 10,
    alignItems: "center",
  },
  timeInput: {
    borderBottomWidth: 1,
    paddingVertical: 5,
    fontSize: 16,
    width: 80,
    textAlign: "center",
  },
  timeText: {
    fontSize: 16,
    color: "blue",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 5,
  },
  cancelText: {
    color: "#000",
  },
  addButton: {
    flex: 1,
    backgroundColor: "#3446eb",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  addText: {
    color: "white",
  },
  timePickerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginVertical: 10,
  },

  timeLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  allDayContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  allDayCheckbox: {
    flexDirection: "row",
    alignItems: "center",
  },

  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 3,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#000",
  },

  checkedCheckbox: {
    backgroundColor: "#3446eb",
  },

  uncheckedCheckbox: {
    backgroundColor: "white",
  },

  allDayText: {
    fontSize: 16,
  },
});
