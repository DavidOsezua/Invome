import * as React from "react"
import { cn } from "../lib/utils"

export type InvoiceStatus = "paid" | "overdue" | "sent" | "draft" | "cancelled"

const statusConfig: Record<
  InvoiceStatus,
  { label: string; dot: string; badge: string }
> = {
  paid: {
    label: "Paid",
    dot: "bg-success",
    badge: "bg-success-bg text-success-fg",
  },
  overdue: {
    label: "Overdue",
    dot: "bg-warning",
    badge: "bg-warning-bg text-warning-fg",
  },
  sent: {
    label: "Sent",
    dot: "bg-info",
    badge: "bg-info-bg text-info-fg",
  },
  draft: {
    label: "Draft",
    dot: "bg-neutral-fg",
    badge: "bg-neutral-bg text-neutral-fg",
  },
  cancelled: {
    label: "Cancelled",
    dot: "bg-danger",
    badge: "bg-danger-bg text-danger-fg",
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
        "inline-flex items-center gap-1.5 rounded-xl px-2.5 py-0.5 text-xs font-medium",
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
