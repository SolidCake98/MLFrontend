import axios from "axios";

const DATASET_URL = "/api/v1/dataset";


class DataSetService {

  getAllDatasets() {
    return axios.get(DATASET_URL)
  }

  getDataset(user, dataset) {
    return axios.get(DATASET_URL + "/" + user + "/" + dataset);
  }


  readDirDataset(path, pos) {
    return axios
      .post(DATASET_URL + "/dir", {
        path,
        pos
      })
  }

  readDataSetFile(path, pos) {
    return axios
    .post(DATASET_URL + "/file", {
      path,
      pos
    })
  }
}

export default new DataSetService();