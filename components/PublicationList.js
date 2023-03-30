import React, { useCallback, useEffect, useState } from "react";
import { FlatList, Alert, View } from "react-native";
import Publication from "./Publication";
import { Loader } from "./Loader";

import { deletePost, getPosts } from "../firebase/operations";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/auth/authSelectors";
import { getUpdateFlag } from "../redux/upd/updSelectors";
import { updateFlag } from "../redux/upd/updSlise";
import { deletePublication } from "../redux/publications/publicationsSlice";
import { getPublications } from "../redux/publications/publicationsSelectors";

const PublicationList = ({ navigation, context }) => {
  // const [posts, setPosts] = useState([]);
  // const [listUpdCounter, setListUpdCounter] = useState(0);
  const [isDbOperationActive, setIsDbOperationActive] = useState(false);

  // const updFlag = useSelector(getUpdateFlag);
  const publications = useSelector(getPublications);

  const currentUser = useSelector(getUser);

  const dispatch = useDispatch();
  // useEffect(() => {
  //   if (listUpdCounter < updFlag) {
  //     (async () => {
  //       try {
  //         const postsList = await getPosts(context, currentUser);
  //         setPosts(postsList);
  //         setListUpdCounter(listUpdCounter + 1);
  //         console.log("effect - ", context);
  //       } catch (error) {
  //         console.log(error.message);
  //       }
  //     })();
  //   }
  // }, [listUpdCounter, updFlag]);

  const onCommentsPress = useCallback((id) => {
    navigation.navigate("Comments", { id });
  }, []);

  const onLocationPress = useCallback((coords, name, description) => {
    navigation.navigate("MapView", { coords, name, description });
  }, []);

  const onDeletePress = useCallback((id, url) => {
    Alert.alert("Are you shure?", "Do you want to remove the post?", [
      {
        text: "Yes",
        onPress: async () => {
          try {
            setIsDbOperationActive(true);
            await deletePost(id, url);
            const index = publications.findIndex((item) => item.id === id);
            dispatch(deletePublication(index));
            // dispatch(updateFlag(1));

            setIsDbOperationActive(false);
            Alert.alert("Post deleted");
          } catch (error) {
            console.log(error.message);
            Alert.alert(error.message);
          }
        },
      },
      { text: "No" },
    ]);
  }, []);

  // console.log("render - ", context);

  return (
    <>
      {isDbOperationActive && <Loader />}
      <FlatList
        style={{ height: "65%" }}
        data={publications}
        // data={posts}
        renderItem={({ item }) =>
          context === "profile" ? (
            item.owner === currentUser.userId && (
              <Publication
                context={context}
                item={item}
                deleteItem={onDeletePress}
                goToComments={onCommentsPress}
                goToMap={onLocationPress}
              />
            )
          ) : (
            <Publication
              context={context}
              item={item}
              deleteItem={onDeletePress}
              goToComments={onCommentsPress}
              goToMap={onLocationPress}
            />
          )
        }
        keyExtractor={(item) => item.id}
      />
    </>
  );
};

export default PublicationList;
