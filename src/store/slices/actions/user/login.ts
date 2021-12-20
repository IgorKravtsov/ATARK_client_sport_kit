import {AppDispatch} from "../../../index";
import {fetchedUser, fetchingUser, fetchingErrorUser} from "../../userSlice";
import {UserService} from "../../../../api/user-service";
import jwtDecode from 'jwt-decode';
import {LocalstorageKey} from "../../../../enums/localstorageKey.enum";
import {IGetUserData, IUser} from "../../../../interfaces/user.interface";


export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(fetchingUser());
        const res = await UserService.login(email, password);
        localStorage.setItem(LocalstorageKey.USER, res.data.token);
        const user: IUser = jwtDecode(res.data.token);
        dispatch(fetchedUser(user))
    } catch (e: any) {
        if(!Array.isArray(e.response.data.message)) {
            dispatch(fetchingErrorUser([e.response.data.message]));
        } else {
            dispatch(fetchingErrorUser(e.response.data.message || e.message));
        }
    }

}