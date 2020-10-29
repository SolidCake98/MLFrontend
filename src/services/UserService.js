import axios from "axios";
//import authHeader from "./auth.header";

const USER_URL = "/api/v1/user/";

class UserService {

  getUser(id) {
    return axios.get(USER_URL + id);
  }

  getAllUsers() {
    return axios.get(USER_URL);
  }

}

export default new UserService();