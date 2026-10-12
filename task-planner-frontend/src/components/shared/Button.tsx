import type { ComponentProps } from "react";
import { cn } from "../../utils/cn";


type ButtonVariants = "fill" | "outline" | "destructive" | "text-only" | "cancel" | "save";

interface ButtonProps extends ComponentProps<"button"> {
  variant?: ButtonVariants;
}

const baseStyles =
  "px-4 py-2 rounded-lg flex justify-center items-center transition-all duration-200 cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm gap-2";

const variantStyles: Record<ButtonVariants, string> = {
  fill: "bg-primary text-black hover:opacity-90 shadow-sm",
  outline: "border border-border text-foreground hover:bg-card-muted",
  destructive: "bg-red-500/10 border border-red-500/30 text-red-500 hover:bg-red-500/20",
  "text-only": "text-primary hover:text-foreground p-0 bg-transparent shadow-none",
  cancel: "h-12 sm:h-14 rounded-xl border-2 border-border bg-background text-foreground/80 font-bold tracking-wide hover:-translate-y-[2px] hover:bg-background-muted hover:text-foreground hover:shadow-bouncy dark:hover:shadow-[0_4px_0_0_var(--color-border)] active:translate-y-0 active:shadow-none",

  save: "h-12 sm:h-14 rounded-xl bg-primary text-background font-black tracking-wide hover:bg-primary/90 hover:shadow-primary-bouncy active:translate-y-[2px] active:shadow-primary-bouncy-active",
};

export const Button = ({
  children,
  variant = "fill",
  className,
  type = "button",
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;