import {AppDispatch} from "../../../index";
import {organizationFetched, organizationFetchingError, organizationFetching} from "../../organizationSlice";
import {UserService} from "../../../../api/user-service";


export const getOrganizations = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(organizationFetching())
        const learners = await UserService.getUserOrganizations()
        dispatch(organizationFetched(learners.data))
    } catch (e: any) {
        if(!Array.isArray(e.response.data.message)) {
            dispatch(organizationFetchingError([e.response.data.message]));
        } else {
            dispatch(organizationFetchingError(e.response.data.message || e.message));
        }
    }

}