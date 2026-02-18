import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BASE_URL } from "../constants";

export const useLogoutUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (token: string) => {
      const response = await fetch(API_BASE_URL + "/logout", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to Logout User");
      return response.json();
    },
    onSuccess: (data, variables, result) => {
      console.log('Internal onSuccess Callback:', data, variables, result);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};