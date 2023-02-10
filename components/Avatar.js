import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, Alert, View, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Variables } from "../variables";
import { TouchableHighlight } from "react-native-gesture-handler";

const colors = Variables.COLORS;

export const Avatar = ({ avatarUri = "", position }) => {
  const handleAvatar = () => {
    Alert.alert("handle avatar");
  };

  const btnRotation = avatarUri ? "46deg" : "0deg";
  const btnColor = avatarUri ? colors.second : colors.accent;

  return (
    <View style={{ ...position, ...styles.avatar }}>
      <Image source={avatarUri} style={styles.image} />
      <TouchableOpacity
        style={{ ...styles.btn, transform: [{ rotateZ: btnRotation }] }}
        onPress={handleAvatar}
      >
        <Feather name="plus-circle" size={24} color={btnColor} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: colors.background,
  },
  btn: {
    position: "absolute",
    bottom: 14,
    right: -10,
    backgroundColor: colors.white,
    borderRadius: 12,
  },
  image: {
    width: 120,
    borderRadius: 16,
  },
});
