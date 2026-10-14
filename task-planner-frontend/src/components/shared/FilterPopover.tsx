import { useState, type ReactNode } from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import CloseIcon from "@mui/icons-material/Close";
import { cn } from "../../utils/cn";

interface PopoverProps {
    trigger: ReactNode;
    children: ReactNode;
    title?: string;
    align?: "start" | "center" | "end";
    side?: "top" | "right" | "bottom" | "left";
    sideOffset?: number;
    contentClassName?: string;
}

export const FilterPopover = ({
    trigger,
    children,
    title,
    align = "end",
    side = "bottom",
    sideOffset = 4,
    contentClassName = "",
}: PopoverProps) => {
    const [open, setOpen] = useState(false);

    return (
        <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
            <PopoverPrimitive.Trigger asChild>
                <div className="inline-block cursor-pointer outline-none">
                    {trigger}
                </div>
            </PopoverPrimitive.Trigger>

            <PopoverPrimitive.Portal>
                <PopoverPrimitive.Content
                    align={align}
                    side={side}
                    sideOffset={sideOffset}
                    className={cn(
                        "z-50 flex max-h-[80vh] w-[calc(100vw-2rem)] max-w-[360px] flex-col overflow-hidden rounded-2xl border-2 border-border bg-card shadow-2xl",
                        "animate-in fade-in zoom-in-95 duration-150",
                        contentClassName
                    )}
                >
                    {title && (
                        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-border bg-card px-4 py-3 sm:px-5">
                            <span className="min-w-0 truncate text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                {title}
                            </span>

                            <PopoverPrimitive.Close asChild>
                                <button
                                    type="button"
                                    aria-label="Close popover"
                                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                >
                                    <CloseIcon sx={{ fontSize: 18 }} />
                                </button>
                            </PopoverPrimitive.Close>
                        </div>
                    )}

                    <div
                        className={cn(
                            "min-h-0 flex-1 overflow-y-auto p-3 sm:p-5",
                            "scrollbar-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                        )}
                    >
                        {children}
                    </div>
                </PopoverPrimitive.Content>
            </PopoverPrimitive.Portal>
        </PopoverPrimitive.Root>
    );
};