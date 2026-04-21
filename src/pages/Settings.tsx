import { useState } from "react"
import { Card } from "../components/ui/card"
import { Select } from "../components/ui/select"
import { Input, Textarea, Field } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { PageHeader } from "../layout/PageHeader"
import { cn } from "../lib/utils"

type Tab = 'profile' | 'business' | 'tax' | 'defaults'

const tabs: { id: Tab; label: string }[] = [
  { id: 'profile',  label: 'Profile' },
  { id: 'business', label: 'Business' },
  { id: 'tax',      label: 'Tax' },
  { id: 'defaults', label: 'Invoice defaults' },
]

export function Settings() {
  const [tab, setTab] = useState<Tab>('business')

  return (
    <div>
      <PageHeader title="Settings" subtitle="Manage your profile, business, and invoice defaults." />

      <Card>
        {/* Tab bar */}
        <div className="flex gap-0.5 px-5 pt-2.5 border-b border-surface-muted">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "bg-transparent border-0 px-3.5 py-2.5 font-[inherit] text-[13px] font-medium cursor-pointer -mb-px border-b-2 transition-colors",
                tab === t.id
                  ? "text-foreground border-ink-blue"
                  : "text-secondary-foreground border-transparent hover:text-foreground"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="p-6 max-w-[640px]">
          {tab === 'profile' && (
            <div className="flex flex-col gap-[18px]">
              <Field label="Full name"><Input defaultValue="Ọlámidé Adébáyọ̀" /></Field>
              <Field label="Email"><Input defaultValue="olamide@brightlab.ng" /></Field>
            </div>
          )}

          {tab === 'business' && (
            <div className="flex flex-col gap-[18px]">
              <Field label="Business name"><Input defaultValue="BrightLab Studios" /></Field>
              <Field label="Address"><Input defaultValue="12 Awolowo Road, Ikoyi, Lagos" /></Field>
              <div className="grid grid-cols-2 gap-3.5">
                <Field label="Phone"><Input defaultValue="+234 801 234 5678" /></Field>
                <Field label="Website"><Input defaultValue="brightlab.ng" /></Field>
              </div>
              <Field label="Bank account">
                <div className="grid gap-2.5" style={{ gridTemplateColumns: '2fr 1fr' }}>
                  <Input defaultValue="Guaranty Trust Bank" />
                  <Input defaultValue="0123 456 789" className="t-num" />
                </div>
              </Field>
            </div>
          )}

          {tab === 'tax' && (
            <div className="flex flex-col gap-[18px]">
              <Field label="VAT rate (%)"><Input type="number" defaultValue="7.5" className="t-num" /></Field>
              <Field label="TIN (Tax ID)"><Input defaultValue="12345678-0001" className="t-num" /></Field>
            </div>
          )}

          {tab === 'defaults' && (
            <div className="flex flex-col gap-[18px]">
              <Field label="Default payment terms">
                <Select value="net14" onChange={() => {}} options={[
                  { value: 'net7',  label: 'Net 7' },
                  { value: 'net14', label: 'Net 14' },
                  { value: 'net30', label: 'Net 30' },
                ]} />
              </Field>
              <Field label="Invoice number prefix"><Input defaultValue="INV-" /></Field>
              <Field label="Default notes">
                <Textarea
                  defaultValue="Thank you for the work. Payment due within 14 days of issue."
                  className="h-20"
                />
              </Field>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 px-6 py-3.5 border-t border-surface-muted">
          <Button variant="ghost">Cancel</Button>
          <Button variant="default">Save changes</Button>
        </div>
      </Card>
    </div>
  )
}
