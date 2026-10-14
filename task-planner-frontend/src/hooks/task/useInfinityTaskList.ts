import { useInfiniteQuery } from "@tanstack/react-query";
import type { TaskListByUserQueryParameters } from "../../model/task.types";
import { taskKeys } from "../../api/query.keys";
import { taskService } from "../../api/task.service";

export const useInfiniteTaskList = (
    params: TaskListByUserQueryParameters,
    enabled: boolean = true
) => {
    const queryKey = taskKeys.list(params);

    return useInfiniteQuery({
        queryKey,
        queryFn: ({ pageParam }) => {
            const page = typeof pageParam === 'number' ? pageParam : 0;

            return taskService.getMyTasks({
                ...params,
                page: page,
            });
        },
        getNextPageParam: (lastPage) => {
            if (!lastPage || lastPage.last) {
                return undefined;
            }
            return lastPage.number + 1;
        },
        initialPageParam: 0,
        staleTime: 1000 * 60 * 5,
        enabled,
    });
};