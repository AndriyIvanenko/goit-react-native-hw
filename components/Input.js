import React from "react";
import { useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { Variables } from "../variables";

const colors = Variables.COLORS;

export const Input = ({ placeholder, value, onChangeText, position }) => {
  const [isOnFocus, setIsOnFocus] = useState(false);

  const onFocus = () => setIsOnFocus(true);
  const onBlur = () => setIsOnFocus(false);

  const inputBordeColor = isOnFocus ? colors.accent : colors.border;
  const inputBackgroungColor = isOnFocus ? colors.white : colors.background;

  return (
    <TextInput
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
      style={{
        borderColor: inputBordeColor,
        backgroundColor: inputBackgroungColor,
        ...position,
        ...styles.input,
      }}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
    lineHeight: 19,
    padding: 16,
  },
});
