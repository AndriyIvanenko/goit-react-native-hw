import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./auth/authSlice";
import { publicationsReducer } from "./publications/publicationsSlice";
import { updFlagReducer } from "./upd/updSlise";

const rootReducer = combineReducers({
  auth: authReducer,
  publications: publicationsReducer,
  updFlag: updFlagReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
