import { createSlice } from "@reduxjs/toolkit";
import { courses } from "../../Database";

const initialState = {
    courses: courses,
};

const coursesSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {
        addNewCourse: (state, { payload: course }) => {
            console.log("COURSE REDUCER: Adding course", course);
            console.log("COURSE REDUCER: Courses before:", state.courses.length);
            state.courses = [...state.courses, course] as any;
            console.log("COURSE REDUCER: Courses after:", state.courses.length);
        },
        deleteCourse: (state, { payload: courseId }) => {
            state.courses = state.courses.filter(
                (course: any) => course._id !== courseId
            );
        },
        updateCourse: (state, { payload: course }) => {
            state.courses = state.courses.map((c: any) =>
                c._id === course._id ? course : c
            ) as any;
        },
    },
});

export const { addNewCourse, deleteCourse, updateCourse } = coursesSlice.actions;
export default coursesSlice.reducer;