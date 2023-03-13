import React from "react";
import { TouchableOpacity, StyleSheet, View, Image } from "react-native";
import { Feather } from "@expo/vector-icons";

import { Variables } from "../variables";
const colors = Variables.COLORS;

export const Avatar = ({ position, onBtnPress, avatarUri }) => {
  const handleAvatar = () => {
    onBtnPress();
  };

  const btnRotation = avatarUri ? "46deg" : "0deg";
  const btnColor = avatarUri ? colors.second : colors.accent;

  return (
    <View style={{ ...position, ...styles.avatar }}>
      {avatarUri && <Image source={{ uri: avatarUri }} style={styles.image} />}

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
    height: 120,
    borderRadius: 16,
  },
});
