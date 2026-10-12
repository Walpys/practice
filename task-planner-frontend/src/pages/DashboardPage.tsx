import { useState } from 'react';
import Modal from '../components/shared/Modal';
import Button from '../components/shared/Button';
import TaskRow from '../components/task/TaskRow';
import TaskCreateTab from '../components/task/CreateTaskTab';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BarChartIcon from '@mui/icons-material/BarChart';
import AddIcon from '@mui/icons-material/Add';
import { useInfiniteTaskList } from '../hooks/task/useInfinityTaskList';
import { useTaskStats } from '../hooks/task/useTaskStats';
import { InfiniteScrollList } from '../components/shared/InfiniteScrollListProps';


export const DashboardPage = () => {
    const [currentTab, setCurrentTab] = useState<'list' | 'statistics'>('list');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteTaskList({});
    const { data: stats } = useTaskStats(); 

    const tasks = data?.pages.flatMap((page) => page.content) || [];

    return (
        <div className="flex flex-1 w-full bg-background text-foreground">
            <aside className="w-64 border-r border-border bg-card p-6 flex flex-col justify-between hidden md:flex shrink-0">
                <div>
                    <nav className="space-y-1">
                        <button
                            onClick={() => setCurrentTab('list')}
                            className={`flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${currentTab === 'list'
                                    ? 'bg-primary text-background'
                                    : 'text-foreground-muted hover:bg-background hover:text-foreground'
                                }`}
                        >
                            <AssignmentIcon fontSize="small" />
                            Tasks List
                        </button>

                        <button
                            onClick={() => setCurrentTab('statistics')}
                            className={`flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${currentTab === 'statistics'
                                    ? 'bg-primary text-background'
                                    : 'text-foreground-muted hover:bg-background hover:text-foreground'
                                }`}
                        >
                            <BarChartIcon fontSize="small" />
                            Statistics
                        </button>
                    </nav>
                </div>
            </aside>

            <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
                <header className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background/80 backdrop-blur-md px-6 py-4">
                    <div className="flex items-center gap-4">
                        <h1 className="text-2xl font-bold tracking-tight capitalize">
                            {currentTab === 'list' ? 'My Tasks Dashboard' : 'Analytics & Statistics'}
                        </h1>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button variant="fill" onClick={() => setIsCreateModalOpen(true)}>
                            <AddIcon fontSize="small" />
                            Add Task
                        </Button>
                    </div>
                </header>

                <div className="p-6 md:p-10 w-full flex-1">
                    {currentTab === 'list' ? (
                        <div className="space-y-6">
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
                        </div>
                    ) : (
                        <div className="rounded-2xl border border-border bg-card p-8 text-center">
                            <BarChartIcon className="text-primary mx-auto mb-3" sx={{ fontSize: 48 }} />
                            <h3 className="text-xl font-bold mb-2">Analytics Overview</h3>
                            <p className="text-sm text-foreground-muted max-w-md mx-auto">
                                Detailed charts and productivity metrics will be displayed here soon. Keep tracking your tasks!
                            </p>
                        </div>
                    )}
                </div>
            </main>

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

export default DashboardPage;