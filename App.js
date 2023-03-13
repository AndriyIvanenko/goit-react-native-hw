import React from "react";

import { store } from "./redux/store";
import { Provider } from "react-redux";

import { NavContainer } from "./nav/NavContainer";

export default () => {
  return (
    <Provider store={store}>
      <NavContainer />
    </Provider>
  );
};
