import { useQuery } from "@tanstack/react-query";

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async (token) => {
      const response = await fetch("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to load Users");
      return response.json();
    },
    staleTime: 1000 * 60 * 5, 
  });
};