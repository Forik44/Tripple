import axios from "axios";

export const API_URL = `http://127.0.0.1:8000/api`;
let $user_api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: localStorage.getItem("token"),
  },
});

$user_api.interceptors.request.use((config) => {
  config.headers = config.headers ?? {};
  config.headers["Authorization"] = localStorage.getItem("token");
  return config;
});

export default $user_api;
