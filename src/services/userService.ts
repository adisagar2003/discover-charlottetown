import axios, { AxiosResponse } from "axios"
import api from "../utils/api"

interface LoginResponse {
    token: string;
    user: {
        id: string;
        username: string;
        email: string;
        profilePicture?: string;
    };
}

export const userService = {
        loginUser: (loginUserObj: {username: string, password: string}) : Promise<AxiosResponse<LoginResponse>> => {
            return axios.post(`${api}/api/auth/login`, {
                "username": loginUserObj.username,
                "password": loginUserObj.password
            })
        }
}
