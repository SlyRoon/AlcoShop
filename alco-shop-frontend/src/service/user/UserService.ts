import $api from "../../http"
import { Axios, AxiosResponse } from "axios"
import { AuthResponse } from "../../models/response/AuthResponse"
import { IUser } from "../../models/user/IUser"

export default class UserService {
  static fetchUsers(): Promise<AxiosResponse<IUser[]>>{
        return $api.get<IUser[]>('/users')
  }
}

