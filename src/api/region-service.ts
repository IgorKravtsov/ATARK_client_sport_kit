import {Service} from "./service";
import axios, {AxiosResponse} from "axios";
import {RegionDtoResponse} from "../DTO/response/region.dto.response";


export class RegionService extends Service {

    static async getAll(): Promise<AxiosResponse<RegionDtoResponse[]>>  {
        return axios.get<RegionDtoResponse[]>(`${Service._apiBase}/region`)
    }


}