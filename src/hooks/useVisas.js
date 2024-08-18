import { useQuery } from "@tanstack/react-query";
import { getVisas } from "../services/visaService";

export const useVisas = (queryParams = {}) => {
  return useQuery({
    queryKey: ["visas", queryParams],
    queryFn: () => getVisas(queryParams),
  });
};
