import React from "react";

import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import NavBar from "../components/NavBar";

export default function ActivityScreen({ navigation }) {
  return (
    <Background>
      <Header>Activity Screen</Header>
      <Paragraph>test</Paragraph>
      <NavBar />
    </Background>

  );
}
