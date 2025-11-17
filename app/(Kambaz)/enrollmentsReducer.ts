import { createSlice } from "@reduxjs/toolkit";

interface Enrollment {
    _id: string;
    user: string;
    course: string;
}

interface EnrollmentsState {
    enrollments: Enrollment[];
}

const initialState: EnrollmentsState = {
    enrollments: [],
};

const enrollmentsSlice = createSlice({
    name: "enrollments",
    initialState,
    reducers: {
        setEnrollments: (state, action) => {
            state.enrollments = action.payload;
        },
        addEnrollment: (state, action) => {
            console.log("REDUCER: Adding enrollment", action.payload);
            console.log("REDUCER: Enrollments before:", state.enrollments.length);
            state.enrollments = [
                ...state.enrollments,
                action.payload
            ];
            console.log("REDUCER: Enrollments after:", state.enrollments.length);
        },
        removeEnrollment: (state, action) => {
            state.enrollments = state.enrollments.filter(
                (enrollment) => enrollment._id !== action.payload
            );
        },
    },
});

export const { setEnrollments, addEnrollment, removeEnrollment } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;