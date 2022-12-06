import $user_api from "../user_http";
export default class ConfiguratorService {
  static async getAccess(index, data) {
    try {
      const response = await $user_api.post("/configurator/", {
        index: index,
        data: data,
      });
      return response;
    } catch (err) {
      throw err;
    }
  }
}
