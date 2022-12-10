import axios from "axios";
import { API_URL } from "./../user_http/index";

const $api = axios.create({
  baseURL: API_URL,
});

//$api.interceptors.request.use((config) => {
//  config.headers = config.headers ?? {};
//  config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
//  return config;
//});

export default $api;
