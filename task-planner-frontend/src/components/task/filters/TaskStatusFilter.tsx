
import type { Status } from "../../../model/task.types";
import { useTaskFilterStore } from "../../../store/useTaskFilter.store";
import { TASK_STATUSES } from "../../../utils/consts/task.consts";
import Checkbox from "../../shared/CheckBox";



const TaskStatusFilter = () => {
    const { statuses, toggleStatus } = useTaskFilterStore();

    return (
        <div className="flex flex-col gap-2 w-full">
            <label className="text-sm font-bold text-foreground uppercase px-1">
                Status
            </label>
            <div className="flex flex-col gap-2 px-1 w-full">
                {TASK_STATUSES.map((s) => {
                    const isChecked = statuses.includes(s.value as Status);

                    return (
                        <Checkbox
                            key={s.value}
                            label={s.label}
                            checked={isChecked}
                            onChange={() => toggleStatus(s.value as Status)}
                            className="font-semibold transition-all duration-150"
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default TaskStatusFilter;