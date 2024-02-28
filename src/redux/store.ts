import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./slice"

const store= configureStore({
    reducer:{
        data:formReducer
    }
})

export type RootState= ReturnType<typeof store.getState>;

export type AppDispatch= typeof store.dispatch

export default store