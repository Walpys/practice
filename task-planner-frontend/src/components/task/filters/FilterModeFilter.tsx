import type { FilterMode } from "../../../model/task.types";
import { useTaskFilterStore } from "../../../store/useTaskFilter.store";
import type { Option } from "../../../utils/types/Option";


const modes: Option[] = [
    { label: "All Time", value: "ALLTIME" },
    { label: "Today", value: "TODAY" },
];

const TaskFilterModeControl = () => {
    const { filterMode, setFilterMode } = useTaskFilterStore();

    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-foreground uppercase px-1">
                Timeframe
            </label>
            <div className="flex bg-background border border-border rounded-xl p-1 gap-1">
                {modes.map((mode) => {
                    const isActive = filterMode === mode.value;

                    return (
                        <button
                            key={mode.value}
                            type="button"
                            onClick={() => setFilterMode(mode.value as FilterMode)}
                            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${isActive
                                    ? "bg-primary text-background shadow-sm"
                                    : "text-foreground-muted hover:text-foreground hover:bg-border/50"
                                }`}
                        >
                            {mode.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default TaskFilterModeControl;