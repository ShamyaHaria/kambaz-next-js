import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./Courses/reducer";
import modulesReducer from "./Courses/[cid]/Modules/reducer";
import accountReducer from "./Account/reducer";
import assignmentsReducer from "./Courses/[cid]/Assignments/reducer";
import enrollmentsReducer from "./enrollmentsReducer";
import pazzaReducer from "./Courses/[cid]/Pazza/pazzaSlice";
const store = configureStore({
  reducer: {
    coursesReducer,
    modulesReducer,
    accountReducer,
    assignmentsReducer,
    enrollmentsReducer,
    pazzaReducer,
  },
});

export default store;