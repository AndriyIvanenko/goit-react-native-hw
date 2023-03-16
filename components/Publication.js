import React, { memo } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

import { Variables } from "../variables";
const colors = Variables.COLORS;

const Publication = ({ context, item, deleteItem, goToComments, goToMap }) => {
  const addInfoTextColor = context === "profile" ? colors.main : colors.second;
  const iconColor = context === "profile" ? colors.accent : colors.second;

  return (
    <View style={{ marginBottom: 32 }}>
      <Image source={{ uri: item.imgUri }} style={styles.image} />

      {context === "profile" && (
        <TouchableOpacity
          style={styles.delete}
          onPress={() => deleteItem(item.id, item.imgUri)}
        >
          <Feather name="trash-2" size={20} color={iconColor} />
        </TouchableOpacity>
      )}

      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.addInfo}>
        <TouchableOpacity style={styles.quantity} onPress={() => goToComments(item.id)}>
          <Feather
            name="message-circle"
            size={18}
            color={iconColor}
            style={{ transform: [{ scaleX: -1 }] }}
          />

          <Text
            style={{
              fontSize: 16,
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
          <Feather name="map-pin" size={18} color={iconColor} />
          <TouchableOpacity
            onPress={() =>
              goToMap(item.location.coords, item.location.locationName, item.description)
            }
          >
            <Text style={styles.locationText}>{item.location.locationName}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
  delete: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff4d",
  },
});

export default memo(Publication);
