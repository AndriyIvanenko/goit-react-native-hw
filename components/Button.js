import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { Variables } from "../variables";

const colors = Variables.COLORS;

export const Button = ({ name, onPress, isFocused }) => {
  if (isFocused) {
    buttonStyle = styles.focusedButton;
    textStyle = styles.focusedText;
  } else {
    buttonStyle = styles.bluredButton;
    textStyle = styles.bluredText;
  }

  return (
    <TouchableOpacity activeOpacity={0.8} style={buttonStyle} onPress={onPress}>
      <Text style={textStyle}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bluredButton: {
    backgroundColor: colors.background,
    borderRadius: 100,
    height: 51,
    justifyContent: "center",
  },
  bluredText: {
    textAlign: "center",
    fontSize: 16,
    color: colors.second,
  },
  focusedButton: {
    backgroundColor: colors.accent,
    borderRadius: 100,
    height: 51,
    justifyContent: "center",
  },
  focusedText: {
    textAlign: "center",
    fontSize: 16,
    color: colors.white,
  },
});
