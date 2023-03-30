import { createSlice } from "@reduxjs/toolkit";

export const publicationsSlice = createSlice({
  name: "publications",
  initialState: {
    publications: [],
  },
  reducers: {
    setPublications: (state, { payload }) => ({
      ...state,
      publications: payload,
    }),
    addPublication: (state, { payload }) => ({
      ...state,
      publications: [...state.publications, payload],
    }),
    deletePublication: (state, { payload }) => {
      const prevPublications = [...state.publications];
      prevPublications.splice(payload, 1);
      console.log(prevPublications);
      return {
        ...state,
        publications: prevPublications,
      };
    },
    updatePublication: (state, { payload }) => {
      const publication = state.publications.find((item) => item.id === payload.id);
      const index = state.publications.findIndex((item) => item.id === payload.id);
      publication.comments = payload.comments;

      const prevPublications = [...state.publications];
      prevPublications.splice(index, 1, publication);
      return {
        ...state,
        publications: prevPublications,
      };
    },
  },
});

export const publicationsReducer = publicationsSlice.reducer;
export const { setPublications, deletePublication, addPublication, updatePublication } =
  publicationsSlice.actions;
