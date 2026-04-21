import * as React from "react"
import { cn } from "../../lib/utils"

function Card({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("bg-white border border-border rounded-md shadow-xs", className)}
      {...props}
    >
      {children}
    </div>
  )
}

interface CardHeaderProps {
  title: string
  action?: React.ReactNode
}

function CardHeader({ title, action }: CardHeaderProps) {
  return (
    <div className="flex items-center justify-between px-5 py-4 border-b border-surface-muted">
      <h3 className="text-[15px] font-semibold text-foreground tracking-tight m-0">{title}</h3>
      {action}
    </div>
  )
}

export { Card, CardHeader }
