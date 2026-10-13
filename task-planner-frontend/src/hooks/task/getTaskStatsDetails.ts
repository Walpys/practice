import { useQuery } from "@tanstack/react-query";
import { taskKeys } from "../../api/query.keys";
import { taskService } from "../../api/task.service";


export const useTaskStatsDetails = () => {
  return useQuery({
    queryKey: taskKeys.statsDetails(),
    queryFn: () => taskService.getTaskStatsDetails(),
  });
};