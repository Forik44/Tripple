import $api from "../http";
import { AxiosResponse } from "axios";

export default class AuthService {
  static async login(email, password, google) {
    return $api.post("/login", { email, password, g: google });
  }
  static async registration(email, password, name, lastName, phone) {
    return $api.post("/register", {
      email,
      password,
      name,
      lastName,
      phone,
    });
  }
}
