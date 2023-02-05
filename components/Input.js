import React from "react";
import { useState } from "react";
import { StyleSheet, TextInput } from "react-native";

export const Input = ({ placeholder, onChangeText, value }) => {
  const [isOnFocus, setIsOnFocus] = useState(false);

  const onFocus = () => setIsOnFocus(true);
  const onBlur = () => setIsOnFocus(false);

  const inputStyle = isOnFocus ? styles.focusedInput : styles.bluredInput;

  return (
    <TextInput
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
      style={inputStyle}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
};

const styles = StyleSheet.create({
  bluredInput: {
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
    lineHeight: 19,
    padding: 16,
    // marginBottom: 16,
  },
  focusedInput: {
    borderColor: "#FF6C00",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
    lineHeight: 19,
    padding: 16,
    // marginBottom: 16,
  },
});
