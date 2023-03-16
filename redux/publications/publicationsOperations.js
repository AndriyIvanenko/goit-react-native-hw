import { publicationsSlice } from "./publicationsSlice";
import { getPosts } from "../../firebase/operations";

const setPublications = (context, currentUser) => async (dispatch, getState) => {
  console.log("getPosts");
  try {
    const postsList = await getPosts(context, currentUser);
    dispatch(
      publicationsSlice.actions.setPublications({
        publications: postsList,
      })
    );
  } catch (error) {
    console.log(error.message);
  }
};

export { setPublications };
