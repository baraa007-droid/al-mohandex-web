import { Inbox } from 'lucide-react';

export function EmptyState({
  title = 'No data found',
  description = 'There are no items to display.',
  action,
}: {
  title?: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-neutral-300 bg-neutral-50 p-12 text-center dark:border-neutral-700 dark:bg-neutral-900/50">
      <Inbox className="mb-4 h-12 w-12 text-neutral-400" aria-hidden="true" />
      <h3 className="mb-1 text-lg font-semibold text-neutral-900 dark:text-neutral-50">{title}</h3>
      <p className="mb-4 max-w-sm text-sm text-neutral-500 dark:text-neutral-400">{description}</p>
      {action}
    </div>
  );
}
