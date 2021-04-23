import axios from "axios";
import authHeader from "./AuthHeader";


const DATASET_URL = "/api/v1/dataset";


class DataSetService {

  getAllDatasets() {
    return axios.get(DATASET_URL)
  }

  getNewDatasets() {
    return axios.get(DATASET_URL + "/new")
  }

  getPopularDatasets() {
    return axios.get(DATASET_URL + "/popular")
  }

  getDataset(user, dataset) {
    return axios.get(DATASET_URL + "/" + user + "/" + dataset);
  }

  getYourDatasets() {
    return axios.get(DATASET_URL + "/owner", {headers: authHeader()});
  }

  getDatasetsByTitle(word) {
    return axios.post(DATASET_URL + "/search", {word});
  }

  getDatasetsByTags(tags) {
    return axios.post(DATASET_URL + "/search/tag", {tags});
  }

  getTagsByName(word) {
    return axios.post(DATASET_URL + "/tag", {word});
  }

  readDirDataset(path, pos, filter) {
    return axios
      .post(DATASET_URL + "/dir", {
        path,
        pos,
        filter
      })
  }

  readDataSetFile(path, pos) {
    return axios
    .post(DATASET_URL + "/file", {
      path,
      pos
    })
  }

  addTags(id, tags) {
    return axios
    .post(DATASET_URL + "/add_tags", {  
      id,
      tags
    }, {headers: authHeader()})
  }

  sendRating(id, commentary, rating) {
    return axios
    .post(DATASET_URL + "/rating", {
      id,
      commentary,
      rating
    }, {headers: authHeader()})
  }
}

export default new DataSetService();