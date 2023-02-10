import React, { useState } from "react";
import { View, Image, Text, StyleSheet, FlatList } from "react-native";

import { Variables } from "../variables";
const colors = Variables.COLORS;

export const CommentsList = ({ comments, users, currentUser }) => {
  const commentDirection = (user) =>
    user !== currentUser
      ? { flexDirection: "row" }
      : { flexDirection: "row-reverse" };
  const commentOffset = (user) =>
    user !== currentUser ? { marginLeft: 16 } : { marginRight: 16 };
  const datePosition = (user) =>
    user !== currentUser ? { marginLeft: "auto" } : { marginRight: "auto" };

  return (
    <FlatList
      data={comments}
      renderItem={({ item }) => (
        <View style={{ display: "flex", ...commentDirection(item.userId) }}>
          <Image
            source={users.find((user) => user.id === item.userId).avatar}
            style={styles.avatar}
          />
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
    ></FlatList>
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
