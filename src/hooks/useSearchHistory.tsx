import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useLocalStorage from "./useLocalStorage";

interface searchHistory {
  id: string;
  query: string;
  lat: number;
  lon: number;
  name: string;
  country: string;
  state?: string;
  searchAt: number;
}
export default function useSearchHistory() {
  const [history, setHistory] = useLocalStorage<searchHistory[]>(
    "search-history",
    []
  );

  const historyQuery = useQuery({
    queryKey: ["search-history"],
    queryFn: () => history,
    initialData: history,
  });

  const queryClient = useQueryClient();

  const addHistory = useMutation({
    mutationFn: async (search: Omit<searchHistory, "id" | "searchAt">) => {
      const newSearch: searchHistory = {
        ...search,
        id: `${search.lat}-${search.lon}-${Date.now()}`,
        searchAt: Date.now(),
      };

      const filterHistory = history.filter(
        (item) => !(item.lat === search.lat && item.lon === search.lon)
      );

      const newHistory = [newSearch, ...filterHistory].slice(0, 10);

      setHistory(newHistory);
      return newHistory;
    },
    onSuccess: (newHistory) => {
      queryClient.setQueryData(["search-history"], newHistory);
    },
  });

  const clearHistory = useMutation({
    mutationFn: async () => {
      setHistory([]);
      return [];
    },
    onSuccess: () => {
      queryClient.setQueryData(["search-history"], []);
    },
  });

  return {
    history: historyQuery.data ?? [],
    addHistory,
    clearHistory,
  };
}
