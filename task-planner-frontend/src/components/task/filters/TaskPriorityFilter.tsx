import type { Priority } from "../../../model/task.types";
import { useTaskFilterStore } from "../../../store/useTaskFilter.store";
import { TASK_PRIORITIES } from "../../../utils/consts/task.consts";
import Checkbox from "../../shared/CheckBox";


const TaskPriorityFilter = () => {
    const { priorities, togglePriority } = useTaskFilterStore();

    return (
        <div className="flex flex-col gap-2 w-full">
            <label className="text-sm font-bold text-foreground uppercase px-1">
                Priority
            </label>
            <div className="flex flex-col gap-2 px-1 w-full">
                {TASK_PRIORITIES.map((prio) => {
                    const isChecked = priorities.includes(prio.value as Priority);

                    return (
                        <Checkbox
                            key={prio.value}
                            label={prio.label}
                            checked={isChecked}
                            onChange={() => togglePriority(prio.value as Priority)}
                            className="font-semibold transition-all duration-150"
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default TaskPriorityFilter;