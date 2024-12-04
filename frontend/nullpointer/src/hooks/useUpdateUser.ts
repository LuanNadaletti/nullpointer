import { useMutation } from "@tanstack/react-query";
import { User } from "../models/user";
import { updateUser } from "../services/userService";

export function useUpdateUser() {
    return useMutation({
        mutationFn: (data: { userId: number, userData: Partial<User> }) =>
            updateUser(data.userId, data.userData),
        onSuccess: () => { },
        onError: (error: any) => {
            console.error("Error updating user:", error);
        }
    });
}