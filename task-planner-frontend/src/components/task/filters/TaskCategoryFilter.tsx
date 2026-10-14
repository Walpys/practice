import type { Category } from "../../../model/task.types";
import { useTaskFilterStore } from "../../../store/useTaskFilter.store";
import { TASK_CATEGORIES } from "../../../utils/consts/task.consts";
import Checkbox from "../../shared/CheckBox";


const TaskCategoryFilter = () => {
    const { categories, toggleCategory } = useTaskFilterStore();

    return (
        <div className="flex flex-col gap-2 w-full">
            <label className="text-sm font-bold text-foreground uppercase px-1">
                Category
            </label>
            <div className="flex flex-col gap-2 px-1 w-full">
                {TASK_CATEGORIES.map((cat) => {
                    const isChecked = categories.includes(cat.value as Category);

                    return (
                        <Checkbox
                            key={cat.value}
                            label={cat.label}
                            checked={isChecked}
                            onChange={() => toggleCategory(cat.value as Category)}
                            className="font-semibold transition-all duration-150"
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default TaskCategoryFilter;