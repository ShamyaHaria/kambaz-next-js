import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./Courses/[cid]/reducer";
import modulesReducer from "./Courses/[cid]/Modules/reducer";
const store = configureStore({
  reducer: {
    coursesReducer,
    modulesReducer,
  },
});

export default store;
