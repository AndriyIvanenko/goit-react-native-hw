import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  ImageBackground,
} from "react-native";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Avatar } from "../components/Avatar";

import { Variables } from "../variables";
import { color } from "react-native-reanimated";
const colors = Variables.COLORS;

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
    if (credentials.login && credentials.email && credentials.password) {
      console.log(credentials);
      setCredentials(initCredentials);
      navigation.navigate("HomePage");
    }
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
          <Avatar
            avatarUri=""
            position={{
              position: "absolute",
              top: -60,
              alignSelf: "center",
            }}
          />
          <Text style={styles.title}>Registration</Text>

          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={{ marginBottom: 6 }}
          >
            <Input
              placeholder="Login"
              value={credentials.login}
              onChangeText={getLogin}
              position={{
                marginBottom: 16,
              }}
            />
            <Input
              placeholder="E-mail"
              value={credentials.email}
              onChangeText={getEmail}
              position={{
                marginBottom: 16,
              }}
            />
            <Input
              placeholder="Password"
              value={credentials.password}
              onChangeText={getPassword}
              position={{
                marginBottom: 43,
              }}
            />
            <Button
              name="Register"
              onPress={onRegister}
              onFocus={isCredantialsReady}
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
    backgroundColor: colors.white,
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
    color: colors.main,
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
    color: colors.link,
    textDecorationLine: "underline",
  },
  background: {
    flex: 1,
    justifyContent: "flex-end",
  },
});

export default Registration;
