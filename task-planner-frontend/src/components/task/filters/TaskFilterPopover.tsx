import { FilterPopover } from "../../shared/FilterPopover";
import TuneIcon from "@mui/icons-material/Tune";
import TaskFilters from "./TaskFilter";

export const TaskFilterPopover = () => {
    return (
        <FilterPopover
            title="Filter Tasks"
            align="end"
            side="bottom"
            trigger={
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-card text-foreground text-sm font-medium hover:border-primary transition-colors cursor-pointer">
                    <TuneIcon sx={{ fontSize: 18 }} />
                    <span>Filters</span>
                </button>
            }
        >
            <TaskFilters />
        </FilterPopover>
    );
};

export default TaskFilterPopover;