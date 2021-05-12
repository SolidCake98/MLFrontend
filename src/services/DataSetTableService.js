import axios from "axios";
// import authHeader from "./AuthHeader";

const DATASETTABLE_URL = "/api/v1/dataset_table";


class DataSetTableService {

  getDatasetTable(id) {
    return axios.get(DATASETTABLE_URL + "/" + id);
  }

  getAllTypes() {
    return axios.get(DATASETTABLE_URL + "/types");
  }
}

export default new DataSetTableService();