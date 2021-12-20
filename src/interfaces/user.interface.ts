import {UserRoles} from "../enums/userRoles.enum";
import {LoadingSatus} from "../enums/loadingSatus.enum";

export interface IUser {
    id: number;
    email: string;
    role: UserRoles;
}

export interface IGetUserData {
    data: IUser | null
    loadingStatus: LoadingSatus
    errors: string[] | null;
}