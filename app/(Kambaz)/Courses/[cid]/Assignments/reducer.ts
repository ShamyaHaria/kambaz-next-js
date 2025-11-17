import { createSlice } from "@reduxjs/toolkit";

interface Assignment {
    _id: string;
    title: string;
    course: string;
    description: string;
    availableDate: string;
    dueDate: string;
    points: number;
    editing?: boolean;
}

interface AssignmentsState {
    assignments: Assignment[];
}

const initialState: AssignmentsState = {
    assignments: [],
};

const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        setAssignments: (state, action) => {
            state.assignments = action.payload;
        },
        addAssignment: (state, action) => {
            state.assignments = [
                ...state.assignments,
                action.payload,
            ];
        },
        deleteAssignment: (state, action) => {
            state.assignments = state.assignments.filter(
                (assignment) => assignment._id !== action.payload
            );
        },
        updateAssignment: (state, action) => {
            state.assignments = state.assignments.map((assignment) =>
                assignment._id === action.payload._id ? action.payload : assignment
            );
        },
        editAssignment: (state, action) => {
            state.assignments = state.assignments.map((assignment) =>
                assignment._id === action.payload ? { ...assignment, editing: true } : assignment
            );
        },
    },
});

export const { setAssignments, addAssignment, deleteAssignment, updateAssignment, editAssignment } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;