import { useState } from 'react';
import Button from '../shared/Button';
import TaskRow from '../../components/task/TaskRow';
import TaskFilterPopover from '../../components/task/filters/TaskFilterPopover';
import { useTasks } from '../../hooks/task/useTasks';
import { useTaskStats } from '../../hooks/task/useTaskStats';
import { InfiniteScrollList } from '../shared/InfiniteScrollListProps';
import Modal from '../shared/Modal';
import TaskCreateTab from '../../components/task/CreateTaskTab';
import AddIcon from '@mui/icons-material/Add';

export const TaskListTab = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useTasks();
    const { data: stats } = useTaskStats();

    const tasks = data?.pages.flatMap((page) => page.content) || [];

    return (
        <div className="space-y-6">
            {/* Кнопка відкриття поповера фільтрів та створення таски над списком або в шапці */}
            <div className="flex items-center justify-between gap-4">
                <TaskFilterPopover />
                <Button variant="fill" onClick={() => setIsCreateModalOpen(true)}>
                    <AddIcon fontSize="small" />
                    Add Task
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-2xl border border-border bg-card p-5">
                    <p className="text-sm font-medium text-foreground-muted">Total Tasks</p>
                    <h3 className="text-3xl font-bold mt-2">{stats?.totalTasks ?? 0}</h3>
                </div>
                <div className="rounded-2xl border border-border bg-card p-5">
                    <p className="text-sm font-medium text-foreground-muted">In Progress</p>
                    <h3 className="text-3xl font-bold mt-2">
                        {stats?.inProgressTasks ?? 0}
                    </h3>
                </div>
                <div className="rounded-2xl border border-border bg-card p-5">
                    <p className="text-sm font-medium text-foreground-muted">Completed</p>
                    <h3 className="text-3xl font-bold mt-2">
                        {stats?.completedTasks ?? 0}
                    </h3>
                </div>
            </div>

            <InfiniteScrollList
                items={tasks}
                isLoading={isLoading}
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
                fetchNextPage={fetchNextPage}
                getKey={(task) => task.id}
                renderItem={(task) => <TaskRow key={task.id} task={task} />}
                emptyComponent={
                    <div className="rounded-2xl border border-border bg-card p-8 text-center">
                        <h3 className="text-lg font-semibold mb-1">Your task list is ready</h3>
                        <p className="text-sm text-foreground-muted max-w-sm mx-auto mb-6">
                            Manage your daily routine, categorize goals, and track your progress seamlessly.
                        </p>
                        <Button
                            variant="text-only"
                            onClick={() => setIsCreateModalOpen(true)}
                            className="mx-auto"
                        >
                            + Create your first task
                        </Button>
                    </div>
                }
            />

            <Modal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                title="Create New Task"
                maxWidth="max-w-xl"
            >
                <TaskCreateTab onClose={() => setIsCreateModalOpen(false)} />
            </Modal>
        </div>
    );
};

export default TaskListTab;