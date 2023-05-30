import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    navbar: []
}

const preSlice = createSlice({
    name: 'pre-load',
    initialState,
    reducers: {
        createNavbar: (state, action) => {
            state.navbar = action.payload
        }
    },
})

export const {
    createNavbar
} = preSlice.actions

export default preSlice.reducer