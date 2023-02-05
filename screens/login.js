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
  ImageBackground,
  Pressable,
} from "react-native";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Variables } from "../variables";

const colors = Variables.COLORS;

const Login = ({ navigation }) => {
  const initCredentials = { email: "", password: "" };
  const [credentials, setCredentials] = useState(initCredentials);

  const getEmail = (value) =>
    setCredentials((prevState) => ({ ...prevState, email: value }));

  const getPassword = (value) =>
    setCredentials((prevState) => ({ ...prevState, password: value }));

  const onLogin = () => {
    Alert.alert(
      "credentials:",
      `${credentials.login} + ${credentials.email} + ${credentials.password}`
    );
    setCredentials(initCredentials);
    console.log(credentials);
  };

  const isCredantialsReady = credentials.email && credentials.password;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground
        source={require("../assets/background.jpg")}
        resizeMode="cover"
        style={styles.background}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Login</Text>

          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={{ marginBottom: 16 }}
          >
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
              onPress={onLogin}
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
            <Text style={styles.text}>Don't have an accoutn? </Text>
            <Pressable onPress={() => navigation.navigate("Registration")}>
              <Text style={styles.login}>Register</Text>
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
    paddingTop: 32,
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

export default Login;
