import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LoadingSatus} from "../../enums/loadingSatus.enum";
import {IGetUserData, IUser} from "../../interfaces/user.interface";

export interface UserState {
    user: IGetUserData

}

const initialState: UserState = {
    user: {} as IGetUserData,

}

const userSlice = createSlice({

    name: 'user',
    initialState,
    reducers: {
        fetchedUser: (state, action:PayloadAction<IUser>) => {
            state.user.data = action.payload;
            state.user.loadingStatus = LoadingSatus.IDLE;
            state.user.errors = null;
        },
        fetchingUser: (state) => {
            state.user.loadingStatus = LoadingSatus.LOADING;
        },
        fetchingErrorUser: (state, action: PayloadAction<string[]>) => {
            state.user.errors = action.payload;
            state.user.loadingStatus = LoadingSatus.ERROR;
        },
        setUserFromLocalStorage: (state, action: PayloadAction<IUser | null>) => {
            state.user.data = action.payload;
        },
        nullingErrorData: state => {
            state.user.loadingStatus = LoadingSatus.IDLE
            state.user.errors = null
        },
        logout: state => {
            state.user.data = null;
        }
    }
});

const {actions, reducer} = userSlice;

export default reducer;

export const {

    fetchingUser,
    fetchingErrorUser,
    fetchedUser,
    setUserFromLocalStorage,
    nullingErrorData,
    logout,

} = actions;