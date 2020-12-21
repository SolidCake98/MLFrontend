import axios from "axios";
import authHeader from "./AuthHeader";
//import authHeader from "./auth.header";

const USER_URL = "/api/v1/user/";

class UserService {

  addToGroup(username, groupname) {
    return axios
      .post(USER_URL + "/group", {
          username, 
          groupname}, 
        {headers: authHeader()})
  }

  getUser(id) {
    return axios.get(USER_URL + id);
  }

  getNotUserGroups(id) {
    return axios.get(USER_URL + "/groups/excluded/" + id)
  }

  getUserProfile(id) {
    return axios.get(USER_URL + "/profile/" + id)
  }

  getAllUserProfile() {
    return axios.get(USER_URL + "/profile")
  }

  getAllUsers() {
    return axios.get(USER_URL);
  }

}

export default new UserService();