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
  },
});

export const publicationsReducer = publicationsSlice.reducer;
export const { setPublications, deletePublication, addPublication } =
  publicationsSlice.actions;
