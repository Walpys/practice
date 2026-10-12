import { useMutation, useQueryClient, type InfiniteData } from "@tanstack/react-query";
import type { TaskCreateDto, TaskFullUpdateDto, TaskPartialUpdateDto, TaskShortDto } from "../../model/task.types";
import { taskService } from "../../api/task.service";
import { notify } from "../../components/shared/Notify";
import { taskKeys } from "../../api/query.keys";
import type { PageResponse } from "../../model/common.types";
import { updateInfiniteQuery } from "../../utils/helpers/UpdateInfinityQuery";

export const useTaskActions = () => {
    const queryClient = useQueryClient();
    const listsBaseQueryKey = taskKeys.listsBase();

    const mutationConfig = {
        onError: () => {
            notify.error('Something went wrong');
        },
    };

    const createMutation = useMutation({
        ...mutationConfig,
        mutationFn: (dto: TaskCreateDto) => taskService.createTask(dto),

        onMutate: async (newTaskData) => {
            await queryClient.cancelQueries({ queryKey: listsBaseQueryKey, exact: false });
            
            queryClient.setQueriesData<InfiniteData<PageResponse<TaskShortDto>>>(
                { queryKey: listsBaseQueryKey, exact: false },
                (oldData) => {
                    if (!oldData) return undefined;

                    const optimisticTask: TaskShortDto = {
                        id: 'temp-task-id-' + Date.now(),
                        title: newTaskData.title || 'New Task',
                        priority: newTaskData.priority,
                        status: newTaskData.status,
                        dueDate: newTaskData.dueDate,
                        createdAt: new Date().toISOString(),
                    };

                    return updateInfiniteQuery<PageResponse<TaskShortDto>, TaskShortDto>({
                        oldData,
                        getContent: (page) => page.content,
                        setContent: (page, newContent) => ({ ...page, content: newContent }),
                        updater: (allItems) => [optimisticTask, ...allItems],
                    });
                }
            );
        },

        onError: () => {
            queryClient.invalidateQueries({ queryKey: taskKeys.all, exact: false });
            notify.error('Failed to create task.');
        },

        onSuccess: () => {
            notify.success('Task created successfully!');
            queryClient.invalidateQueries({ queryKey: listsBaseQueryKey, exact: false });
            queryClient.invalidateQueries({ queryKey: taskKeys.stats(), exact: false });
        },
    });

    const updateMutation = useMutation({
        ...mutationConfig,
        mutationFn: ({ taskId, dto }: { taskId: string; dto: TaskFullUpdateDto }) =>
            taskService.updateTask(taskId, dto),
        onSuccess: (_, variables) => {
            notify.success('Task updated successfully!');
            queryClient.invalidateQueries({ queryKey: taskKeys.all, exact: false });
            queryClient.invalidateQueries({ queryKey: taskKeys.detail(variables.taskId) });
        },
    });

    const patchMutation = useMutation({
        ...mutationConfig,
        mutationFn: ({ taskId, dto }: { taskId: string; dto: TaskPartialUpdateDto }) =>
            taskService.patchTask(taskId, dto),

        onMutate: async ({ taskId, dto }) => {
            await queryClient.cancelQueries({ queryKey: listsBaseQueryKey, exact: false });

            const previousData = queryClient.getQueriesData({ queryKey: listsBaseQueryKey, exact: false });

            queryClient.setQueriesData<InfiniteData<PageResponse<TaskShortDto>>>(
                { queryKey: listsBaseQueryKey, exact: false },
                (oldData) => {
                    if (!oldData) return undefined;

                    return updateInfiniteQuery<PageResponse<TaskShortDto>, TaskShortDto>({
                        oldData,
                        getContent: (page) => page.content,
                        setContent: (page, newContent) => ({ ...page, content: newContent }),
                        updater: (allItems) =>
                            allItems.map((task) =>
                                task.id === taskId ? { ...task, ...dto } : task
                            ),
                    });
                }
            );

            return { previousData };
        },

        onError: (err, variables, context) => {
            if (context?.previousData) {
                context.previousData.forEach(([queryKey, data]) => {
                    queryClient.setQueryData(queryKey, data);
                });
            }
            notify.error('Failed to update task.');
        },

        onSuccess: (_, variables) => {
            notify.success('Task updated successfully!');
            queryClient.invalidateQueries({ queryKey: taskKeys.all, exact: false });
            queryClient.invalidateQueries({ queryKey: taskKeys.detail(variables.taskId) });
        },
    });

    const deleteMutation = useMutation({
        ...mutationConfig,
        mutationFn: (taskId: string) => taskService.deleteTask(taskId),
        onSuccess: () => {
            notify.info('Task deleted');
            queryClient.invalidateQueries({ queryKey: listsBaseQueryKey, exact: false });
        },
    });

    return {
        createTask: createMutation.mutateAsync,
        updateTask: updateMutation.mutateAsync,
        patchTask: patchMutation.mutateAsync,
        deleteMutation: deleteMutation.mutateAsync,
        isPending: createMutation.isPending || updateMutation.isPending || patchMutation.isPending || deleteMutation.isPending,
    };
};