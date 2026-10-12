import type { QueryParams } from "./common.types";

export type Category = 'WORK' | 'PERSONAL' | 'EDUCATION' | 'HEALTH' | 'HOME' | 'OTHER';
export type Priority = 'LOW' | 'MEDIUM' | 'HIGH';
export type Status = 'NEW' | 'IN_PROGRESS' | 'COMPLETED';
export type FilterMode = 'TODAY' | 'ALLTIME';

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