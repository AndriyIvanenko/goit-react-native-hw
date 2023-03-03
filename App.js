import React from "react";

import { store } from "./redux/store";
import { Provider } from "react-redux";

import { NavContainer } from "./nav/NavContainer";

import { storePublications } from "./db/db";
import PUBLICATIONS from "./db/publications.json";

export default () => {
  storePublications(PUBLICATIONS);

  return (
    <Provider store={store}>
      <NavContainer />
    </Provider>
  );
};
