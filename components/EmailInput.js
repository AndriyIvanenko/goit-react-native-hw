import React, { useEffect } from "react";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import isEmail from "validator/lib/isEmail";

import { Variables } from "../variables";
const colors = Variables.COLORS;

export const EmailInput = ({ placeholder, value, onChangeText, position }) => {
  const [isOnFocus, setIsOnFocus] = useState(false);
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);

  // let re = /\S+@\S+\.\S+/;
  // let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  useEffect(() => {
    if (!value) {
      setIsEmailInvalid(false);
      return;
    }
    setIsEmailInvalid(!isEmail(value));
    // re.test(value) || regex.test(value)
    //   ? setIsEmailInvalid(false)
    //   : setIsEmailInvalid(true);
  }, [value]);

  const onFocus = () => setIsOnFocus(true);
  const onBlur = () => setIsOnFocus(false);

  const inputBordeColor = isOnFocus ? colors.accent : colors.border;
  const inputBackgroungColor = isOnFocus ? colors.white : colors.background;

  return (
    <View>
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
      {isEmailInvalid ? (
        <Text style={styles.validation}>E-mail is not valid</Text>
      ) : (
        <Text style={styles.validation}></Text>
      )}
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
  validation: {
    position: "absolute",
    left: 16,
    bottom: 18,
    fontStyle: "italic",
    color: "red",
  },
});
