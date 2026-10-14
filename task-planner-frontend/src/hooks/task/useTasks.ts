
import { useTaskFilterStore } from '../../store/useTaskFilter.store';
import { useInfiniteTaskList } from './useInfinityTaskList';

export const useTasks = () => {
    const { filterMode, categories, statuses, priorities, sortBy, order } = useTaskFilterStore();

    return useInfiniteTaskList({
        filterMode,
        categories: categories.length > 0 ? categories : undefined,
        statuses: statuses.length > 0 ? statuses : undefined,
        priorities: priorities.length > 0 ? priorities : undefined,
        sortBy,
        order,
    });
};