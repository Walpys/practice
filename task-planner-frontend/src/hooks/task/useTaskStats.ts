import { useQuery } from "@tanstack/react-query";
import { taskKeys } from "../../api/query.keys";
import { taskService } from "../../api/task.service";


export const useTaskStats = () => {
  return useQuery({
    queryKey: taskKeys.stats(),
    queryFn: () => taskService.getTaskStats(),
  });
};