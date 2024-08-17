import { useQuery } from "@tanstack/react-query";
import { getApplications } from "../services/appService";

export const useApplications = (queryParams = {}) => {
  return useQuery({
    queryKey: ["applications", queryParams],
    queryFn: () => getApplications(queryParams),
  });
};
