import { auth } from "../../firebase/config";
import { uploadImg } from "../../firebase/operations";
import { authSlice } from "./authSlice";

const signUp = (credentials) => async (dispatch, getState) => {
  console.log("signUp");
  const { email, password, name, avatarURL } = credentials;
  try {
    const response = await auth.createUserWithEmailAndPassword(email, password);
    const avatar = await uploadImg(avatarURL);
    await auth.currentUser.updateProfile({ displayName: name, photoURL: avatar });
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
  }
};

const signIn = (credentials) => async (dispatch, getState) => {
  console.log("signIn");
  const { email, password } = credentials;
  try {
    const response = await auth.signInWithEmailAndPassword(email, password);
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
  }
};

const signOut = () => (dispatch, getState) => {
  console.log("signOut");
  auth.signOut();
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
  console.log("getAuthState");
  await auth.onAuthStateChanged((user) => {
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

export { signUp, signIn, signOut, getAuthState };
