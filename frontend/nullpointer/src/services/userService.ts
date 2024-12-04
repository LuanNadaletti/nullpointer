import api from "../api/api";
import { User, UserStats } from "../models/user";

export async function getUserById(id: string): Promise<User> {
    try {
        const response = await api.get(`/users/${id}`);
        return response.data;
      } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to fetch the user.");
      }
}

export async function getUserStats(id: string): Promise<UserStats> {
  try {
    const response = await api.get(`/users/${id}/stats`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch the user's stats.");
  }
}

export async function updateUser(userId: number, userData: Partial<User>) {
  const response = await api.patch(`/users/${userId}`, userData);
  return response.data;
}