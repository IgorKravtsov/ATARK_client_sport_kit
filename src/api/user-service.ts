import axios, {AxiosResponse} from 'axios';
import {Service} from "./service";
import {UserDtoResponse} from "../DTO/response/user.dto.response";
import {UserDtoRequest} from "../DTO/request/user.dto.request";
import {LocalstorageKey} from "../enums/localstorageKey.enum";
import {OrganizationDtoResponse} from "../DTO/response/organization.dto.response";

export class UserService extends Service {

    static async register(newUser: UserDtoRequest): Promise<AxiosResponse<{ token: string }>>  {
        return axios.post<{ token: string }>(`${Service._apiBase}/user/registration`, {...newUser})
    }

    static async login(email: string, password: string): Promise<AxiosResponse<{ token: string }>> {
        const body = {email, password}
        return axios.post<{ token: string }>(`${Service._apiBase}/user/login`, body)
    }

    static async checkAuth() {

    }

    static async getTrainers(): Promise<AxiosResponse<UserDtoResponse[]>> {
        return axios.get<UserDtoResponse[]>(`${Service._apiBase}/user/trainers`);
    }

    static async getTrainersByRegion(regionId: number): Promise<AxiosResponse<UserDtoResponse[]>> {
        return axios.get<UserDtoResponse[]>(`${Service._apiBase}/user/trainers/${regionId}`);
    }

    static async getUserOrganizations(): Promise<AxiosResponse<OrganizationDtoResponse[]>> {
        const token = localStorage.getItem(LocalstorageKey.USER)
        return axios.get<OrganizationDtoResponse[]>(`${Service._apiBase}/user/organizations`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

}