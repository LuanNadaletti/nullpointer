import Cookies from "js-cookie";
import api from "../api/api";
import SignUpModel from "../models/signUpModel";

export function signUp(signUpModel: SignUpModel): Promise<string> {
  return api
    .post("/auth/signup", signUpModel)
    .then((response) => {
      const token = response.data;

      Cookies.set("token", token, { secure: true });
      return token;
    })
    .catch((err) => {
      console.error(err);
    });
}
