import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  Pressable,
} from "react-native";
import { Dimensions } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { Button } from "../components/Button";

import { Variables } from "../variables";
const colors = Variables.COLORS;

const windowWidth = Dimensions.get("window").width;
const imgUri = require("../assets/photo1.jpg");

const AddNewPost = ({ navigation }) => {
  const initialImgData = {
    imgUri: "file:///C:/Projects/goit-react-native-hw/assets/photo1.jpg",
    description: "",
    location: "",
    locationUrl: "",
  };
  const [imgData, setImgData] = useState(initialImgData);

  const onDescriptionChange = (value) =>
    setImgData((prevState) => ({ ...prevState, description: value }));

  const onLocationChange = (value) =>
    setImgData((prevState) => ({ ...prevState, location: value }));

  // const onImageChange = (value) =>
  //   setImgData((prevState) => ({ ...prevState, imgUri: value }));

  // const onLocationUrlChange = (value) =>
  //   setImgData((prevState) => ({ ...prevState, locationUrl: value }));

  const takePicture = () => Alert.alert("take a picture");
  const publishPicture = () => Alert.alert("picture published");
  const handleImg = () => Alert.alert("handle picture");
  const showLocation = () => Alert.alert("show location");
  const removeImg = () => {
    setImgData((prevState) => ({ ...prevState, ...initialImgData }));
    Alert.alert("picture deleted");
  };

  const cameraBtnColor = imgData.imgUri ? colors.white : colors.second;
  const cameraBtnBgrColor = imgData.imgUri ? "#ffffff4d" : "#ffffffff";
  const handleImgOperation = imgData.imgUri ? "Edit photo" : "Upload Photo";

  const isImgDataReady =
    imgData.imgUri && imgData.description && imgData.location;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
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
          {imgData.imgUri && (
            <Image
              source={imgUri}
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

            <TouchableOpacity
              onPress={showLocation}
              style={styles.locationIcon}
            >
              <Feather name="map-pin" size={18} color={colors.second} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>

        <Button
          name="Publish"
          onFocus={isImgDataReady}
          onPress={publishPicture}
        />

        <TouchableOpacity onPress={removeImg} style={styles.removeBtn}>
          <Feather name="trash-2" size={24} color={colors.second} />
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
    backgroundColor: colors.background,
    borderRadius: 20,
    marginTop: 150,
    alignSelf: "center",
  },
});

export default AddNewPost;
