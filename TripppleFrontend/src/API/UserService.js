import $user_api from "../user_http";
export default class UserService {
  static async getuser() {
    try {
      const response = await $user_api.post(`/check_token`);
      return response;
    } catch (e) {
      localStorage.removeItem("token");
      console.log(e.response?.data?.message);
    }
  }
  static async addToBucket(id) {
    try {
      await $user_api.post(`/addtobucket`, { product_id: id });
    } catch (err) {
      console.log("Какой-то ерор в addtobucket");
    }
  }
  static async deleteFromBucket(id) {
    try {
      await $user_api.post(`/deletefrombucket`, { product_id: id });
    } catch (err) {
      console.log("Какой-то ерор в deletefrombucket");
    }
  }
  static async changeAmountItem(id, amount) {
    try {
      await $user_api.post(`/changeamountbucket`, {
        product_id: id,
        amount: amount,
      });
    } catch (err) {
      console.log("Какой-то ерор в changeAmountItem");
    }
  }
}
