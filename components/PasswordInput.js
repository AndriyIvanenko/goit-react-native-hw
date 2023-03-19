import React from "react";
import { useState } from "react";
import { StyleSheet, TextInput, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Variables } from "../variables";
const colors = Variables.COLORS;

export const PasswordInput = ({ placeholder, value, onChangeText, position }) => {
  const [isOnFocus, setIsOnFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  const onFocus = () => setIsOnFocus(true);
  const onBlur = () => setIsOnFocus(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  const inputBordeColor = isOnFocus ? colors.accent : colors.border;
  const inputBackgroungColor = isOnFocus ? colors.white : colors.background;

  return (
    <View>
      <TextInput
        placeholder={placeholder}
        onChangeText={onChangeText}
        secureTextEntry={showPassword}
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
      <TouchableOpacity style={styles.eyeIcon} onPress={toggleShowPassword}>
        {showPassword ? (
          <Ionicons name="ios-eye-outline" size={24} color={colors.second} />
        ) : (
          <Ionicons name="ios-eye-off-outline" size={24} color={colors.second} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
    lineHeight: 19,
    padding: 16,
    paddingRight: 50,
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
    top: 18,
  },
});
