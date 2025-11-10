import { createSlice } from "@reduxjs/toolkit";
import * as db from "../../../Database";

const initialState = {
    assignments: db.assignments,
};

const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        addAssignment: (state, action) => {
            state.assignments = [
                ...state.assignments,
                { ...action.payload, _id: new Date().getTime().toString() },
            ];
        },
        deleteAssignment: (state, action) => {
            state.assignments = state.assignments.filter(
                (assignment: any) => assignment._id !== action.payload
            );
        },
        updateAssignment: (state, action) => {
            state.assignments = state.assignments.map((assignment: any) =>
                assignment._id === action.payload._id ? action.payload : assignment
            );
        },
        setAssignment: (state, action) => {
            state.assignments = state.assignments.map((assignment: any) =>
                assignment._id === action.payload._id ? action.payload : assignment
            );
        },
    },
});

export const { addAssignment, deleteAssignment, updateAssignment, setAssignment } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;