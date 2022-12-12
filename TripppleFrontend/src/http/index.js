import axios from "axios";
import { API_URL } from "./../user_http/index";

const $api = axios.create({
  baseURL: API_URL,
});

export default $api;
