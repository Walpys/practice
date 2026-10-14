import type { QueryParams } from "./common.types";

export type Category = 'WORK' | 'PERSONAL' | 'EDUCATION' | 'HEALTH' | 'HOME' | 'OTHER';
export type Priority = 'LOW' | 'MEDIUM' | 'HIGH';
export type Status = 'NEW' | 'IN_PROGRESS' | 'COMPLETED';
export type FilterMode = 'TODAY' | 'ALLTIME';


export const priorityStyles: Record<string, { border: string; bg: string; text: string; dot: string }> = {
  HIGH: {
    border: "border-l-4 border-l-danger",
    bg: "hover:bg-danger/5",
    text: "text-danger",
    dot: "bg-danger",
  },
  MEDIUM: {
    border: "border-l-4 border-l-warning",
    bg: "hover:bg-warning/5",
    text: "text-warning",
    dot: "bg-warning",
  },
  LOW: {
    border: "border-l-4 border-l-success",
    bg: "hover:bg-success/5",
    text: "text-success",
    dot: "bg-success",
  },
};

export interface TaskDetailsStatsDto {
  totalTasks: number;
  statusBreakdown: Record<string, number>;
  completedThisWeek: number;
  uncompletedThisWeek: number
  completedThisMonth: number;
  uncompletedThisMonth: number;
  categoryCompletionRates: Record<string, number>;
  overdueTasksCount: number;
}
// long totalTasks,
//         Map<String, Long> statusBreakdown,
//         long completedThisWeek,
//         long uncompletedThisWeek,
//         long completedThisMonth,
//         long uncompletedThisMonth,
//         Map<String, Double> categoryCompletionRates,
//         long overdueTasksCount

export interface TaskDetailsDto {
  id: string;
  title: string;
  description?: string;
  category: Category;
  priority: Priority;
  status: Status;
  dueDate: string;
  createdAt: string;
}
export interface TaskPartialUpdateDto {
  title?: string;
  description?: string;
  category?: Category;
  priority?: Priority;
  status?: Status;
  dueDate?: string;
}
export interface TaskStats {
  totalTasks: number;
  inProgressTasks: number;
  completedTasks: number;
}
export interface TaskCreateDto {
  title: string;
  description?: string;
  category: Category;
  priority: Priority;
  status: Status;
  dueDate: string;
}

export interface TaskFullUpdateDto extends TaskCreateDto { }

export interface TaskDetailsDto {
  id: string;
  title: string;
  description?: string;
  category: Category;
  priority: Priority;
  status: Status;
  dueDate: string;
  createdAt: string;
}

export interface TaskCreateDto {
  title: string;
  description?: string;
  category: Category;
  priority: Priority;
  status: Status;
  dueDate: string;
}

export interface TaskFullUpdateDto extends TaskCreateDto { }

export interface TaskShortDto {
  id: string;
  title: string;
  priority: Priority;
  status: Status;
  dueDate: string;
  createdAt: string;
}

export interface TaskListByUserQueryParameters extends QueryParams {
  filterMode?: FilterMode;
  categories?: Category[];
  statuses?: Status[];
  priorities?: Priority[];
}