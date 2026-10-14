import React from 'react';
import {
    type TaskShortDto,
    type TaskPartialUpdateDto,
    priorityStyles,
} from '../../model/task.types';
import { TASK_STATUSES } from '../../utils/consts/task.consts';
import { useTaskActions } from '../../hooks/task/useTaskActions';
import { useEditableField } from '../../hooks/shared/useEditableField';
import TaskActionDropdown from './TaskActionsMenu';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

interface TaskRowProps {
    task: TaskShortDto;
}

export const TaskRow: React.FC<TaskRowProps> = ({ task }) => {
    const { patchTask, isPending } = useTaskActions();

    const patch = (dto: TaskPartialUpdateDto) =>
        patchTask({ taskId: task.id, dto });

    const title = useEditableField(task.title, (v) =>
        patch({ title: v }),
    );

    const dueDate = useEditableField(
        task.dueDate ? task.dueDate.slice(0, 16) : '',
        (v) => patch({ dueDate: v.length === 16 ? `${v}:00` : v }),
    );

    const isOverdue = task.dueDate
        ? new Date(task.dueDate).getTime() < Date.now() &&
        task.status !== 'COMPLETED'
        : false;

    const priorityConfig = task.priority
        ? priorityStyles[task.priority]
        : null;

    return (
        <div
            className={`
                flex flex-col gap-3
                rounded-xl border border-border bg-card p-4
                transition-all hover:border-primary/50
                ${isPending
                    ? 'pointer-events-none opacity-70'
                    : ''
                }
                ${isOverdue
                    ? 'border-l-4 border-l-danger'
                    : priorityConfig?.border || ''
                }
            `}
        >
            <div className="flex w-full min-w-0 items-center gap-3">
                <input
                    type="text"
                    value={title.value}
                    onChange={(e) => title.setValue(e.target.value)}
                    onBlur={() =>
                        title.value.trim()
                            ? title.save()
                            : title.setValue(task.title)
                    }
                    className="
                        min-w-0 flex-1 rounded-lg border border-transparent
                        bg-transparent px-2 py-1.5
                        text-sm font-semibold text-foreground
                        placeholder:text-foreground-muted/50
                        hover:border-border
                        focus:border-primary focus:outline-none
                        focus:ring-1 focus:ring-primary
                    "
                    placeholder="Task title..."
                />

                <div className="flex shrink-0 items-center gap-2">
                    <select
                        value={task.status}
                        onChange={(e) =>
                            patch({
                                status: e.target.value as any,
                            }).catch(() => { })
                        }
                        className="
                            h-9 max-w-[130px] rounded-lg
                            border border-border bg-background
                            px-2.5 text-xs font-medium text-foreground
                            focus:border-primary focus:outline-none
                            focus:ring-1 focus:ring-primary
                        "
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

            <div className="h-px w-full bg-border/50" />

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                {isOverdue ? (
                    <div
                        className="
                inline-flex h-7 w-[90px] shrink-0
                items-center justify-center gap-1
                rounded-md bg-danger/10
                text-xs font-semibold text-danger
            "
                    >
                        <WarningAmberIcon sx={{ fontSize: 14 }} />
                        <span>Overdue</span>
                    </div>
                ) : (
                    <span
                        className="
                flex h-7 w-[90px] shrink-0
                items-center justify-center
                text-xs font-medium text-foreground-muted
            "
                    >
                        Due date
                    </span>
                )}

                <input
                    type="datetime-local"
                    value={dueDate.value}
                    onChange={(e) => dueDate.setValue(e.target.value)}
                    onBlur={() => dueDate.save()}
                    className="
            h-9 w-full max-w-[230px] min-w-0
            rounded-lg border border-border
            bg-background px-2.5
            text-xs text-foreground
            focus:border-primary focus:outline-none
            focus:ring-1 focus:ring-primary
            [color-scheme:dark]
        "
                />
            </div>
        </div>
    );
};

export default TaskRow;