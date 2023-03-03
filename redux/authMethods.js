import { auth } from "../firebase/config";

const signUp = (email, password) => async (dispatch, getState) => {
  console.log(email, password);
  try {
    const user = await auth.createUserWithEmailAndPassword(email, password);
    console.log(user);
  } catch (error) {
    console.log(error.message);
  }
};

export { signUp };
