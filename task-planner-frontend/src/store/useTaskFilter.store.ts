import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Category, FilterMode, Priority, Status } from '../model/task.types';
import type { SortOrder } from '../model/common.types';

export type TaskSortType = 'dueTo' | 'priority' | 'createdAt';

interface TaskFilterState {
    filterMode: FilterMode;
    categories: Category[];
    statuses: Status[];
    priorities: Priority[];
    order: SortOrder;
    sortBy: TaskSortType;

    setSortBy: (sortType: TaskSortType) => void;
    toggleOrder: () => void;
    setFilterMode: (filterMode: FilterMode) => void;
    toggleCategory: (category: Category) => void;
    toggleStatus: (status: Status) => void;
    togglePriority: (priority: Priority) => void;
    resetFilters: () => void;
}

export const useTaskFilterStore = create<TaskFilterState>()(
    persist(
        (set) => ({
            filterMode: 'ALLTIME',
            categories: [],
            statuses: [],
            sortBy: 'createdAt',
            priorities: [],
            order: "asc",

            setFilterMode: (filterMode) => set({ filterMode }),
            setSortBy: (sortBy) => set({ sortBy }),

            toggleCategory: (category) => set((state) => ({
                categories: state.categories.includes(category)
                    ? state.categories.filter((c) => c !== category)
                    : [...state.categories, category]
            })),

            toggleOrder: () => set((state) => ({
                order: state.order === 'asc' ? 'desc' : 'asc'
            })),

            toggleStatus: (status) => set((state) => ({
                statuses: state.statuses.includes(status)
                    ? state.statuses.filter((s) => s !== status)
                    : [...state.statuses, status]
            })),

            togglePriority: (priority) => set((state) => ({
                priorities: state.priorities.includes(priority)
                    ? state.priorities.filter((p) => p !== priority)
                    : [...state.priorities, priority]
            })),

            resetFilters: () => set({
                filterMode: 'ALLTIME',
                categories: [],
                statuses: [],
                priorities: [],
                sortBy: 'createdAt',
                order: "asc",
            }),
        }),
        {
            name: 'task-filters-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                filterMode: state.filterMode,
                categories: state.categories,
                statuses: state.statuses,
                priorities: state.priorities,
                sortBy: state.sortBy,
                order: state.order,
            }),
        }
    )
);