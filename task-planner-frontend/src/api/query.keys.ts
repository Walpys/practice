import type { TaskListByUserQueryParameters } from "../model/task.types";

export const authKeys = {
  all: ['auth'] as const,
  user: () => [...authKeys.all, 'user'] as const,
};

export const taskKeys = {
  all: ['tasks'] as const,
  listsBase: () => [...taskKeys.all, 'list'] as const,
  stats: () =>[...taskKeys.all, "stats"] as const,
  list: (params: TaskListByUserQueryParameters) => [...taskKeys.listsBase(), params] as const,
  detailsBase: () => [...taskKeys.all, 'detail'] as const,
  detail: (id: string) => [...taskKeys.detailsBase(), id] as const,
};

