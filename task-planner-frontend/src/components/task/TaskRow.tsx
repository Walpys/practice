import React from 'react';
import type { TaskShortDto, Status, TaskPartialUpdateDto } from '../../model/task.types';
import { TASK_STATUSES } from '../../utils/consts/task.consts';
import { useTaskActions } from '../../hooks/task/useTaskActions';
import { useEditableField } from '../../hooks/shared/useEditableField';
import TaskActionDropdown from './TaskActionsMenu';

interface TaskRowProps {
    task: TaskShortDto;
}

export const TaskRow: React.FC<TaskRowProps> = ({ task }) => {
    const { patchTask, isPending } = useTaskActions();

    const patch = (dto: TaskPartialUpdateDto) => patchTask({ taskId: task.id, dto });

    const title = useEditableField(task.title, (v) => patch({ title: v }));
    const dueDate = useEditableField(
        task.dueDate ? task.dueDate.slice(0, 16) : '',
        (v) => patch({ dueDate: v.length === 16 ? `${v}:00` : v }),
    );

    return (
        <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50 ${isPending ? 'opacity-70 pointer-events-none' : ''}`}>
            <div className="flex-1 w-full sm:w-auto">
                <input
                    type="text"
                    value={title.value}
                    onChange={(e) => title.setValue(e.target.value)}
                    onBlur={() => (title.value.trim() ? title.save() : title.setValue(task.title))}
                    className="w-full bg-transparent font-medium text-foreground placeholder:text-foreground-muted/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary rounded px-2 py-1 border border-transparent hover:border-border"
                    placeholder="Task title..."
                />
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                <input
                    type="datetime-local"
                    value={dueDate.value}
                    onChange={(e) => dueDate.setValue(e.target.value)}
                    onBlur={() => dueDate.save()}
                    className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary [color-scheme:dark]"
                />

                <select
                    value={task.status}
                    onChange={(e) => patch({ status: e.target.value as Status }).catch(() => { })}
                    className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                >
                    {TASK_STATUSES.map((s) => (
                        <option key={s.value} value={s.value}>
                            {s.label}
                        </option>
                    ))}
                </select>

                <TaskActionDropdown taskId={task.id} />
            </div>
        </div>
    );
};

export default TaskRow;