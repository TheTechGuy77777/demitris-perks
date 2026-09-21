import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

export function StampProgress({
  progress,
  target,
  compact = false,
  label = true,
}: {
  progress: number;
  target: number;
  compact?: boolean;
  label?: boolean;
}) {
  const complete = progress >= target;
  return (
    <div aria-label={`${progress} of ${target} stamps collected`}>
      <div className="flex flex-wrap gap-2" aria-hidden="true">
        {Array.from({ length: target }, (_, index) => {
          const filled = index < progress;
          return (
            <span
              key={index}
              className={cn(
                "flex shrink-0 items-center justify-center rounded-full border-2 font-bold transition-colors",
                compact ? "size-7" : "size-10 sm:size-11",
                filled
                  ? complete ? "border-save bg-save text-white" : "border-primary bg-primary text-white"
                  : "border-dashed border-rule-strong bg-paper text-ink-3",
              )}
            >
              {filled ? <Check className={compact ? "size-3.5" : "size-5"} strokeWidth={3} /> : <span className="size-1 rounded-full bg-rule-strong" />}
            </span>
          );
        })}
      </div>
      {label && (
        <div className="mt-3 flex items-baseline justify-between gap-3">
          <p className="u-nums text-[0.82rem] font-semibold text-ink">{progress} of {target} stamps</p>
          <p className={cn("u-label", complete ? "text-save-ink" : "text-ink-3")}>{complete ? "Reward unlocked" : `${target - progress} to go`}</p>
        </div>
      )}
    </div>
  );
}
