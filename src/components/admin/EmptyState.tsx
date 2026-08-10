import type { LucideIcon } from "lucide-react";

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-neutral-200 px-6 py-16 text-center dark:border-neutral-800">
      <Icon className="h-10 w-10 text-neutral-300 dark:text-neutral-700" />
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {description}
        </p>
      </div>
      {action}
    </div>
  );
}
