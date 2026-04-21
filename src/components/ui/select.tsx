import * as React from "react"
import { cn } from "../../lib/utils"

export interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  value: string
  onChange: (value: string) => void
  options: SelectOption[]
  className?: string
}

function Select({ value, onChange, options, className }: SelectProps) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className={cn(
        "h-[34px] px-3 border border-border rounded-sm text-sm text-foreground bg-white font-[inherit] cursor-pointer focus:outline-none focus:border-ink-blue",
        className
      )}
      style={{
        paddingRight: 30,
        appearance: 'none',
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='1.5'><polyline points='6 9 12 15 18 9'/></svg>")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 10px center',
        backgroundSize: '14px',
      }}
    >
      {options.map(o => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  )
}

export { Select }
