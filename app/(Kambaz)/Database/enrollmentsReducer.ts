import { createSlice } from "@reduxjs/toolkit";
import * as db from "./index";

const initialState = {
    enrollments: db.enrollments,
};

const enrollmentsSlice = createSlice({
    name: "enrollments",
    initialState,
    reducers: {
        addEnrollment: (state, action) => {
            console.log("REDUCER: Adding enrollment", action.payload);
            console.log("REDUCER: Enrollments before:", state.enrollments.length);
            state.enrollments = [
                ...state.enrollments,
                {
                    _id: new Date().getTime().toString(),
                    user: action.payload.user,
                    course: action.payload.course
                }
            ];
            console.log("REDUCER: Enrollments after:", state.enrollments.length);
        },
    },
});

export const { addEnrollment } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;