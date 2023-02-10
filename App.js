import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "react-native";

import Registration from "./screens/registration";
import Login from "./screens/login";
import Comments from "./screens/comments";
import AddNewPost from "./screens/newPost";

import { HomeTabs } from "./nav/TabNavigation";

export default () => {
  const Stack = createStackNavigator();

  NavigationBar.setButtonStyleAsync("light");
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <Stack.Navigator initialRouteName="Login">
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
        <Stack.Screen
          name={"HomePage"}
          component={HomeTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"Comments"}
          component={Comments}
          options={{ headerStyle: { height: 60 }, headerTitleAlign: "center" }}
        />
        <Stack.Screen
          name="AddNewPost"
          component={AddNewPost}
          options={{ headerStyle: { height: 60 }, headerTitleAlign: "center" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
