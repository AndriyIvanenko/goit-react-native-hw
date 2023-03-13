import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../redux/auth/authOperations";
import { getUser } from "../redux/auth/authSelectors";

import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from "react-native";
import { Avatar } from "../components/Avatar";
import PublicationList from "../components/PublicationList";
import { Variables } from "../variables";

const context = "profile";
const colors = Variables.COLORS;

const Profile = ({ navigation }) => {
  const currentUser = useSelector(getUser);

  const dispatch = useDispatch();
  const onLogOutClick = () => {
    dispatch(signOut());
    navigation.navigate("Login");
  };

  return (
    <ImageBackground
      source={require("../assets/background.jpg")}
      resizeMode="cover"
      style={styles.background}
    >
      <View style={styles.container}>
        <TouchableOpacity onPress={onLogOutClick}>
          <Feather name="log-out" size={24} style={styles.logoutBtn} />
        </TouchableOpacity>

        <Avatar
          position={{
            position: "absolute",
            top: -60,
            alignSelf: "center",
          }}
          avatarUri={currentUser.avatarURL}
        />

        <Text style={styles.title}>{currentUser.userName}</Text>
        <PublicationList navigation={navigation} context={context} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    paddingBottom: 60,
    paddingTop: 92,
  },
  background: {
    flex: 1,
    justifyContent: "flex-end",
  },
  logoutBtn: {
    position: "absolute",
    top: -68,
    right: 0,
    color: colors.second,
  },
  title: {
    textAlign: "center",
    marginBottom: 33,
    fontSize: 30,
    fontWeight: "500",
  },
  image: {
    width: "100%",
    borderRadius: 8,
    marginBottom: 8,
  },
  description: {
    marginBottom: 11,
    fontSize: 16,
    fontWeight: "500",
  },
  addInfo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  addInfoItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  comments: {
    fontSize: 16,
    color: "grey",
    marginLeft: 8,
  },
  location: {
    fontSize: 16,
    textDecorationLine: "underline",
    paddingRight: 8,
    marginLeft: 8,
  },
});

export default Profile;
