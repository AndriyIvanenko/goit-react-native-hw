import React, { useState, useEffect } from "react";
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

import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../redux/auth/authOperations";
import { isUserLoggedIn } from "../redux/auth/authSelectors";

import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Avatar } from "../components/Avatar";

import { Variables } from "../variables";
const colors = Variables.COLORS;
const context = "Registration";

const Registration = ({ navigation, route }) => {
  const initCredentials = { email: "", password: "", name: "", avatarURL: "" };
  const [credentials, setCredentials] = useState(initCredentials);

  const isLoggedIn = useSelector(isUserLoggedIn);
  useEffect(() => {
    if (isLoggedIn) navigation.navigate("HomePage");
  }, [isLoggedIn]);

  const avatarUri = route.params && route.params.uri ? route.params.uri : "";

  const getLogin = (value) =>
    setCredentials((prevState) => ({ ...prevState, name: value }));

  const getEmail = (value) =>
    setCredentials((prevState) => ({ ...prevState, email: value }));

  const getPassword = (value) =>
    setCredentials((prevState) => ({ ...prevState, password: value }));

  const onAvatarBtnPress = () => {
    if (credentials.avatarURL) {
      setCredentials((prevState) => ({ ...prevState, avatarURL: "" }));
    } else {
      navigation.navigate("Camera", { context });
    }
  };

  const dispatch = useDispatch();
  const onRegisterClick = () => {
    if (credentials.name && credentials.email && credentials.password) {
      dispatch(signUp(credentials, avatarUri));
      setCredentials(initCredentials);
    }
  };

  const isCredantialsReady =
    credentials.name && credentials.email && credentials.password;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground
        source={require("../assets/background.jpg")}
        resizeMode="cover"
        style={styles.background}
      >
        <View style={styles.container}>
          <Avatar
            avatarUri={avatarUri}
            position={{
              position: "absolute",
              top: -60,
              alignSelf: "center",
            }}
            onBtnPress={onAvatarBtnPress}
          />
          <Text style={styles.title}>Registration</Text>

          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={{ marginBottom: 6 }}
          >
            <Input
              placeholder="Login"
              value={credentials.name}
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
              onPress={onRegisterClick}
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
