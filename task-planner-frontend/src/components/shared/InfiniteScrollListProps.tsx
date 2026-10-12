import React from "react";
import { InfiniteScrollLoader } from "./InfinityLoader";

interface InfiniteScrollListProps<T> {
    items: T[];
    renderItem: (item: T, index: number) => React.ReactNode;
    getKey: (item: T, index: number) => string | number;
    isLoading?: boolean;
    loadingComponent?: React.ReactNode;
    emptyComponent?: React.ReactNode;
    hasNextPage: boolean | undefined;
    isFetchingNextPage: boolean;
    fetchNextPage: () => void;
    className?: string;
}

export const InfiniteScrollList = <T, >({
    items,
    renderItem,
    getKey,
    isLoading = false,
    loadingComponent,
    emptyComponent,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    className = 'space-y-3',
}: InfiniteScrollListProps<T>) => {
    if (isLoading) {
        return (
            loadingComponent || (
                <div className="rounded-2xl border border-border bg-card p-8 text-center text-foreground-muted">
                    Loading...
                </div>
            )
        );
    }

    if (items.length === 0) {
        return (
            emptyComponent || (
                <div className="rounded-2xl border border-border bg-card p-8 text-center text-foreground-muted">
                    No items found.
                </div>
            )
        );
    }

    return (
        <div className={className}>
            {items.map((item, index) => (
                <React.Fragment key={getKey(item, index)}>
                    {renderItem(item, index)}
                </React.Fragment>
            ))}

            <InfiniteScrollLoader
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
                fetchNextPage={fetchNextPage}
            />
        </div>
    );
};