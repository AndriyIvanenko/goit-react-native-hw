import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../screens/home";
import Profile from "../screens/profile";
import AddNewPost from "../screens/newPost";
import { TabBar } from "../components/TabBar";

export const HomeTabs = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen
        name="Home"
        component={Home}
        initialParams={{ icon: "home" }}
        options={{
          headerTitleAlign: "center",
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddNewPost}
        initialParams={{ icon: "plus" }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        initialParams={{ icon: "user" }}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};
