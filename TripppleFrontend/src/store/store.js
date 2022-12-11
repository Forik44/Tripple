import { makeAutoObservable } from "mobx";
import AuthService from "../API/AuthService";
import UserService from "../API/UserService";

export default class Store {
  user = {};
  isAuth = false;
  minPrice = 0;
  category = 0;
  maxPrice = 99999;
  page = 1;
  tempSearch = "";
  actualSearch = "";
  loader = false;
  supportAlertIsOpen = false;
  supportAlertMessage = "";
  alertVariant = false;

  constructor() {
    makeAutoObservable(this);
  }
  setAlertIsOpen(bool) {
    this.supportAlertIsOpen = bool;
    if (!bool) {
      this.supportAlertMessage = "";
    }
  }
  setAlertMessage(str) {
    this.supportAlertMessage = str;
  }
  setAlertVariant(bool) {
    this.alertVariant = true;
  }
  setLoader(bool) {
    this.loader = bool;
  }
  setTempSearch(str) {
    this.tempSearch = str;
  }
  setActualSearch(str) {
    this.actualSearch = str;
  }
  setPage(page) {
    this.page = page;
  }
  setAuth(bool) {
    this.isAuth = bool;
  }
  setUser(user) {
    this.user = user;
  }
  setCategory(id) {
    this.category = id;
  }

  setMinPrice(price) {
    this.minPrice = price;
  }

  setMaxPrice(price) {
    this.maxPrice = price;
  }

  async appendBucketItem(id) {
    try {
      await UserService.addToBucket(id);
    } catch (err) {
      this.setAlertMessage(err.message);
      this.setAlertVariant(false);
      this.setAlertIsOpen(true);
    }
  }
  async deleteBucketItem(id) {
    try {
      await UserService.deleteFromBucket(id);
    } catch (err) {
      this.setAlertMessage(err.message);
      this.setAlertVariant(false);
      this.setAlertIsOpen(true);
    }
  }
  async changeAmountInBucket(id, amount) {
    try {
      await UserService.changeAmountItem(id, amount);
    } catch (err) {
      this.setAlertMessage(err.message);
      this.setAlertVariant(false);
      this.setAlertIsOpen(true);
    }
  }

  async login(email, password, google) {
    try {
      const response = await AuthService.login(email, password, google);
      localStorage.setItem("token", response.data.token);
      this.setAuth(true);
    } catch (err) {
      this.setAlertMessage(err.message);
      this.setAlertVariant(false);
      this.setAlertIsOpen(true);
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
    } catch (err) {
      this.setAlertMessage(String(err.response.data));
      this.setAlertVariant(false);
      this.setAlertIsOpen(true);
    }
  }
  async logout() {
    localStorage.removeItem("token");
    this.setAuth(false);
    this.setUser({});
  }
  async getUser() {
    try {
      const response = await UserService.getuser();
      this.setUser(response.data);
      this.setAuth(true);
    } catch (err) {
      localStorage.removeItem("token");
      this.setAlertMessage(err.message);
      this.setAlertVariant(false);
      this.setAlertIsOpen(true);
    }
  }
}
