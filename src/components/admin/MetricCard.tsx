import type { LucideIcon } from "lucide-react";

export function MetricCard({
  label,
  value,
  hint,
  icon: Icon,
}: {
  label: string;
  value: string;
  hint?: string;
  icon: LucideIcon;
}) {
  return (
    <div className="relative rounded-lg border border-neutral-200 p-5 dark:border-neutral-800">
      <Icon className="absolute right-4 top-4 h-4 w-4 text-neutral-400 dark:text-neutral-600" />
      <p className="text-sm text-neutral-500 dark:text-neutral-400">{label}</p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
      {hint && (
        <p className="mt-1 text-xs text-neutral-400 dark:text-neutral-500">
          {hint}
        </p>
      )}
    </div>
  );
}
