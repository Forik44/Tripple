import axios from "axios";

import $user_api from "../user_http";

export default class AccessoryService {
  static async getAllAccessoryByUser(
    _limit,
    _page,
    _searchValue,
    _minValue,
    _maxValue
  ) {
    try {
      const response = await $user_api.get("/shop_user/", {
        params: {
          _page: _page,
          _limit: _limit,
          _searchvalue: _searchValue,
          _minprice: _minValue,
          _maxprice: _maxValue,
        },
      });
      return response;
    } catch (err) {
      throw err;
    }
  }
  static async getAllAccessory(
    _limit,
    _page,
    _searchValue,
    _minValue,
    _maxValue
  ) {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/shop/", {
        params: {
          _page: _page,
          _limit: _limit,
          _searchvalue: _searchValue,
          _minprice: _minValue,
          _maxprice: _maxValue,
        },
      });
      return response;
    } catch (err) {
      throw err;
    }
  }

  static async getAccessoryById(id) {
    try {
      if (localStorage.getItem("token")) {
        const response = await $user_api.get(
          "http://127.0.0.1:8000/api/shop_user/" + id
        );
        return response;
      } else {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/shop/" + id
        );
        return response;
      }
    } catch (err) {
      throw err;
    }
  }
  static async getConfiguration(category, accessory) {
    try {
      if (localStorage.getItem("token")) {
        const response = await $user_api.get(
          "http://127.0.0.1:8000/accessories/" + category + "/" + accessory
        );
        return response;
      } else {
        const response = await axios.get(
          "http://127.0.0.1:8000/accessories/" + category + "/" + accessory
        );
        return response;
      }
    } catch (err) {
      throw err;
    }
  }

  static async getCategory(
    _limit,
    _page,
    _searchValue,
    _minValue,
    _maxValue,
    id
  ) {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/shop/category/" + id,
        {
          params: {
            _page: _page,
            _limit: _limit,
            _searchvalue: _searchValue,
            _minprice: _minValue,
            _maxprice: _maxValue,
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  static async getCategoryByUser(
    _limit,
    _page,
    _searchValue,
    _minValue,
    _maxValue,
    id
  ) {
    try {
      const response = await $user_api.get("/shop_user/category/" + id, {
        params: {
          _page: _page,
          _limit: _limit,
          _searchvalue: _searchValue,
          _minprice: _minValue,
          _maxprice: _maxValue,
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
}
