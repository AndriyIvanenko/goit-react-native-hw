import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Variables } from "../variables";

const colors = Variables.COLORS;

export const AvatarBtn = ({ onPress, type }) => {
  const btnRotation = type === "add" ? "0deg" : "45deg";

  return (
    <TouchableOpacity
      style={{ ...styles.btn, transform: [{ rotateZ: btnRotation }] }}
      onPress={onPress}
    >
      <Feather name="plus-circle" size={24} color={colors.accent} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    position: "absolute",
    bottom: 14,
    right: -10,
    backgroundColor: colors.white,
    borderRadius: 12,
  },
});
