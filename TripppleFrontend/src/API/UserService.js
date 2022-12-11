import $user_api from "../user_http";
export default class UserService {
  static async getuser() {
    try {
      const response = await $user_api.post(`/check_token`);
      return response;
    } catch (err) {
      throw err;
    }
  }
  static async addToBucket(id) {
    try {
      await $user_api.post(`/addtobucket`, { product_id: id });
    } catch (err) {
      throw err;
    }
  }
  static async deleteFromBucket(id) {
    try {
      await $user_api.post(`/deletefrombucket`, { product_id: id });
    } catch (err) {
      throw err;
    }
  }
  static async changeAmountItem(id, amount) {
    try {
      await $user_api.post(`/changeamountbucket`, {
        product_id: id,
        amount: amount,
      });
    } catch (err) {
      throw err;
    }
  }
  static async getBasket() {
    try {
      const response = await $user_api.get("/get_basket");
      return response;
    } catch (err) {
      throw err;
    }
  }
}
