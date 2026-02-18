import type { RegisterInput } from "@react-tech-stack/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useRegisterUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newUser: RegisterInput) => {
      const response = await fetch("/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      if (!response.ok) throw new Error("Failed to Register User");
      return response.json();
    },
    onSuccess: (data, variables, result) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      console.log(data, variables, result);
    },
  });
};