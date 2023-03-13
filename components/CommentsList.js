import React from "react";
import { View, Image, Text, StyleSheet, FlatList } from "react-native";

import { useSelector } from "react-redux";
import { getUserId } from "../redux/auth/authSelectors";

import { Variables } from "../variables";
const colors = Variables.COLORS;

export const CommentsList = ({ comments }) => {
  const currentUserId = useSelector(getUserId);

  const commentDirection = (userId) =>
    userId !== currentUserId
      ? { flexDirection: "row" }
      : { flexDirection: "row-reverse" };
  const commentOffset = (userId) =>
    userId !== currentUserId ? { marginLeft: 16 } : { marginRight: 16 };
  const datePosition = (userId) =>
    userId !== currentUserId ? { marginLeft: "auto" } : { marginRight: "auto" };

  return (
    <FlatList
      data={comments}
      renderItem={({ item }) => (
        <View style={{ display: "flex", ...commentDirection(item.userId) }}>
          <Image source={{ uri: item.userAvatar }} style={styles.avatar} />
          <View style={{ ...styles.comment, ...commentOffset(item.userId) }}>
            <Text style={styles.text}>{item.comment}</Text>
            <View style={{ ...styles.date, ...datePosition(item.userId) }}>
              <Text style={styles.dateText}>{item.createdAt.date}</Text>
              <Text style={styles.dateSeparator}>{"|"}</Text>
              <Text style={styles.dateText}>{item.createdAt.time}</Text>
            </View>
          </View>
        </View>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },

  comment: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#00000007",
    marginBottom: 24,
    borderRadius: 6,
  },

  text: {
    fontSize: 13,
    lineHeight: 18,
    color: colors.text,
    marginBottom: 8,
  },

  date: {
    display: "flex",
    flexDirection: "row",
  },
  dateText: {
    fontSize: 10,
    color: colors.second,
  },
  dateSeparator: {
    fontSize: 10,
    color: colors.second,
    paddingHorizontal: 3,
  },
});
