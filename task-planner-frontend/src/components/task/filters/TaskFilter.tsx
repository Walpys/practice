import TaskSortControl from "./TaskSortControl";
import TaskStatusFilter from "./TaskStatusFilter";
import TaskCategoryFilter from "./TaskCategoryFilter";
import TaskPriorityFilter from "./TaskPriorityFilter";
import { useTaskFilterStore } from "../../../store/useTaskFilter.store";
import TaskFilterModeControl from "./FilterModeFilter";

export const TaskFilters = () => {
    const { resetFilters } = useTaskFilterStore();

    return (
        <div className="flex flex-col gap-6 p-4 rounded-2xl border border-border bg-card w-full max-w-sm">
            <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-foreground">Filters & Sorting</h3>
                <button
                    onClick={resetFilters}
                    className="text-xs font-medium text-foreground-muted hover:text-primary transition-colors cursor-pointer"
                >
                    Reset all
                </button>
            </div>
            <TaskFilterModeControl />

            <hr className="border-border/60" />

            <TaskSortControl />

            <hr className="border-border/60" />

            <TaskStatusFilter />

            <hr className="border-border/60" />

            <TaskCategoryFilter />

            <hr className="border-border/60" />

            <TaskPriorityFilter />
        </div>
    );
};

export default TaskFilters;