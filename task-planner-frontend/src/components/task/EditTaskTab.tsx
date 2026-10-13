import React, { useState, useEffect } from 'react';
import type { TaskPartialUpdateDto } from '../../model/task.types';
import { TASK_CATEGORIES, TASK_PRIORITIES, TASK_STATUSES } from '../../utils/consts/task.consts';
import { useTaskActions } from '../../hooks/task/useTaskActions';
import { ModalFooter } from '../shared/ModalFooter';
import { useTaskById } from '../../hooks/task/useTaskById';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutlined';

interface TaskEditTabProps {
    taskId: string;
    onClose: () => void;
}

export const TaskEditTab = ({ taskId, onClose }: TaskEditTabProps) => {
    const { patchTask, isPending } = useTaskActions();
    const { data: task, isLoading: isTaskLoading } = useTaskById(taskId);

    const formatInitialDueDate = (dateStr?: string) => {
        if (!dateStr) return '';
        return dateStr.slice(0, 16);
    };

    const [formData, setFormData] = useState<TaskPartialUpdateDto>({
        title: '',
        description: '',
        category: 'WORK',
        priority: 'MEDIUM',
        status: 'NEW',
        dueDate: '',
    });

    useEffect(() => {
        if (task) {
            setFormData({
                title: task.title,
                description: task.description || '',
                category: task.category,
                priority: task.priority,
                status: task.status,
                dueDate: formatInitialDueDate(task.dueDate),
            });
        }
    }, [task]);

    if (isTaskLoading) {
        return <TaskEditSkeleton />;
    }

    if (!task) {
        return (
            <div className="flex flex-col items-center justify-center py-12 gap-4">
                <div className="h-14 w-14 rounded-2xl bg-danger/10 text-danger flex items-center justify-center">
                    <ErrorOutlineIcon sx={{ fontSize: 28 }} />
                </div>
                <div className="text-center">
                    <h3 className="text-base font-bold text-foreground mb-1">Task not found</h3>
                    <p className="text-sm text-foreground-muted">This task may have been deleted or is unavailable.</p>
                </div>
            </div>
        );
    }

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!formData.title?.trim() || !formData.dueDate) return;

        const [datePart, timePart] = formData.dueDate.split('T');
        if (!datePart || !timePart) return;

        const [year, month, day] = datePart.split('-');
        const safeYear = year.length > 4 ? year.slice(-4) : year.padStart(4, '2026');
        const safeDatePart = `${safeYear}-${month}-${day}`;
        const formattedDueDate = `${safeDatePart}T${timePart}:00`;

        try {
            await patchTask({
                taskId: task.id,
                dto: {
                    ...formData,
                    dueDate: formattedDueDate,
                },
            });

            onClose();
        } catch {
        }
    };

    const formattedCreatedAt = task.createdAt
        ? new Date(task.createdAt).toLocaleString('uk-UA', {
            dateStyle: 'medium',
            timeStyle: 'short'
        })
        : null;

    return (
        <div className="flex w-full justify-center">
            <div className="w-full max-w-2xl">
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-1">
                                Task Title <span className="text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title || ''}
                                onChange={handleChange}
                                required
                                placeholder="e.g. Finish project documentation"
                                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-foreground-muted/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground mb-1">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={formData.description || ''}
                                onChange={handleChange}
                                rows={3}
                                placeholder="Add some details about the task..."
                                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-foreground-muted/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1">
                                    Category
                                </label>
                                <select
                                    name="category"
                                    value={formData.category || 'WORK'}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                >
                                    {TASK_CATEGORIES.map((cat) => (
                                        <option key={cat.value} value={cat.value}>
                                            {cat.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1">
                                    Priority
                                </label>
                                <select
                                    name="priority"
                                    value={formData.priority || 'MEDIUM'}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                >
                                    {TASK_PRIORITIES.map((prio) => (
                                        <option key={prio.value} value={prio.value}>
                                            {prio.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1">
                                    Status
                                </label>
                                <select
                                    name="status"
                                    value={formData.status || 'NEW'}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                >
                                    {TASK_STATUSES.map((status) => (
                                        <option key={status.value} value={status.value}>
                                            {status.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1">
                                    Due Date & Time
                                </label>
                                <input
                                    type="datetime-local"
                                    name="dueDate"
                                    value={formData.dueDate || ''}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary [color-scheme:dark]"
                                />
                            </div>
                        </div>

                        {formattedCreatedAt && (
                            <div className="text-xs text-foreground-muted px-1 pt-1">
                                Created at: <span className="font-medium text-foreground/80">{formattedCreatedAt}</span>
                            </div>
                        )}
                    </div>

                    <ModalFooter
                        onCancel={onClose}
                        onSave={() => handleSubmit()}
                        isSaving={isPending}
                        saveLabel="Save Changes"
                        cancelLabel="Cancel"
                    />
                </form>
            </div>
        </div>
    );
};

export default TaskEditTab;


const Sk = ({ className = '' }: { className?: string }) => (
    <div className={`animate-pulse rounded-xl bg-background-muted ${className}`} />
);

const TaskEditSkeleton = () => (
    <div className="flex w-full justify-center">
        <div className="w-full max-w-2xl flex flex-col gap-5">
            <div>
                <Sk className="h-4 w-20 mb-2" />
                <Sk className="h-10 w-full rounded-lg" />
            </div>
            <div>
                <Sk className="h-4 w-24 mb-2" />
                <Sk className="h-20 w-full rounded-lg" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Sk className="h-4 w-20 mb-2" />
                    <Sk className="h-10 w-full rounded-lg" />
                </div>
                <div>
                    <Sk className="h-4 w-16 mb-2" />
                    <Sk className="h-10 w-full rounded-lg" />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Sk className="h-4 w-14 mb-2" />
                    <Sk className="h-10 w-full rounded-lg" />
                </div>
                <div>
                    <Sk className="h-4 w-28 mb-2" />
                    <Sk className="h-10 w-full rounded-lg" />
                </div>
            </div>
            <div className="flex justify-end gap-3 mt-2">
                <Sk className="h-10 w-24 rounded-xl" />
                <Sk className="h-10 w-32 rounded-xl" />
            </div>
        </div>
    </div>
);
