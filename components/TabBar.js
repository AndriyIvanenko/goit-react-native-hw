import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Tab } from "./Tab";

import { Variables } from "../variables";
const colors = Variables.COLORS;

export const TabBar = ({ state, navigation }) => {
  const [selected, setSelected] = useState("Home");

  const chahgeColor = (currentTab) =>
    currentTab === selected ? colors.white : colors.second;

  const chahgeBgrColor = (currentTab) =>
    currentTab === selected ? colors.accent : colors.white;

  const onTabPress = (activeTab, index) => {
    if (state.index !== index) {
      if (activeTab !== "Add") {
        setSelected(activeTab);
      }
      activeTab === "Add"
        ? navigation.navigate("AddNewPost")
        : navigation.navigate(activeTab);
    }
  };

  const { routes } = state;

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {routes.map((route, index) => (
          <Tab
            tab={route}
            icon={route.params.icon}
            onPress={() => onTabPress(route.name, index)}
            color={chahgeColor(route.name)}
            bgrColor={chahgeBgrColor(route.name)}
            key={route.key}
          />
        ))}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: colors.white,
    alignItems: "center",
    paddingBottom: 30,
    paddingTop: 10,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "75%",
    backgroundColor: colors.white,
  },
});
