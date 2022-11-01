import { makeAutoObservable } from "mobx";
import AuthService from "../API/AuthService";
import $api from "../http";

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
      localStorage.setItem("token", response.data.accessToken);
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
      localStorage.setItem("token", response.data.accessToken);
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
      const response = await $api.get(`/check_token`);
      this.setUser(response.data);
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }
}
