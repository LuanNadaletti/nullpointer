import Cookies from "js-cookie";
import api from "../api/api";
import SignInModel from "../models/signInModel";
import SignUpModel from "../models/signUpModel";

/***
 * 
 * @param signUpModel
 * @returns Promise with the response or error
 */
export async function signUp(signUpModel: SignUpModel): Promise<string> {
  return api
    .post("/users/register", signUpModel)
    .then((response) => {
      return response.data;
    }).catch((error) => {
      if (error.response) {
        throw new Error(error.response.data.message || 'Registration failed');
      } else {
        throw new Error('Network error');
      }
    });
}

export function singIn(singInModel: SignInModel): Promise<boolean> {
  return api
    .post("/users/login", singInModel)
    .then((response) => {
      setToken(response.data);

      return true;
    });
}

function setToken(token: string): void {
  Cookies.set("tkn", token, { secure: true });
}