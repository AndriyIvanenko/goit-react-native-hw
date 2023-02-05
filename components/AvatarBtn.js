import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Variables } from "../variables";

const colors = Variables.COLORS;

export const AvatarBtn = ({ onPress, type }) => {
  const style = type === "add" ? styles.add : styles.remove;

  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Feather name="plus-circle" size={24} color={colors.accent} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  add: {
    position: "absolute",
    bottom: 14,
    right: -10,
    backgroundColor: colors.white,
    borderRadius: 12,
  },
  remove: {
    position: "absolute",
    bottom: 14,
    right: -10,
    backgroundColor: colors.white,
    borderRadius: 12,
    transform: [{ rotateZ: "45deg" }],
  },
});
