import { useQuery } from "@tanstack/react-query";
import { getApplications } from "../services/applicationService";

export const useApplications = () => {
  return useQuery({
    queryKey: ["applications"],
    queryFn: getApplications,
  });
};
