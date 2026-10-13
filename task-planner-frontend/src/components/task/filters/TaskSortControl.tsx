
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import type { Option } from "../../../utils/types/Option";
import { useTaskFilterStore, type TaskSortType } from "../../../store/useTaskFilter.store";
import Button from "../../shared/Button";


const sortOptions: Option[] = [
    { label: "Due Date", value: "dueTo" },
    { label: "Priority", value: "priority" },
    { label: "Date Added", value: "createdAt" },
];

const TaskSortControl = () => {
    const { sortBy, setSortBy, order, toggleOrder } = useTaskFilterStore();

    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-foreground uppercase px-1">
                Sort by
            </label>
            <div className="flex gap-2">
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as TaskSortType)}
                    className="flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                >
                    {sortOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
                <Button
                    variant="outline"
                    onClick={toggleOrder}
                    className="px-4 bg-card/10 hover:bg-transparent-muted-hover rounded-xl transition-colors"
                >
                    {order === "asc" ? (
                        <KeyboardArrowUpIcon
                            className="text-primary hover:text-primary-hover"
                            sx={{ strokeWidth: 2, fontSize: 24 }}
                        />
                    ) : (
                        <KeyboardArrowDownIcon
                            className="text-primary hover:text-primary-hover"
                            sx={{ strokeWidth: 2, fontSize: 24 }}
                        />
                    )}
                </Button>
            </div>
        </div>
    );
};

export default TaskSortControl;