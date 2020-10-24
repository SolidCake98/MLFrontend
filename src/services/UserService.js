import axios from "axios";
//import authHeader from "./auth.header";

const API_URL = "/api/v1/";

class UserService {

  getUser(id) {
    return axios.get(API_URL + "user/" + id);
  }

  getAllUsers() {
    return axios.get(API_URL + "user");
  }

  getAllDatasets() {
    return axios.get(API_URL + "dataset")
  }

  getDataset(user, dataset) {
    return axios.get(API_URL + "dataset/" + user + "/" + dataset);
  }

  downloadDataset(user, data) {
    return axios({
      url: API_URL + "dataset/download/" + user + "/" + data,
      method: 'GET',
      onDownloadProgress: function(progressEvent) {
        console.log(progressEvent);
      },
      responseType: 'blob',
    });
  }

  readDirDataset(path, pos) {
    return axios
        .post(API_URL + "dataset/dir", {
            path,
            pos
        })
  }

}

export default new UserService();