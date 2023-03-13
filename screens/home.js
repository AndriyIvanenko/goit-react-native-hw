import React, { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../redux/auth/authOperations";
import { getUser } from "../redux/auth/authSelectors";

import { View, StyleSheet, Image, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import PublicationList from "../components/PublicationList";

import { HeaderButtons, HeaderButton, Item } from "react-navigation-header-buttons";

import { Variables } from "../variables";
const colors = Variables.COLORS;

const context = "home";

const FeatherHeaderButton = (props) => (
  <HeaderButton IconComponent={Feather} iconSize={23} {...props} />
);

const Home = ({ navigation, route }) => {
  const currentUser = useSelector(getUser);

  const dispatch = useDispatch();
  const onLogOutClick = () => {
    dispatch(signOut());
    navigation.navigate("Login");
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={FeatherHeaderButton}>
          <Item
            title="log-out"
            iconName="log-out"
            color={colors.second}
            onPress={onLogOutClick}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        {currentUser.avatarURL && (
          <Image source={{ uri: currentUser.avatarURL }} style={styles.avatar} />
        )}
        <View>
          <Text style={{ fontSize: 13, fontWeight: "700" }}>{currentUser.userName}</Text>
          <Text style={{ fontSize: 11 }}>{currentUser.userEmail}</Text>
        </View>
      </View>
      <PublicationList navigation={navigation} context={context} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 60,
    backgroundColor: colors.white,
  },
  userInfo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 16,
    marginRight: 8,
  },
});

export default Home;
