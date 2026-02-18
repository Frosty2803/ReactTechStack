import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useLogoutUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (token: string) => {
      const response = await fetch("/logout", {
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