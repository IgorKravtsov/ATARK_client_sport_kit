import {Service} from "./service";
import axios, {AxiosResponse} from "axios";
import {UserDtoResponse} from "../DTO/response/user.dto.response";
import {LocalstorageKey} from "../enums/localstorageKey.enum";


export class TrainerService extends Service {

    static async getLearnersOfTheTrainer(): Promise<AxiosResponse<UserDtoResponse[]>> {
        const token = localStorage.getItem(LocalstorageKey.USER)
        return axios.get<UserDtoResponse[]>(`${Service._apiBase}/user/trainer/learners`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    static async makeTrainerFromLearner(learnerId: number): Promise<AxiosResponse<UserDtoResponse>> {
        const token = localStorage.getItem(LocalstorageKey.USER)
        return axios.put<UserDtoResponse>(`${Service._apiBase}/user/make_trainer/${learnerId}`, {},{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

}