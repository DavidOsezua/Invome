import * as React from "react"
import { cn } from "../../lib/utils"

const inputBase = "w-full h-9 px-3 border border-border rounded-sm bg-white font-[inherit] text-sm text-foreground focus:outline-none focus:border-ink-blue focus:ring-1 focus:ring-ink-blue/20 box-border"

function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(inputBase, className)} {...props} />
}

function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(inputBase, "h-auto py-2.5 resize-y", className)} {...props} />
}

interface FieldProps {
  label: string
  children: React.ReactNode
}

function Field({ label, children }: FieldProps) {
  return (
    <div>
      <label className="block text-xs font-medium text-secondary-foreground mb-1.5">{label}</label>
      {children}
    </div>
  )
}

export { Input, Textarea, Field, inputBase }
