import $api from "../http";
import { AxiosResponse } from "axios";

export default class AuthService {
  static async login(email, password) {
    return $api.post("/login", { email, password });
  }
  static async registration(email, password, name, lastName, phone) {
    return $api.post("/registration", {
      email,
      password,
      name,
      lastName,
      phone,
    });
  }
}
