import React, { useEffect, useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { CommentsList } from "../components/CommentsList";
import { CommentInput } from "../components/CommentInput";
import { AntDesign } from "@expo/vector-icons";
import { nanoid } from "nanoid";

import { Variables } from "../variables";
const colors = Variables.COLORS;

import { firestore } from "../firebase/config";
import { useSelector } from "react-redux";
import { getUser } from "../redux/auth/authSelectors";
import { createNewDate } from "../firebase/operations";

const Comments = ({ navigation, route }) => {
  const [newComment, setNewComment] = useState("");
  const [post, setPost] = useState([]);

  const currentUser = useSelector(getUser);

  const postId = route.params.id;

  const getPost = async () => {
    try {
      const snapshot = await firestore.collection("posts").doc(postId).get();
      const post = snapshot.data();
      setPost(post);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  const getNewComment = (value) => setNewComment(value);

  const sendNewComment = async () => {
    if (newComment) {
      const date = createNewDate();

      const comment = {
        id: nanoid(),
        createdAt: date,
        userId: currentUser.userId,
        userAvatar: currentUser.avatarURL,
        comment: newComment,
      };

      const updatedComments = [...post.comments, comment];
      setPost((prevState) => ({ ...prevState, comments: updatedComments }));

      try {
        const ref = await firestore.collection("posts").doc(postId);
        console.log(updatedComments);
        ref.update({
          comments: updatedComments,
        });
      } catch (error) {
        console.log(error.message);
      }

      Alert.alert("new comment sent");
      setNewComment("");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View>
          <Image source={{ uri: post.imgUri }} style={styles.image} />
        </View>

        <CommentsList comments={post.comments} />

        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={{}}
        >
          <CommentInput
            placeholder="Type a comment..."
            value={newComment}
            onChangeText={getNewComment}
          />
          <TouchableOpacity onPress={sendNewComment} style={styles.sendNewPostBtn}>
            <AntDesign name="arrowup" size={30} color={colors.white} />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: colors.white,
  },

  image: {
    height: 240,
    borderRadius: 8,
    marginBottom: 18,
  },

  sendNewPostBtn: {
    position: "absolute",
    bottom: 11,
    right: 0,
    padding: 5,
    marginRight: 8,
    borderRadius: 25,
    backgroundColor: colors.accent,
  },
});

export default Comments;
