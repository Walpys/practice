import { useQuery } from "@tanstack/react-query";
import { taskService } from "../../api/task.service";
import { taskKeys } from "../../api/query.keys";

export const useTaskById = (taskId: string) => {
  return useQuery({
    queryKey: taskKeys.detail(taskId),
    queryFn: () => taskService.getTaskById(taskId),
    enabled: Boolean(taskId),
  });
};