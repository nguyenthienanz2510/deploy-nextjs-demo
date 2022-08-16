import axios from "axios";
import { BASE_URL, TOKEN_CYBERSOFT } from "./configURL";
import { localStorageService } from "./localStorageService";

export const userService = {
  postLogin: (dataLogin) => {
    return axios({
      method: "POST",
      url: `https://apitest.travelner.com/frontend/test/login`,
      data: dataLogin,
    });
  },
  patchMyAccountInfo: (data) => {
    return axios.patch(
      "https://apitest.travelner.com/frontend/test/myacount",
      data
    );
  },
};
