import { useSelector } from "react-redux";
import { auth, firestore, storage } from "../firebase/config";
import { getUser } from "../redux/auth/authSelectors";
import { nanoid } from "nanoid";

export const uploadImg = async (imgPath) => {
  try {
    const img = await fetch(imgPath);

    const imgFile = await img.blob();
    const imgId = nanoid();

    await storage.ref(`images/${imgId}`).put(imgFile);
    return await storage.ref("images").child(imgId).getDownloadURL();
  } catch (error) {
    console.log(error.message);
  }
};

export const createNewPost = async (imgPath, postData, coords, owner) => {
  try {
    await firestore.collection("posts").add({
      imgUri: imgPath,
      description: postData.description,
      location: {
        locationName: postData.location,
        coords,
      },
      owner: owner,
      comments: [],
      likes: 0,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const createNewDate = () => {
  const date = new Date();
  const dateOptions = { day: "numeric", month: "short", year: "numeric" };
  const timeOptions = { hour: "2-digit", minute: "2-digit" };
  const createdAt = {
    date: date.toLocaleDateString("en-GB", dateOptions),
    time: date.toLocaleTimeString("en-GB", timeOptions),
  };
  return createdAt;
};

export const manualyUpdateUser = async (name, avatar, email) => {
  await auth.currentUser.updateProfile({
    displayName: name,
    photoURL: avatar,
  });
  await auth.currentUser.updateEmail(email);
};

export const manualyCreatePost = async () => {
  const imgPath = "https://i.ibb.co/YLvKQZp/IMG-20191014-090136.jpg";

  const currentUser = useSelector(getUser);

  try {
    const imgUri = await uploadImg(imgPath);

    const coords = {
      latitude: 48.859237,
      longitude: 23.454282,
    };

    await firestore.collection("posts").add({
      imgUri,
      description: "Slavsko resort",
      location: {
        locationName: "Carpathians, Ukraine",
        coords,
      },
      owner: currentUser.userId,
      comments: [],
      likes: 0,
    });
    console.log("added");
  } catch (error) {
    console.log(error.message);
  }
};
