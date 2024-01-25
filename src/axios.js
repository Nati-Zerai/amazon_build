import axios from "axios";

const instance = axios.create({
  // the API (cloud function) URL
  baseURL: "http://127.0.0.1:5001/build-dfdda/us-central1/api", 
});

export default instance;
