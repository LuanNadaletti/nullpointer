import api from "../api/api";
import AuthResponse from "../models/authenticationResponse";
import SignInModel from "../models/signInModel";
import SignUpModel from "../models/signUpModel";
import { AuthUser } from "../models/user";

/**
 * Performs user authentication (login)
 * 
 * @param signInModel - User credentials (username and password)
 * @returns Promise with authentication data or error
 */
export async function singIn(signInModel: SignInModel): Promise<AuthUser> {
  try {
    const response = await api.post<AuthResponse>('/users/authenticate', signInModel);

    return {
      id: response.data.id,
      username: response.data.username,
    };
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Authentication failed');
    } else {
      throw new Error('Network error');
    }
  }
}

/**
 * Performs user registration (sign up)
 * 
 * @param signUpModel User data to be registered
 * @returns Promise with success or error
 */
export async function signUp(signUpModel: SignUpModel): Promise<string> {
  try {
    const response = await api.post('/users/register', signUpModel);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Registration failed');
    } else {
      throw new Error('Network error');
    }
  }
}

/**
 * Logs out the user
 */
export async function signOut(): Promise<void> {
  try {
    await api.post('/users/logout');
  } catch (error: any) {
    console.error('Error during sign out: ', error)
  }
}

/**
 * Checks if the user is authenticated
 * 
 * @returns true if authenticated, false otherwise
 */
export async function isAuthenticated(): Promise<AuthUser> {
  try {
    const user = await api.get("/users/check-auth");
    return user.data;
  } catch (error: any) {
    throw error;
  }
}