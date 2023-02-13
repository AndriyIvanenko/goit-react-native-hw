// import RNFS from "react-native-fs";
// import * as RNFS from "react-native-fs";
// const RNFS = require("react-native-fs");
// import { DocumentDirectoryPath, writeFile } from "react-native-fs";

import AsyncStorage from "@react-native-async-storage/async-storage";

const storePublications = async (data) => {
  try {
    const jsonData = JSON.stringify(data);
    await AsyncStorage.setItem("@Publications", jsonData);
  } catch (e) {
    console.log(e.message);
  }
};

const getPublications = async () => {
  try {
    const jsonData = await AsyncStorage.getItem("@Publications");
    return jsonData != null ? JSON.parse(jsonData) : null;
  } catch (e) {
    console.log(e.message);
  }
};

export { storePublications, getPublications };
