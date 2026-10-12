import type { Category, Priority, Status } from "../../model/task.types";

export const TASK_CATEGORIES: { value: Category; label: string }[] = [
    { value: 'WORK', label: 'Work' },
    { value: 'PERSONAL', label: 'Personal' },
    { value: 'EDUCATION', label: 'Education' },
    { value: 'HEALTH', label: 'Health' },
    { value: 'HOME', label: 'Home' },
    { value: 'OTHER', label: 'Other' },
];

export const TASK_PRIORITIES: { value: Priority; label: string }[] = [
    { value: 'LOW', label: 'Low' },
    { value: 'MEDIUM', label: 'Medium' },
    { value: 'HIGH', label: 'High' },
];

export const TASK_STATUSES: { value: Status; label: string }[] = [
    { value: 'NEW', label: 'New' },
    { value: 'IN_PROGRESS', label: 'In Progress' },
    { value: 'COMPLETED', label: 'Completed' },
];