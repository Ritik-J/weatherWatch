import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useLocalStorage from "./useLocalStorage";

export interface favoriteCity {
  id: string;
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
  addedAt: number;
}
export default function useFavorite() {
  const [favorite, setFavorite] = useLocalStorage<favoriteCity[]>(
    "favorite",
    []
  );

  const queryClient = useQueryClient();

  const favoriteQuery = useQuery({
    queryKey: ["favorite"],
    queryFn: () => favorite,
    initialData: favorite,
    staleTime: Infinity,
  });

  const addFavorite = useMutation({
    mutationFn: async (city: Omit<favoriteCity, "id" | "addedAt">) => {
      const newFav: favoriteCity = {
        ...city,
        id: `${city.lat}-${city.lon}`,
        addedAt: Date.now(),
      };
      const exists = favorite.some((fav) => fav.id === newFav.id);
      if (exists) return favorite;

      const newFavorites = [...favorite, newFav];
      setFavorite(newFavorites);
      return newFavorites;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorite"] });
    },
  });

  const removeFavorite = useMutation({
    mutationFn: async (cityId: string) => {
      const newFavorites = favorite.filter((city) => city.id !== cityId);
      setFavorite(newFavorites);
      return newFavorites;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorite"] });
    },
  });

  return {
    favorite: favoriteQuery.data,
    addFavorite,
    removeFavorite,
    isFavorite: (lat: number, lon: number) =>
      favorite.some((city) => city.lat === lat && city.lon === lon),
  };
}
