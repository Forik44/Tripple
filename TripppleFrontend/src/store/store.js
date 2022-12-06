import { makeAutoObservable } from "mobx";
import AuthService from "../API/AuthService";
import UserService from "../API/UserService";

export default class Store {
  user = {};
  isAuth = false;
  minPrice = 0;
  maxPrice = 99999;

  constructor() {
    makeAutoObservable(this);
  }
  setAuth(bool) {
    this.isAuth = bool;
  }
  setUser(user) {
    this.user = user;
  }
  setMinPrice(price){
    this.minPrice=price
  }
  setMaxPrice(price){
    this.maxPrice = price
  }
  async appendBucketItem(id) {
    // this.user.bucket.push({ id: id, amount: 1 });
    await UserService.addToBucket(id);
  }
  async deleteBucketItem(id) {
    // this.user.bucket = this.user.bucket.filter((inf) => inf["id"] != id);
    await UserService.deleteFromBucket(id);
  }
  async changeAmountInBucket(id, amount) {
    // let index = this.user.bucket.findIndex((obj) => obj.id == id);
    // this.user.bucket[index].amount = amount;
    await UserService.changeAmountItem(id, amount);
  }

  async login(email, password, google) {
    try {
      const response = await AuthService.login(email, password, google);
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
      const response = await UserService.getuser();
      this.setUser(response.data);
      this.setAuth(true);
    } catch (e) {
      localStorage.removeItem("token");
      console.log(e.response?.data?.message);
    }
  }
}
