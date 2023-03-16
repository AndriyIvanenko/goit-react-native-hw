import { createSlice } from "@reduxjs/toolkit";

export const updSlice = createSlice({
  name: "updFlag",
  initialState: {
    flag: 1,
  },
  reducers: {
    updateFlag: (state, { payload }) => ({
      ...state,
      flag: state.flag + payload,
    }),
  },
});

export const updFlagReducer = updSlice.reducer;
export const { updateFlag } = updSlice.actions;
