import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Pressable,
  ImageBackground,
} from "react-native";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Avatar } from "../components/Avatar";

const Registration = ({ navigation }) => {
  const initCredentials = { login: "", email: "", password: "" };
  const [credentials, setCredentials] = useState(initCredentials);

  const getLogin = (value) =>
    setCredentials((prevState) => ({ ...prevState, login: value }));

  const getEmail = (value) =>
    setCredentials((prevState) => ({ ...prevState, email: value }));

  const getPassword = (value) =>
    setCredentials((prevState) => ({ ...prevState, password: value }));

  const onRegister = () => {
    Alert.alert(
      "credentials:",
      `${credentials.login} + ${credentials.email} + ${credentials.password}`
    );
    setCredentials(initCredentials);
    console.log(credentials);
  };

  const isCredantialsReady =
    credentials.login && credentials.email && credentials.password;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground
        source={require("../assets/background.jpg")}
        resizeMode="cover"
        style={styles.background}
      >
        <View style={styles.container}>
          <Avatar />
          <Text style={styles.title}>Registration</Text>

          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={{ marginBottom: 16 }}
          >
            <Input
              placeholder="Login"
              value={credentials.login}
              onChangeText={getLogin}
            />
            <View style={{ height: 16 }}></View>
            <Input
              placeholder="E-mail"
              value={credentials.email}
              onChangeText={getEmail}
            />
            <View style={{ height: 16 }}></View>
            <Input
              placeholder="Password"
              value={credentials.password}
              onChangeText={getPassword}
            />
            <View style={{ height: 43 }}></View>
            <Button
              name="Register"
              onPress={onRegister}
              isFocused={isCredantialsReady}
            />
          </KeyboardAvoidingView>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text style={styles.text}>Allready have an accoutn? </Text>
            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text style={styles.login}>Login</Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    paddingTop: 92,
  },
  avatar: {
    position: "absolute",
    top: -60,
    alignSelf: "center",
  },
  title: {
    marginBottom: 33,
    color: "#000",
    textAlign: "center",
    fontSize: 30,
    lineHeight: 35,
    fontWeight: "500",
  },
  text: {
    textAlign: "center",
    marginBottom: 78,
  },
  login: {
    color: "#00f",
    textDecorationLine: "underline",
  },
  background: {
    flex: 1,
    justifyContent: "flex-end",
  },
});

export default Registration;