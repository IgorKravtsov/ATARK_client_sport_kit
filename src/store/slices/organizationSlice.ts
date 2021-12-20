import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {OrganizationDtoResponse} from "../../DTO/response/organization.dto.response";
import {LoadingSatus} from "../../enums/loadingSatus.enum";


export interface OrganizationState {
    userOrganizations: {
        data: OrganizationDtoResponse[] | null
        loadingStatus: LoadingSatus
        errors: string[] | null
    }

}

const initialState: OrganizationState = {
    userOrganizations: {
        data: null,
        loadingStatus: LoadingSatus.IDLE,
        errors: null
    }
}

const userSlice = createSlice({

    name: 'organization',
    initialState,
    reducers: {
        organizationFetched: (state, action:PayloadAction<OrganizationDtoResponse[]>) => {
            state.userOrganizations.data = action.payload;
            state.userOrganizations.loadingStatus = LoadingSatus.IDLE;
            state.userOrganizations.errors = null;
        },
        organizationFetching: (state) => {
            state.userOrganizations.loadingStatus = LoadingSatus.LOADING;
        },
        organizationFetchingError: (state, action: PayloadAction<string[]>) => {
            state.userOrganizations.errors = action.payload;
            state.userOrganizations.loadingStatus = LoadingSatus.ERROR;
        },
    }
});

const {actions, reducer} = userSlice;

export default reducer;

export const {

    organizationFetched,
    organizationFetching,
    organizationFetchingError

} = actions;