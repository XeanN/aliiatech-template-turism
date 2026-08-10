import { Star } from "lucide-react";

export function RatingStars({
  average,
  count,
  size = "sm",
}: {
  average: number;
  count?: number;
  size?: "sm" | "md";
}) {
  const starClass = size === "sm" ? "h-3.5 w-3.5" : "h-5 w-5";
  const rounded = Math.round(average);

  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={`${starClass} ${
              i < rounded
                ? "fill-amber-400 text-amber-400"
                : "fill-neutral-200 text-neutral-200 dark:fill-neutral-700 dark:text-neutral-700"
            }`}
          />
        ))}
      </div>
      {count !== undefined && (
        <span className="text-xs text-neutral-500 dark:text-neutral-400">
          ({count})
        </span>
      )}
    </div>
  );
}
