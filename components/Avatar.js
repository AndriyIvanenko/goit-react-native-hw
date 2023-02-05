import React, { useState } from "react";
import { StyleSheet, Alert, View } from "react-native";
import { Variables } from "../variables";
import { AvatarBtn } from "./AvatarBtn";

const colors = Variables.COLORS;

export const Avatar = () => {
  const [profilePhoto, setProfilePhoto] = useState(false);

  const handleAvatar = () => {
    Alert.alert("handle avatar");
    if (profilePhoto) {
      setProfilePhoto(false);
    } else {
      setProfilePhoto(true);
    }
  };
  const btnType = profilePhoto ? "remove" : "add";

  return (
    <View style={styles.avatar}>
      <AvatarBtn onPress={handleAvatar} type={btnType} />
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    position: "absolute",
    top: -60,
    alignSelf: "center",
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: colors.background,
  },
});
