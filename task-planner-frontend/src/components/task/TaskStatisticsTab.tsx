import BarChartIcon from '@mui/icons-material/BarChart';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useTaskStatsDetails } from '../../hooks/task/getTaskStatsDetails';

export const TaskStatisticsTab = () => {
    const { data: stats, isLoading, isError, refetch } = useTaskStatsDetails();

    if (isLoading) {
        return <TaskStatisticsSkeleton />;
    }

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
                <div className="h-16 w-16 rounded-2xl bg-danger/10 text-danger flex items-center justify-center">
                    <WarningAmberIcon sx={{ fontSize: 32 }} />
                </div>
                <div className="text-center">
                    <h3 className="text-lg font-bold text-foreground mb-1">Failed to load analytics</h3>
                    <p className="text-sm text-foreground-muted">Could not fetch statistics. Check your connection and try again.</p>
                </div>
                <button
                    onClick={() => refetch()}
                    className="flex items-center gap-2 rounded-xl bg-card border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-background-muted transition-colors"
                >
                    <RefreshIcon sx={{ fontSize: 18 }} />
                    Try Again
                </button>
            </div>
        );
    }

    const s = stats || {
        totalTasks: 0,
        statusBreakdown: {},
        completedThisWeek: 0,
        uncompletedThisWeek: 0,
        completedThisMonth: 0,
        uncompletedThisMonth: 0,
        categoryCompletionRates: {},
        overdueTasksCount: 0,
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold">Productivity & Insights</h2>
                    <p className="text-sm text-foreground-muted">Detailed overview of your task execution and workflow.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="rounded-2xl border border-border bg-card p-5 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-foreground-muted">Total Tasks</p>
                        <h3 className="text-3xl font-bold mt-1">{s.totalTasks}</h3>
                    </div>
                    <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                        <BarChartIcon />
                    </div>
                </div>

                <div className="rounded-2xl border border-border bg-card p-5 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-foreground-muted">Overdue Tasks</p>
                        <h3 className="text-3xl font-bold mt-1 text-danger">{s.overdueTasksCount}</h3>
                    </div>
                    <div className="h-12 w-12 rounded-xl bg-danger/10 text-danger flex items-center justify-center">
                        <WarningAmberIcon />
                    </div>
                </div>

                <div className="rounded-2xl border border-border bg-card p-5 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-foreground-muted">Done This Week</p>
                        <h3 className="text-3xl font-bold mt-1 text-success">{s.completedThisWeek}</h3>
                    </div>
                    <div className="h-12 w-12 rounded-xl bg-success/10 text-success flex items-center justify-center">
                        <CheckCircleIcon />
                    </div>
                </div>

                <div className="rounded-2xl border border-border bg-card p-5 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-foreground-muted">Done This Month</p>
                        <h3 className="text-3xl font-bold mt-1 text-primary">{s.completedThisMonth}</h3>
                    </div>
                    <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                        <TrendingUpIcon />
                    </div>
                </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
                <div className="flex items-center gap-2">
                    <DonutLargeIcon className="text-primary" />
                    <h3 className="font-bold text-base">Status Breakdown</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {Object.keys(s.statusBreakdown).length === 0 ? (
                        <p className="text-sm text-foreground-muted py-2">No status data available yet.</p>
                    ) : (
                        Object.entries(s.statusBreakdown).map(([status, count]) => (
                            <div key={status} className="flex items-center justify-between p-3 rounded-xl bg-background border border-border/50">
                                <span className="text-sm font-medium uppercase tracking-wider text-foreground-muted">{status}</span>
                                <span className="text-base font-bold">{count as number}</span>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
                    <h3 className="font-bold text-base">Period Breakdown</h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 rounded-xl bg-background border border-border/50">
                            <span className="text-sm font-medium">This Week (Completed / Uncompleted)</span>
                            <div className="flex items-center gap-2 text-sm font-bold">
                                <span className="text-success">{s.completedThisWeek} done</span>
                                <span className="text-foreground-muted">/</span>
                                <span className="text-warning">{s.uncompletedThisWeek} left</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-xl bg-background border border-border/50">
                            <span className="text-sm font-medium">This Month (Completed / Uncompleted)</span>
                            <div className="flex items-center gap-2 text-sm font-bold">
                                <span className="text-success">{s.completedThisMonth} done</span>
                                <span className="text-foreground-muted">/</span>
                                <span className="text-warning">{s.uncompletedThisMonth} left</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
                    <h3 className="font-bold text-base">Category Completion Rate</h3>
                    <div className="space-y-3">
                        {Object.keys(s.categoryCompletionRates).length === 0 ? (
                            <p className="text-sm text-foreground-muted text-center py-4">No category data available yet.</p>
                        ) : (
                            Object.entries(s.categoryCompletionRates).map(([category, rate]) => (
                                <div key={category} className="space-y-1">
                                    <div className="flex justify-between text-xs font-semibold">
                                        <span>{category}</span>
                                        <span>{(rate as number).toFixed(1)}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-background rounded-full overflow-hidden border border-border/50">
                                        <div
                                            className="h-full bg-primary transition-all duration-500 rounded-full"
                                            style={{ width: `${Math.min(Math.max(rate as number, 0), 100)}%` }}
                                        />
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskStatisticsTab;


const SkeletonBox = ({ className = '' }: { className?: string }) => (
    <div className={`animate-pulse rounded-xl bg-background-muted ${className}`} />
);

const TaskStatisticsSkeleton = () => (
    <div className="space-y-6">
        <div className="flex items-center justify-between">
            <div>
                <SkeletonBox className="h-6 w-48 mb-2" />
                <SkeletonBox className="h-4 w-72" />
            </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="rounded-2xl border border-border bg-card p-5 flex items-center justify-between">
                    <div className="space-y-2">
                        <SkeletonBox className="h-3.5 w-24" />
                        <SkeletonBox className="h-8 w-16 mt-1" />
                    </div>
                    <SkeletonBox className="h-12 w-12 rounded-xl" />
                </div>
            ))}
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
            <div className="flex items-center gap-2">
                <SkeletonBox className="h-5 w-5 rounded" />
                <SkeletonBox className="h-5 w-36" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-background border border-border/50">
                        <SkeletonBox className="h-4 w-20" />
                        <SkeletonBox className="h-4 w-8" />
                    </div>
                ))}
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
                <SkeletonBox className="h-5 w-36" />
                <div className="space-y-3">
                    {Array.from({ length: 2 }).map((_, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-background border border-border/50">
                            <SkeletonBox className="h-4 w-48" />
                            <SkeletonBox className="h-4 w-24" />
                        </div>
                    ))}
                </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
                <SkeletonBox className="h-5 w-44" />
                <div className="space-y-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="space-y-1">
                            <div className="flex justify-between">
                                <SkeletonBox className="h-3.5 w-24" />
                                <SkeletonBox className="h-3.5 w-10" />
                            </div>
                            <SkeletonBox className="h-2 w-full rounded-full" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);
