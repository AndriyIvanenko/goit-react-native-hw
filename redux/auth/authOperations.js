import { Alert } from "react-native";
import { auth } from "../../firebase/config";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { uploadImg } from "../../firebase/operations";
import { authSlice } from "./authSlice";

const signUp = (credentials) => async (dispatch, getState) => {
  // console.log("signUp");
  const { email, password, name, avatarURL } = credentials;
  try {
    const response = await createUserWithEmailAndPassword(auth, email, password);
    const avatar = await uploadImg(avatarURL);
    await updateProfile(auth.currentUser, { displayName: name, photoURL: avatar });
    const { uid } = response.user;
    dispatch(
      authSlice.actions.updateUser({
        avatarURL: avatarURL,
        userId: uid,
        userName: name,
        userEmail: email,
      })
    );
  } catch (error) {
    console.log(error.message);
    Alert.alert(error.message);
  }
};

const signIn = (credentials) => async (dispatch, getState) => {
  // console.log("signIn");
  const { email, password } = credentials;
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    const { uid, displayName, photoURL } = response.user;
    dispatch(
      authSlice.actions.updateUser({
        avatarURL: photoURL,
        userId: uid,
        userName: displayName,
        userEmail: email,
      })
    );
  } catch (error) {
    console.log(error.message);
    Alert.alert(error.message);
  }
};

const signOff = () => (dispatch, getState) => {
  // console.log("signOut");
  signOut(auth);
  dispatch(
    authSlice.actions.updateUser({
      avatarURL: "",
      userId: "",
      userName: "",
      userEmail: "",
    })
  );
  dispatch(authSlice.actions.updateAuthState({ isLoggedIn: false }));
};

const getAuthState = () => async (dispatch, getState) => {
  // console.log("getAuthState");
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const { uid, displayName, email, photoURL } = user;
      dispatch(
        authSlice.actions.updateUser({
          avatarURL: photoURL,
          userId: uid,
          userName: displayName,
          userEmail: email,
        })
      );
      dispatch(authSlice.actions.updateAuthState({ isLoggedIn: true }));
    }
  });
};

export { signUp, signIn, signOff, getAuthState };
