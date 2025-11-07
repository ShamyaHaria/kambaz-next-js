import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./Courses/[cid]/reducer";
import modulesReducer from "./Courses/[cid]/Modules/reducer";
import accountReducer from "./Account/reducer";
const store = configureStore({
  reducer: {
    coursesReducer,
    modulesReducer,
    accountReducer,
  },
});

export default store;
