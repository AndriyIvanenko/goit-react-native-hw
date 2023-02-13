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

import USERS from "../db/users.json";

import { getPublications, storePublications } from "../db/db";

const CURRENT_USER = "user-2";

const Comments = ({ navigation, route }) => {
  const [commentText, setCommentText] = useState("");
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    getPublications().then((response) => setPublications(response));
  }, []);

  const getCommentText = (value) => setCommentText(value);

  function creteNewDate() {
    const date = new Date();
    const dateOptions = { day: "numeric", month: "short", year: "numeric" };
    const timeOptions = { hour: "2-digit", minute: "2-digit" };
    const createdAt = {
      date: date.toLocaleDateString("en-GB", dateOptions),
      time: date.toLocaleTimeString("en-GB", timeOptions),
    };
    return createdAt;
  }

  const publication = route.params.publications.find(
    (item) => item.id === route.params.id
  );

  const sendNewPost = () => {
    if (commentText) {
      const date = creteNewDate();

      const newComment = {
        id: nanoid(),
        createdAt: date,
        userId: CURRENT_USER,
        comment: commentText,
      };

      publication.comments.push(newComment);
      const publicationIndex = route.params.publications.findIndex(
        (item) => item.id === route.params.id
      );
      publications.splice(publicationIndex, 1, publication);
      storePublications(publications);

      Alert.alert("new comment sent");
      setCommentText("");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View>
          <Image source={{ uri: publication.imgUri }} style={styles.image} />
        </View>

        <CommentsList
          comments={publication.comments}
          users={USERS}
          currentUser={CURRENT_USER}
        />

        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={{}}
        >
          <CommentInput
            placeholder="Type a comment..."
            value={commentText}
            onChangeText={getCommentText}
          />
          <TouchableOpacity onPress={sendNewPost} style={styles.sendNewPostBtn}>
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
