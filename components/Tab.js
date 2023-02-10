import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

export const Tab = ({ icon, onPress, color, bgrColor }) => {
  return (
    <TouchableOpacity
      style={{ ...styles.container, backgroundColor: bgrColor }}
      onPress={onPress}
    >
      {icon && <Feather name={icon} size={24} color={color} />}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 40,
    borderRadius: 20,
  },
});
