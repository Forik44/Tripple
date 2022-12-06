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
  static async postAccess(choosen) {
    try {
      const response = await $user_api.post("/configurator_post", {
        choosen: choosen,
      });
      return response;
    } catch (err) {
      throw err;
    }
  }
}
