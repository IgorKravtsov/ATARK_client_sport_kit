import {configureStore} from "@reduxjs/toolkit";
import userReducer from './slices/userSlice';
import trainerReducer from './slices/trainerSlice';
import organizationReducer from './slices/organizationSlice';


export const store = configureStore({
    reducer: {
        user: userReducer,
        trainer: trainerReducer,
        organizations: organizationReducer
    },
    middleware: (getDefaultMiddleware) => {
        return  getDefaultMiddleware().concat()
    },
    devTools: process.env.NODE_ENV !== 'production'
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;