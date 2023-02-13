import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

import { Variables } from "../variables";
const colors = Variables.COLORS;

import { getPublications } from "../db/db";

const PublicationList = ({ navigation, context }) => {
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    getPublications().then((response) => setPublications(response));
  });

  const addInfoTextColor = context === "profile" ? colors.main : colors.second;
  const iconColor = context === "profile" ? colors.accent : colors.second;

  const onCommentPress = (id) => {
    navigation.navigate("Comments", { id, publications });
  };

  const openMapView = (coords, name, description) =>
    navigation.navigate("MapView", { coords, name, description });

  return (
    <FlatList
      style={{ height: "65%" }}
      data={publications}
      renderItem={({ item }) => (
        <View style={{ marginBottom: 32 }}>
          <Image source={{ uri: item.imgUri }} style={styles.image} />
          <Text style={styles.description}>{item.description}</Text>
          <View style={styles.addInfo}>
            <TouchableOpacity
              style={styles.quantity}
              onPress={() => onCommentPress(item.id)}
            >
              <Feather
                name="message-circle"
                size={18}
                color={iconColor}
                style={{ transform: [{ scaleX: -1 }] }}
              />

              <Text
                style={{
                  fontSize: 16,
                  color: addInfoTextColor,
                  marginLeft: 8,
                  marginRight: 27,
                }}
              >
                {item.comments.length}
              </Text>
            </TouchableOpacity>

            {context === "profile" && (
              <View style={styles.quantity}>
                <Feather name="thumbs-up" size={18} color={colors.accent} />
                <Text
                  style={{
                    fontSize: 16,
                    color: addInfoTextColor,
                    marginLeft: 8,
                  }}
                >
                  {item.likes}
                </Text>
              </View>
            )}

            <View style={styles.location}>
              <Feather name="map-pin" size={18} color={colors.second} />
              <TouchableOpacity
                onPress={() =>
                  openMapView(
                    item.location.coords,
                    item.location.locationName,
                    item.description
                  )
                }
              >
                <Text style={styles.locationText}>{item.location.locationName}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
  },
  description: {
    marginBottom: 11,
    fontSize: 16,
    fontWeight: "500",
  },
  addInfo: {
    display: "flex",
    flexDirection: "row",
  },
  quantity: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  location: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
  },
  locationText: {
    fontSize: 16,
    textDecorationLine: "underline",
    paddingRight: 8,
    marginLeft: 8,
  },
});

export default PublicationList;
