import { Button } from "@/components/ui/button";
import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface PulseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  children: React.ReactNode;
}

export const PulseButton = forwardRef<HTMLButtonElement, PulseButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn(
          "relative overflow-hidden animate-pulse-glow",
          className
        )}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

PulseButton.displayName = "PulseButton";
