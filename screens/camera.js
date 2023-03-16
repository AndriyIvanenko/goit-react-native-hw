import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  BackHandler,
  Alert,
  Dimensions,
} from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import * as ScreenOrientation from "expo-screen-orientation";

import { Variables } from "../variables";
const colors = Variables.COLORS;

const CameraScreen = ({ navigation, route }) => {
  const initCameraDimesions = {
    width: Math.round(Dimensions.get("window").width),
    height: Math.round((Dimensions.get("window").width / 9) * 16),
  };

  const cameraRef = useRef();

  // const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [cameraBtnPosition, setCameraBtnPosition] = useState({ bottom: 30 });
  const [cameraDimensions, setCameraDimensions] = useState(initCameraDimesions);
  const [picture, setPicture] = useState(null);

  useLayoutEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      // const mediaPermission = await MediaLibrary.requestPermissionsAsync();
      // setHasMediaLibraryPermission(mediaPermission.status === "granted");
    })();
  }, []);

  useEffect(() => {
    ScreenOrientation.addOrientationChangeListener((e) => {
      if (e.orientationInfo.orientation < 3) {
        const width = Math.round(Dimensions.get("window").width);
        const height = Math.round((Dimensions.get("window").width / 9) * 16);
        setCameraDimensions({ width, height });
        setCameraBtnPosition({ bottom: 30 });
      } else {
        const width = Math.round((Dimensions.get("window").height / 9) * 16);
        const height = Math.round(Dimensions.get("window").height);
        setCameraDimensions({ width, height });
        setCameraBtnPosition({ bottom: "45%", right: 30 });
      }
    });
  }, []);

  useEffect(() => {
    const backAction = () => {
      ScreenOrientation.removeOrientationChangeListeners();
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    };
    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => backHandler.remove();
  }, []);

  (async function () {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.ALL);
  })();

  const takePicture = async () => {
    const picture = await cameraRef.current.takePictureAsync();
    setPicture(picture);

    const asset = await MediaLibrary.createAssetAsync(picture.uri);
    // MediaLibrary.createAlbumAsync("My album", asset)
    //   .then(() => {
    //     // console.log(asset);
    //   })
    //   .catch((error) => {
    //     console.log("err", error);
    //   });
  };

  const flipCamera = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const goBack = async () => {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    ScreenOrientation.removeOrientationChangeListeners();
    const { context } = route.params;
    if (context === "newPost") {
      navigation.navigate("AddNewPost", { uri: picture.uri, id: picture.id });
    } else if (context === "Registration") {
      navigation.navigate("Registration", { uri: picture.uri, id: picture.id });
    } else {
      navigation.navigate("Profile", { uri: picture.uri, id: picture.id });
    }
  };

  if (hasCameraPermission === false) {
    return Alert.alert(
      "Permission for camera not granted. please change it in settings."
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={{
          width: cameraDimensions.width,
          height: cameraDimensions.height,
        }}
        ref={cameraRef}
        type={cameraType}
        ratio="16:9"
      >
        <TouchableOpacity
          style={{ ...styles.cameraBtn, ...cameraBtnPosition }}
          onPress={takePicture}
        >
          <FontAwesome name="camera" size={20} color={colors.main} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.flipBtn} onPress={flipCamera}>
          <MaterialIcons name="flip-camera-android" size={24} color={colors.main} />
        </TouchableOpacity>

        <Pressable style={styles.imgContainer} onPress={goBack}>
          {picture && (
            <Image source={{ uri: picture.uri }} style={{ width: 120, height: 80 }} />
          )}
        </Pressable>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.main,
  },

  cameraBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    alignSelf: "center",
  },

  flipBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 30,
    right: 30,
  },

  imgContainer: {
    position: "absolute",
    top: 30,
    left: 10,
    borderWidth: 1,
    borderColor: colors.white,
  },
});

export default CameraScreen;
