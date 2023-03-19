import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

import { Variables } from "../variables";
const colors = Variables.COLORS;

export const Button = ({ name, onPress, onFocus }) => {
  const btnColor = onFocus ? colors.accent : colors.background;
  const btnTextColor = onFocus ? colors.white : colors.second;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{ backgroundColor: btnColor, ...styles.btn }}
      onPress={onPress}
    >
      <Text style={{ color: btnTextColor, ...styles.btnText }}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    borderRadius: 100,
    height: 51,
    justifyContent: "center",
  },
  btnText: {
    textAlign: "center",
    fontSize: 16,
  },
});
