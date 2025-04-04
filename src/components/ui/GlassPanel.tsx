
import { cn } from "@/lib/utils";
import React from "react";

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  intensity?: "light" | "medium" | "heavy";
  border?: boolean;
  glow?: boolean;
  children: React.ReactNode;
}

const GlassPanel = React.forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ className, intensity = "medium", border = true, glow = false, children, ...props }, ref) => {
    const intensityStyles = {
      light: "bg-white/10 dark:bg-black/20 backdrop-blur-md",
      medium: "bg-white/20 dark:bg-black/40 backdrop-blur-lg",
      heavy: "bg-white/30 dark:bg-black/60 backdrop-blur-xl",
    };

    return (
      <div
        ref={ref}
        className={cn(
          intensityStyles[intensity],
          border && "border border-white/20 dark:border-white/10",
          glow && "animate-cosmic-pulse",
          "rounded-xl shadow-lg",
          "transition-all duration-300 ease-in-out",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassPanel.displayName = "GlassPanel";

export { GlassPanel };
