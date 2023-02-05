import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "react-native";

import Registration from "./screens/registration";
import Login from "./screens/login";

export default () => {
  const Stack = createStackNavigator();

  NavigationBar.setButtonStyleAsync("light");
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <Stack.Navigator initialRouteName="HomePage">
        <Stack.Screen
          name="Registration"
          component={Registration}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
