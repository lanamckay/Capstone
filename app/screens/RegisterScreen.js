import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";

import Background from "../components/Background";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import { theme } from "../core/theme";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import { nameValidator } from "../helpers/nameValidator";
import { phoneNumberValidator } from "../helpers/phoneNumberValidator";
import { homeAddressValidator } from "../helpers/homeAddressValidator";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [phoneNumber, setPhoneNumber] = useState({ value: "", error: "" });
  const [homeAddress, setHomeAddress] = useState({ value: "", error: "" });

  const onSignUpPressed = () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    const phoneNumberError = phoneNumberValidator(phoneNumber.value);
    const homeAddressError = homeAddressValidator(homeAddress.value);
    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      setPhoneNumber({ ...phoneNumber, error: phoneNumberError });
      setHomeAddress({ ...homeAddress, error: homeAddressError})
      return;
    }
    navigation.reset({
      index: 0,
      routes: [{ name: "LoginScreen" }],
    });
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Header>Create an account</Header>
      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: "" })}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <TextInput
      label="Phone Number"
      returnKeyType="next"
      value={phoneNumber.value}
      onChangeText={(text) => setPhoneNumber({ value: text, error: "" })}
      error={!!phoneNumber.error}
      errorText={phoneNumber.error}
      keyboardType="phone-pad"
      />
      <TextInput
      label="Home Address"
      returnKeyType="done"
      value={homeAddress.value}
      onChangeText={(text) => setHomeAddress({ value: text, error: "" })}
      error={!!homeAddress.error}
      errorText={homeAddress.error}
      />
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Next
      </Button>
      <View style={styles.row}>
        <Text>Already have an account?</Text>
      </View>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => navigation.replace("LoginScreen")}>
          <Text style={styles.link}>Log in</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});
