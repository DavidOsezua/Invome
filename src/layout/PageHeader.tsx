import * as React from "react"

interface PageHeaderProps {
  title: string
  subtitle?: string
  action?: React.ReactNode
}

export function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h1 className="m-0 text-2xl font-semibold text-foreground tracking-tight leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1 mb-0 text-sm text-secondary-foreground">{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  )
}
