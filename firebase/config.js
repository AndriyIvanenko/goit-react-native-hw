// import * as firebase from "firebase";
import * as firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAo1DbN9bwriSuOPIQnHCQIW75fIjPQx1M",
  authDomain: "react-native-project-c4e1b.firebaseapp.com",
  projectId: "react-native-project-c4e1b",
  storageBucket: "react-native-project-c4e1b.appspot.com",
  messagingSenderId: "400174660446",
  appId: "1:400174660446:web:aa6b93989561b462e56dcf",
  measurementId: "G-PB5YXCMSLT",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

export { auth };
