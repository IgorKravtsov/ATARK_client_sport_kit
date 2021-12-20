import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LoadingSatus} from "../../enums/loadingSatus.enum";
import {LearnerDtoResponse} from "../../DTO/response/learner.dto.response";


export interface UserState {
    learners: {
        data: LearnerDtoResponse[] | null
        loadingStatus: LoadingSatus
        errors: string[] | null
    }

}

const initialState: UserState = {
    learners: {
        data: null,
        loadingStatus: LoadingSatus.IDLE,
        errors: null
    },

}


const trainerSlice = createSlice({

    name: 'trainer',
    initialState,
    reducers: {
        fetchedLearners: (state, action:PayloadAction<LearnerDtoResponse[]>) => {
            state.learners.data = action.payload;
            state.learners.loadingStatus = LoadingSatus.IDLE;
            state.learners.errors = null;
        },
        fetchingLearners: (state) => {
            state.learners.loadingStatus = LoadingSatus.LOADING;
        },
        fetchingErrorLearners: (state, action: PayloadAction<string[]>) => {
            state.learners.errors = action.payload;
            state.learners.loadingStatus = LoadingSatus.ERROR;
        },
    }
});

const {actions, reducer} = trainerSlice;

export default reducer;

export const {

    fetchedLearners,
    fetchingErrorLearners,
    fetchingLearners

} = actions;