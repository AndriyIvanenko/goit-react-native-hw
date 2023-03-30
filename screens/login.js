import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  Pressable,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../redux/auth/authOperations";
import { isUserLoggedIn } from "../redux/auth/authSelectors";

import { Button } from "../components/Button";
import { EmailInput } from "../components/EmailInput";
import { PasswordInput } from "../components/PasswordInput";

import { Variables } from "../variables";
const colors = Variables.COLORS;

const Login = ({ navigation }) => {
  const initCredentials = { email: "", password: "" };
  const [credentials, setCredentials] = useState(initCredentials);

  const isLoggedIn = useSelector(isUserLoggedIn);
  useEffect(() => {
    if (isLoggedIn) navigation.navigate("HomePage");
  }, [isLoggedIn]);

  const getEmail = (value) => {
    setCredentials((prevState) => ({ ...prevState, email: value }));
  };

  const getPassword = (value) =>
    setCredentials((prevState) => ({ ...prevState, password: value }));

  const dispatch = useDispatch();
  const onLoginClick = async () => {
    if (credentials.email && credentials.password) {
      dispatch(signIn(credentials));
      setCredentials(initCredentials);
    }
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
            <EmailInput
              placeholder="E-mail"
              value={credentials.email}
              onChangeText={getEmail}
              position={{
                marginBottom: 16,
              }}
            />

            <PasswordInput
              placeholder="Password"
              value={credentials.password}
              onChangeText={getPassword}
              position={{
                marginBottom: 43,
              }}
            />

            <Button name="Login" onPress={onLoginClick} onFocus={isCredantialsReady} />
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
    backgroundColor: colors.white,
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
  validation: {
    position: "absolute",
    left: 16,
    bottom: 18,
    fontStyle: "italic",
    color: "red",
  },
});

export default Login;
