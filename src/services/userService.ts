import axios from "axios"
import api from "../utils/api"

export const userService = {
    loginUser: Promise<any> async (username, password) :  => {
        axios.post(`${api}/api/auth/login`, {
            "username": username,
            "password": password
        })
    }
}