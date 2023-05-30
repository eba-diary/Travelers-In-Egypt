import { configureStore } from '@reduxjs/toolkit'
import preSlice from './slice/preSlice'


const store = configureStore({
    reducer: {
        pre: preSlice
    }
})

export default store