import { useState } from 'react';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BarChartIcon from '@mui/icons-material/BarChart';
import TaskListTab from '../components/task/TaskListTab';
import TaskStatisticsTab from '../components/task/TaskStatisticsTab';

type TabType = 'list' | 'statistics';

const TAB_COMPONENTS: Record<TabType, React.FC> = {
    list: TaskListTab,
    statistics: TaskStatisticsTab,
};

const TAB_TITLES: Record<TabType, string> = {
    list: 'My Tasks Dashboard',
    statistics: 'Analytics & Statistics',
};

export const DashboardPage = () => {
    const [currentTab, setCurrentTab] = useState<TabType>('list');

    const ActiveComponent = TAB_COMPONENTS[currentTab];

    return (
        <div className="flex flex-1 w-full bg-background text-foreground min-h-screen">
            <DashboardSidebar currentTab={currentTab} onSelectTab={setCurrentTab} />

            <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
                <header className="sticky top-0 z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-border bg-background/80 backdrop-blur-md px-6 py-4 gap-4">
                    <h1 className="text-2xl font-bold tracking-tight capitalize">
                        {TAB_TITLES[currentTab]}
                    </h1>

                    <div className="flex md:hidden items-center gap-2 bg-card p-1 rounded-xl border border-border">
                        <button
                            onClick={() => setCurrentTab('list')}
                            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${currentTab === 'list'
                                    ? 'bg-primary text-background'
                                    : 'text-foreground-muted hover:text-foreground'
                                }`}
                        >
                            <AssignmentIcon fontSize="small" />
                            Tasks
                        </button>
                        <button
                            onClick={() => setCurrentTab('statistics')}
                            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${currentTab === 'statistics'
                                    ? 'bg-primary text-background'
                                    : 'text-foreground-muted hover:text-foreground'
                                }`}
                        >
                            <BarChartIcon fontSize="small" />
                            Statistics
                        </button>
                    </div>
                </header>

                <div className="p-6 md:p-10 w-full flex-1">
                    <ActiveComponent />
                </div>
            </main>
        </div>
    );
};

interface DashboardSidebarProps {
    currentTab: TabType;
    onSelectTab: (tab: TabType) => void;
}

const DashboardSidebar = ({ currentTab, onSelectTab }: DashboardSidebarProps) => (
    <aside className="w-64 border-r border-border bg-card p-6 flex-col justify-between hidden md:flex shrink-0">
        <div>
            <nav className="space-y-1">
                <button
                    onClick={() => onSelectTab('list')}
                    className={`flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors cursor-pointer ${currentTab === 'list'
                            ? 'bg-primary text-background'
                            : 'text-foreground-muted hover:bg-background hover:text-foreground'
                        }`}
                >
                    <AssignmentIcon fontSize="small" />
                    Tasks List
                </button>

                <button
                    onClick={() => onSelectTab('statistics')}
                    className={`flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors cursor-pointer ${currentTab === 'statistics'
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
);

export default DashboardPage;