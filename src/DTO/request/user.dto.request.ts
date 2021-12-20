import {UserRoles} from "../../enums/userRoles.enum";

export interface UserDtoRequest {
    email: string,
    password: string,
    role: UserRoles,
    name: string,
    surname: string,
    level: string,
    regionId: number,
    trainerId: number,
    organizationIds: number[]
}