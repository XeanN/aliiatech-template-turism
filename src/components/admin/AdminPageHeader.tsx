export function AdminPageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        {description && (
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
