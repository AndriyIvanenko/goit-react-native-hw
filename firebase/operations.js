import { auth, firestore, storage } from "./config";
import { collection, doc, getDoc, getDocs, addDoc, deleteDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { nanoid } from "nanoid";
import { Alert } from "react-native";

const getFileNameFromURL = (url) => {
  const startIndex = url.indexOf("%2F") + 3;
  const endIndex = url.indexOf("?alt");
  return url.slice(startIndex, endIndex);
};

export const uploadImg = async (imgPath) => {
  try {
    const img = await fetch(imgPath);

    const imgFile = await img.blob();
    const imgId = nanoid();

    const imgRef = ref(storage, `images/${imgId}`);
    await uploadBytes(imgRef, imgFile);
    return await getDownloadURL(ref(storage, `images/${imgId}`));
    // await storage.ref(`images/${imgId}`).put(imgFile);
    // return await storage.ref("images").child(imgId).getDownloadURL();
  } catch (error) {
    console.log(error.message);
    Alert.alert(error.message);
  }
};

export const deleteAvatar = async (avatarUrl) => {
  try {
    const imgName = getFileNameFromURL(avatarUrl);
    await deleteObject(ref(storage, `images/${imgName}`));
    await updateProfile(auth.currentUser, { photoURL: "" });
    // const imgName = storage.refFromURL(url).name;
    // await storage.ref("images").child(imgName).delete();
    // await auth.currentUser.updateProfile({ photoURL: "" });
  } catch (error) {
    console.log(error.message);
    Alert.alert(error.message);
  }
};

export const updateAvatar = async (avatarUrl) => {
  try {
    const avatarNewUrl = await uploadImg(avatarUrl);
    await updateProfile(auth.currentUser, { photoURL: avatarNewUrl });
    // await auth.currentUser.updateProfile({ photoURL: avatarNewUrl });
    return avatarNewUrl;
  } catch (error) {
    console.log(error.message);
    Alert.alert(error.message);
  }
};

export const getPosts = async (context, user) => {
  const postsList = [];
  try {
    if (context === "profile") {
      const data = await getDocs(
        collection(firestore, "posts").where("owner", "==", user.userId)
      );
      data.docs.map((doc) => {
        postsList.push({ id: doc.id, ...doc.data() });
      });
      // const data = await firestore
      //   .collection("posts")
      //   .where("owner", "==", user.userId)
      //   .get();
      // data.docs.map((doc) => {
      //   postsList.push({ id: doc.id, ...doc.data() });
      // });
    } else {
      const data = await getDocs(collection(firestore, "posts"));
      data.docs.map((doc) => {
        postsList.push({ id: doc.id, ...doc.data() });
      });
      // const data = await firestore.collection("posts").get();
      // data.docs.map((doc) => {
      //   postsList.push({ id: doc.id, ...doc.data() });
      // });
    }
    return postsList;
  } catch (error) {
    console.log(error.message);
    Alert.alert(error.message);
  }
};

export const deletePost = async (id, url) => {
  try {
    await deleteDoc(doc(firestore, "posts", id));
    const imgName = getFileNameFromURL(url);
    await deleteObject(ref(storage, `images/${imgName}`));
    // await firestore.collection("posts").doc(id).delete();
    // const imgName = storage.refFromURL(url).name;
    // await storage.ref("images").child(imgName).delete();
  } catch (error) {
    console.log(error.message);
    Alert.alert(error.message);
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
    const newPost = await addDoc(collection(firestore, "posts"), data);
    // const newPost = await firestore.collection("posts").add(data);
    return {
      id: newPost.id,
      ...data,
    };
  } catch (error) {
    console.log(error.message);
    Alert.alert(error.message);
  }
};

export const getPost = async (postId) => {
  try {
    const snapshot = await getDoc(doc(firestore, "posts", postId));
    // const snapshot = await firestore.collection("posts").doc(postId).get();
    return snapshot.data();
  } catch (error) {
    console.log(error.message);
    Alert.alert(error.message);
  }
};

export const updatePost = async (postId) => {
  try {
    await updateDoc(doc(firestore, "posts", postId), { comments: updatedComments });
    // const ref = await firestore.collection("posts").doc(postId);
    // ref.update({
    //   comments: updatedComments,
    // });
  } catch (error) {
    console.log(error.message);
    Alert.alert(error.message);
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

// export const manualyUpdateUser = async (name, avatar, email) => {
//   await auth.currentUser.updateProfile({
//     displayName: name,
//     photoURL: avatar,
//   });
//   await auth.currentUser.updateEmail(email);
// };

// export const manualyCreatePost = async (userId) => {
//   const imgPath = "https://i.ibb.co/YLvKQZp/IMG-20191014-090136.jpg";

//   try {
//     const imgUri = await uploadImg(imgPath);

//     const coords = {
//       latitude: 48.859237,
//       longitude: 23.454282,
//     };

//     await firestore.collection("posts").add({
//       imgUri,
//       description: "Slavsko resort",
//       location: {
//         locationName: "Carpathians, Ukraine",
//         coords,
//       },
//       owner: userId,
//       comments: [],
//       likes: 0,
//     });
//     console.log("added");
//   } catch (error) {
//     console.log(error.message);
//   }
// };
