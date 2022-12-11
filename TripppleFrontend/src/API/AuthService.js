import $api from "../http";

export default class AuthService {
  static async login(email, password, google) {
    try {
      return $api.post("/login", { email, password, g: google });
    } catch (err) {
      throw err;
    }
  }
  static async registration(email, password, name, lastName, phone) {
    try {
      return $api.post("/register", {
        email,
        password,
        name,
        lastName,
        phone,
      });
    } catch (err) {
      throw err;
    }
  }
}
