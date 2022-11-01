import { makeAutoObservable } from "mobx";
import AuthService from "../API/AuthService";
import $user_api from "../user_http";

export default class Store {
  user = {};
  isAuth = false;

  constructor() {
    makeAutoObservable(this);
  }
  setAuth(bool) {
    this.isAuth = bool;
  }
  setUser(user) {
    this.user = user;
  }
  async login(email, password) {
    try {
      const response = await AuthService.login(email, password);
      console.log(response);
      localStorage.setItem("token", `Bearer ${response.data.token}`);
      this.setAuth(true);
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }
  async registration(email, password, name, lastName, phone) {
    try {
      const response = await AuthService.registration(
        email,
        password,
        name,
        lastName,
        phone
      );
      localStorage.setItem("token", response.data.token);
      this.setAuth(true);
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }
  async logout() {
    localStorage.removeItem("token");
    this.setAuth(false);
    this.setUser({});
  }
  async getUser() {
    try {
      const response = await $user_api.post(`/check_token`);
      this.setUser(response.data);
      this.setAuth(true);
    } catch (e) {
      localStorage.removeItem("token");
      console.log(e.response?.data?.message);
    }
  }
}
