import axios, { AxiosRequestConfig } from "axios";

export const API_URL = `http://127.0.0.1:8000/api`;
const $api = axios.create({
  baseURL: API_URL,
});

//$api.interceptors.request.use((config) => {
//  config.headers = config.headers ?? {};
//  config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
//  return config;
//});

export default $api;
