import axios from "axios";
//import authHeader from "./auth.header";

const API_URL = "/api/v1/";

class UserService {

    getUser(id){
        return axios.get(API_URL + "user/" + id);
    }

    getAllUsers(){
        return axios.get(API_URL + "user");
    }
}

export default new UserService();