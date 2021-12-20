import {fetchedLearners, fetchingLearners} from "../../trainerSlice";
import {AppDispatch} from "../../../index";
import {fetchingErrorUser} from "../../userSlice";
import {TrainerService} from "../../../../api/trainer-service";


export const getLearners = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(fetchingLearners())
        const learners = await TrainerService.getLearnersOfTheTrainer()
        dispatch(fetchedLearners(learners.data))
    } catch (e: any) {
        if(!Array.isArray(e.response.data.message)) {
            dispatch(fetchingErrorUser([e.response.data.message]));
        } else {
            dispatch(fetchingErrorUser(e.response.data.message || e.message));
        }
    }

}