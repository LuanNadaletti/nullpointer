import Cookies from "js-cookie";
import api from "../api/api";
import SignUpModel from "../models/signUpModel";

export function signUp(signUpModel: SignUpModel): Promise<string> {
  return api
    .post("/users/register", signUpModel)
    .then((response) => {
      const token = response.data;

      Cookies.set("token", token, { secure: true });
      return token;
    })
    .catch((err) => {
      console.error(err);
    });
}
