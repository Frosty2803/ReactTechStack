import type { RegisterInput } from "@react-tech-stack/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BASE_URL } from "../constants";

export const useLoginUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (user: RegisterInput) => {
      const response = await fetch(API_BASE_URL + "/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (!response.ok) throw new Error("Failed to Login User");
      return response.json();
    },
    onSuccess: (data, variables, result) => {
      console.log('Internal onSuccess Callback:', data, variables, result);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};