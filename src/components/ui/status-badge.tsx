import * as React from "react"
import { cn } from "../../lib/utils"

export type InvoiceStatus = "paid" | "overdue" | "sent" | "draft" | "cancelled"

const statusConfig: Record<
  InvoiceStatus,
  { label: string; dot: string; badge: string }
> = {
  paid: {
    label: "Paid",
    dot: "bg-[var(--color-success)]",
    badge: "bg-[var(--color-success-bg)] text-[var(--color-success-fg)]",
  },
  overdue: {
    label: "Overdue",
    dot: "bg-[var(--color-warning)]",
    badge: "bg-[var(--color-warning-bg)] text-[var(--color-warning-fg)]",
  },
  sent: {
    label: "Sent",
    dot: "bg-[var(--color-info)]",
    badge: "bg-[var(--color-info-bg)] text-[var(--color-info-fg)]",
  },
  draft: {
    label: "Draft",
    dot: "bg-[var(--color-neutral-fg)]",
    badge: "bg-[var(--color-neutral-bg)] text-[var(--color-neutral-fg)]",
  },
  cancelled: {
    label: "Cancelled",
    dot: "bg-[var(--color-danger)]",
    badge: "bg-[var(--color-danger-bg)] text-[var(--color-danger-fg)]",
  },
}

interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: InvoiceStatus
}

export function StatusBadge({ status, className, ...props }: StatusBadgeProps) {
  const config = statusConfig[status]

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
        config.badge,
        className
      )}
      {...props}
    >
      <span className={cn("size-1.5 rounded-full shrink-0", config.dot)} />
      {config.label}
    </span>
  )
}
