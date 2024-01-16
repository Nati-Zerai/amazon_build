import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:5001/build-dfdda/us-central1/api", // the API (cloud function) URL
});

export default instance;
