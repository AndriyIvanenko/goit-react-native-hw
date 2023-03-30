import React from "react";
import { ActivityIndicator, StyleSheet, View, Dimensions, Modal } from "react-native";
import { Variables } from "../variables";

const loaderColor = Variables.COLORS.accent;
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export const Loader = () => (
  <Modal transparent={true}>
    <View style={styles.backdrop}>
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color={loaderColor} />
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  backdrop: {
    width: screenWidth,
    height: screenHeight,
    backgroundColor: "#00000060",
  },
});
