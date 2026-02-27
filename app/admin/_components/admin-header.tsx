"use client";

interface AdminHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export function AdminHeader({
  title,
  description,
  children,
}: AdminHeaderProps) {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-(--admin-fg) tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="text-(--admin-muted-foreground) mt-1 text-sm">
            {description}
          </p>
        )}
      </div>
      <div className="flex items-center gap-3">{children}</div>
    </header>
  );
}
