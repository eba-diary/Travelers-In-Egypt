import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    navbar: [],
    index: 0
}

const preSlice = createSlice({
    name: 'pre-load',
    initialState,
    reducers: {
        createNavbar: (state, action) => {
            state.navbar = action.payload
        },
        setIndex: (state, action) => {
            state.index = action.payload
        }
    },
})

export const setIndexServerSide = (index) => {
    setIndex(index)
}

export const {
    createNavbar,
    setIndex
} = preSlice.actions

export default preSlice.reducer