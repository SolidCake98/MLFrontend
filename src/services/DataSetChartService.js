import axios from "axios";
// import authHeader from "./AuthHeader";


const DATASETCHART_URL = "/api/v1/dataset_chart";


class DataSetChartService {

  getData(path, type_id, col1_id, col2_id) {
    return axios
      .post(DATASETCHART_URL + "/calculate", {
        path,
        type_id,
        col1_id,
        col2_id
      })
  }

  getTypes() {
    return axios.get(DATASETCHART_URL + "/type");
  }

}

export default new DataSetChartService();