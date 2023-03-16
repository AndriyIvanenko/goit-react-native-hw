import { auth, firestore, storage } from "./config";
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

export const deleteAvatar = async (url) => {
  try {
    const imgName = storage.refFromURL(url).name;
    await storage.ref("images").child(imgName).delete();
    await auth.currentUser.updateProfile({ photoURL: "" });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateAvatar = async (avatarUrl) => {
  try {
    const avatarNewUrl = await uploadImg(avatarUrl);
    await auth.currentUser.updateProfile({ photoURL: avatarNewUrl });
    return avatarNewUrl;
  } catch (error) {
    console.log(error.message);
  }
};

export const getPosts = async (context, user) => {
  const postsList = [];
  try {
    if (context === "profile") {
      const data = await firestore
        .collection("posts")
        .where("owner", "==", user.userId)
        .get();
      data.docs.map((doc) => {
        postsList.push({ id: doc.id, ...doc.data() });
      });
    } else {
      const data = await firestore.collection("posts").get();
      data.docs.map((doc) => {
        postsList.push({ id: doc.id, ...doc.data() });
      });
    }
    return postsList;
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePost = async (id, url) => {
  try {
    await firestore.collection("posts").doc(id).delete();
    const imgName = storage.refFromURL(url).name;
    await storage.ref("images").child(imgName).delete();
  } catch (error) {
    console.log(error.message);
  }
};

export const createNewPost = async (imgPath, postData, coords, owner) => {
  const data = {
    imgUri: imgPath,
    description: postData.description,
    location: {
      locationName: postData.location,
      coords,
    },
    owner: owner,
    comments: [],
    likes: 0,
  };
  try {
    const newPost = await firestore.collection("posts").add(data);
    return {
      id: newPost.id,
      ...data,
    };
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

export const manualyCreatePost = async (userId) => {
  const imgPath = "https://i.ibb.co/YLvKQZp/IMG-20191014-090136.jpg";

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
      owner: userId,
      comments: [],
      likes: 0,
    });
    console.log("added");
  } catch (error) {
    console.log(error.message);
  }
};
