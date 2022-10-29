import axios from "axios";
import { Params } from "react-router-dom";

export default class AccesoryService {
  // static async getAllAccessory(limit, page) {
  //   const response = await axios.get("http://127.0.0.1:8000/api/shop/", {
  //     params: {
  //       _page: page,
  //       _limit: limit,
  //     },
  //   });
  //   return response;
  // }
  static async getAllAccessory() {
    const response = await axios.get("http://127.0.0.1:8000/api/shop/");
    return response;
  }

  static async getAccessoryById(id) {
    const response = await axios.get("http://127.0.0.1:8000/api/shop/" + id);
    return response;
  }
}
