import axios from "axios";

export default class AccesoryService {
  static async getAllAccessory(_limit, _page) {
    const response = await axios.get("http://127.0.0.1:8000/api/shop/", {
      params: {
        _page: _page,
        _limit: _limit,
      },
    });
    return response;
  }

  static async getAccessoryById(id) {
    const response = await axios.get("http://127.0.0.1:8000/api/shop/" + id);
    return response;
  }
}
