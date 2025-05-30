import 'react-native-get-random-values';
import React from "react";
import { Provider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { theme } from "./app/core/theme";
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  HomeScreen,
  ActivityScreen,
  MoreScreen,
  LocationPermissionScreen,
  NotificationsPermissionScreen,
  SetupScreen,
  CreateZone,
  UserZones,
  Zone,
} from "./app/screens";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="StartScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="ActivityScreen" component={ActivityScreen} />
          <Stack.Screen name="MoreScreen" component={MoreScreen} />
          <Stack.Screen
            name="LocationPermissionScreen"
            component={LocationPermissionScreen}
          />
          <Stack.Screen
            name="NotificationsPermissionScreen"
            component={NotificationsPermissionScreen}
          />
          <Stack.Screen name="SetupScreen" component={SetupScreen} />
          <Stack.Screen name="CreateZone" component={CreateZone} />
          <Stack.Screen name="UserZones" component={UserZones} />
          <Stack.Screen name="Zone" component={Zone} />

          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
