import {LocalstorageKey} from "../enums/localstorageKey.enum";
import jwtDecode from "jwt-decode";
import {IUser} from "../interfaces/user.interface";


export const decodeToken = (): IUser | null => {
    const localstorageUser = localStorage.getItem(LocalstorageKey.USER);
    if(!localstorageUser) {
        return null
    }
    return jwtDecode<IUser>(localstorageUser);
}