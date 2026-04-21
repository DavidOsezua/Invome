import * as React from "react"
import { cn } from "../../lib/utils"

interface ThProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  align?: 'left' | 'right' | 'center'
}

function Th({ children, align = 'left', className, ...props }: ThProps) {
  return (
    <th
      className={cn(
        "px-5 py-2.5 bg-canvas text-[11px] font-semibold text-secondary-foreground tracking-wide uppercase border-b border-border border-t border-surface-muted",
        align === 'right' && 'text-right',
        align === 'center' && 'text-center',
        className
      )}
      {...props}
    >
      {children}
    </th>
  )
}

interface TdProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  align?: 'left' | 'right' | 'center'
}

function Td({ children, align = 'left', className, ...props }: TdProps) {
  return (
    <td
      className={cn(
        "px-5 py-3 border-b border-surface-muted text-foreground align-middle",
        align === 'right' && 'text-right',
        align === 'center' && 'text-center',
        className
      )}
      {...props}
    >
      {children}
    </td>
  )
}

export { Th, Td }
