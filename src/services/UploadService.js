import axios from 'axios';
import authHeader from "./AuthHeader";

const API_URL = "/api/v1/";
const UPLOAD_URL = API_URL + "dataset/upload"

class UploadService {

    upload(file, data, callback) {
        let form = new FormData();
        form.append('dataset', file);

        const json = JSON.stringify(data);
        const blob = new Blob([json], {
            type: 'application/json',
        });
        form.append('document', blob);

        return axios
        .post(UPLOAD_URL, form, {headers: authHeader(), onUploadProgress: function(progressEvent){
           callback(progressEvent); 
        }})
    }
}

export default new UploadService();