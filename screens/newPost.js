import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserId } from "../redux/auth/authSelectors";
import { updateFlag } from "../redux/upd/updSlise";
import { addPublication } from "../redux/publications/publicationsSlice";

import {
  Text,
  View,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  Pressable,
  Dimensions,
} from "react-native";

import * as Location from "expo-location";
import { uploadImg } from "../firebase/operations";
import { createNewPost } from "../firebase/operations";

import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Button } from "../components/Button";
import { Loader } from "../components/Loader";

import { Variables } from "../variables";
const colors = Variables.COLORS;
const context = "newPost";

const windowWidth = Dimensions.get("window").width;

const AddNewPost = ({ navigation, route }) => {
  const initialImgData = {
    description: "",
    location: "",
  };
  const [imgData, setImgData] = useState(initialImgData);
  const [isDbOperationActive, setIsDbOperationActive] = useState(false);

  const dispatch = useDispatch();

  const imgUri = route.params && route.params.uri ? route.params.uri : "";

  const onDescriptionChange = (value) =>
    setImgData((prevState) => ({ ...prevState, description: value }));

  const onLocationChange = (value) =>
    setImgData((prevState) => ({ ...prevState, location: value }));

  const takePicture = () => navigation.navigate("Camera", { context });

  const currentUser = useSelector(getUserId);

  const publishNewPost = async () => {
    try {
      setIsDbOperationActive(true);

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
      }

      const imgPath = await uploadImg(imgUri);
      const location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      const newPost = await createNewPost(imgPath, imgData, coords, currentUser);
      dispatch(addPublication(newPost));
      // dispatch(updateFlag(1));

      setIsDbOperationActive(false);
      Alert.alert("Post uploaded");
    } catch (error) {
      console.log(error.message);
      Alert.alert(error.message);
    }
    navigation.navigate("Home");
  };

  const handleImg = () => Alert.alert("handle image");

  const removeImg = () => {
    setImgData(initialImgData);
    if (route.params && route.params.uri) {
      route.params.uri = "";
    }
    Alert.alert("picture deleted");
  };

  const cameraBtnColor = imgUri ? colors.white : colors.second;
  const cameraBtnBgrColor = imgUri ? "#ffffff4d" : "#ffffffff";
  const handleImgOperation = imgUri ? "Edit photo" : "Upload Photo";
  const removeBtnColor =
    imgUri || imgData.description || imgData.location ? colors.white : colors.second;
  const removeBtnBgrColor =
    imgUri || imgData.description || imgData.location ? colors.accent : colors.background;

  const isImgDataReady = imgUri && imgData.description && imgData.location;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {isDbOperationActive && <Loader />}
        <View style={styles.imgContainer}>
          <TouchableOpacity
            style={{
              ...styles.cameraBtn,
              backgroundColor: cameraBtnBgrColor,
            }}
            onPress={takePicture}
          >
            <FontAwesome name="camera" size={20} color={cameraBtnColor} />
          </TouchableOpacity>
          {imgUri && (
            <Image
              source={{ uri: imgUri }}
              style={{
                height: 240,
                width: windowWidth,
                zIndex: -1,
              }}
            />
          )}
        </View>
        <Pressable onPress={handleImg}>
          <Text style={styles.imgHandler}>{handleImgOperation}</Text>
        </Pressable>

        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={{}}
        >
          <TextInput
            placeholder="Description..."
            placeholderTextColor={colors.second}
            value={imgData.description}
            onChangeText={onDescriptionChange}
            style={styles.description}
          />

          <View style={{ justifyContent: "center", marginBottom: 32 }}>
            <TextInput
              placeholder="Location..."
              placeholderTextColor={colors.second}
              value={imgData.location}
              onChangeText={onLocationChange}
              style={styles.location}
            />

            <View style={styles.locationIcon}>
              <Feather name="map-pin" size={18} color={colors.second} />
            </View>
          </View>
        </KeyboardAvoidingView>

        <Button
          name="Publish"
          onFocus={isImgDataReady}
          onPress={publishNewPost}
          style={{ marginBottom: 32 }}
        />

        <TouchableOpacity
          onPress={removeImg}
          style={{ ...styles.removeBtn, backgroundColor: removeBtnBgrColor }}
        >
          <Feather name="trash-2" size={24} color={removeBtnColor} />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 32,
    backgroundColor: colors.white,
  },
  imgContainer: {
    height: 240,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.border,
    marginBottom: 8,
    overflow: "hidden",
  },

  cameraBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 90,
    alignSelf: "center",
  },

  imgHandler: {
    fontSize: 16,
    color: colors.second,
    marginBottom: 38,
  },

  description: {
    borderBottomWidth: 1,
    borderColor: colors.border,
    height: 40,
    fontSize: 16,
    marginBottom: 22,
  },

  location: {
    borderBottomWidth: 1,
    borderColor: colors.border,
    height: 40,
    fontSize: 16,
    paddingLeft: 28,
  },

  locationIcon: {
    position: "absolute",
  },

  removeBtn: {
    width: 70,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginTop: 100,
    // marginTop: "auto",
    alignSelf: "center",
  },
});

export default AddNewPost;
