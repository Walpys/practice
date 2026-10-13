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
import RefreshIcon from '@mui/icons-material/Refresh';

export const TaskListTab = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, refetch } = useTasks();
    const { data: stats, isLoading: isStatsLoading } = useTaskStats();

    const tasks = data?.pages.flatMap((page) => page.content) || [];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
                <TaskFilterPopover />
                <Button variant="fill" onClick={() => setIsCreateModalOpen(true)}>
                    <AddIcon fontSize="small" />
                    Add Task
                </Button>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {isStatsLoading ? (
                    <StatCardsSkeleton />
                ) : (
                    <>
                        <div className="rounded-2xl border border-border bg-card p-5">
                            <p className="text-sm font-medium text-foreground-muted">Total Tasks</p>
                            <h3 className="text-3xl font-bold mt-2">{stats?.totalTasks ?? 0}</h3>
                        </div>
                        <div className="rounded-2xl border border-border bg-card p-5">
                            <p className="text-sm font-medium text-foreground-muted">In Progress</p>
                            <h3 className="text-3xl font-bold mt-2">{stats?.inProgressTasks ?? 0}</h3>
                        </div>
                        <div className="rounded-2xl border border-border bg-card p-5">
                            <p className="text-sm font-medium text-foreground-muted">Completed</p>
                            <h3 className="text-3xl font-bold mt-2">{stats?.completedTasks ?? 0}</h3>
                        </div>
                    </>
                )}
            </div>

            {/* Task list with error handling */}
            {isError ? (
                <div className="flex flex-col items-center justify-center py-16 gap-4 rounded-2xl border border-border bg-card">
                    <p className="text-sm text-foreground-muted">Failed to load tasks.</p>
                    <button
                        onClick={() => refetch()}
                        className="flex items-center gap-2 rounded-xl bg-card border border-border px-4 py-2 text-sm font-semibold text-foreground hover:bg-background-muted transition-colors"
                    >
                        <RefreshIcon sx={{ fontSize: 16 }} />
                        Try Again
                    </button>
                </div>
            ) : (
                <InfiniteScrollList
                    items={tasks}
                    isLoading={isLoading}
                    loadingComponent={<TaskListSkeleton />}
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
            )}

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


const Sk = ({ className = '' }: { className?: string }) => (
    <div className={`animate-pulse rounded-xl bg-background-muted ${className}`} />
);

const StatCardsSkeleton = () => (
    <>
        {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-5">
                <Sk className="h-3.5 w-24 mb-3" />
                <Sk className="h-8 w-16" />
            </div>
        ))}
    </>
);

const TaskRowSkeleton = () => (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4">
        <div className="flex w-full items-center gap-3">
            <Sk className="flex-1 h-8 rounded-lg" />
            <Sk className="h-9 w-[130px] rounded-lg shrink-0" />
            <Sk className="h-8 w-8 rounded-lg shrink-0" />
        </div>
        <div className="h-px w-full bg-border/50" />
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Sk className="h-7 w-[90px] rounded-md shrink-0" />
            <Sk className="h-9 w-[230px] rounded-lg" />
        </div>
    </div>
);

const TaskListSkeleton = () => (
    <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
            <TaskRowSkeleton key={i} />
        ))}
    </div>
);