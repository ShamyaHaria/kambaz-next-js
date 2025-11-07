import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./Courses/[cid]/reducer";

const store = configureStore({
  reducer: {
    coursesReducer,
  },
});

export default store;