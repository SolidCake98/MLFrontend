import axios from "axios";

const API_URL = "/api/v1/jwt/"
const AUTH_URL = API_URL + "/auth"
const REG_URL = API_URL + "/register"

class AuthService {

    login(username, password) {
        return axios
        .post(AUTH_URL, {
            username,
            password
        })
        .then(response => {
            if(response.data.access_token) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
    }

    //TODO сделать запрос /logout
    logout() {
        localStorage.removeItem("user");
    }

    register(username, email, password) {
        return axios
        .post(REG_URL, {
            username,
            email,
            password
        })
        .then(response => {
            return response.data;
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem("user"));
    }
}

export default new AuthService();