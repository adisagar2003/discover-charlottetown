import axios, { AxiosResponse } from "axios"
import api from "../utils/api"


export const userService = {
        loginUser: (loginUserObj: {username: string, password: string}) : Promise<AxiosResponse<any, any>> => {
            return axios.post(`${api}/api/auth/login`, {
                "username": loginUserObj.username,
                "password": loginUserObj.password
            })
        }
}
