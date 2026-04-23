import { ArrowLeft, Pencil, Copy, Download, CheckCircle2, Info } from "lucide-react"
import { clients, invoices } from "../data/mock"
import { Card } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { formatMoney } from "../utils/money"
import { formatDate } from "../utils/fmt"
import { cn } from "../lib/utils"
import type { InvoiceStatus } from "../types"

interface InvoiceDetailProps {
  invoiceId?: string
  onBack?: () => void
  onMarkPaid?: () => void
}

const bannerConfig: Record<InvoiceStatus, { bg: string; fg: string; text: string }> = {
  sent:      { bg: 'bg-info-bg',    fg: 'text-info-fg',    text: 'Sent — waiting for payment.' },
  paid:      { bg: 'bg-success-bg', fg: 'text-success-fg', text: 'Paid in full.' },
  overdue:   { bg: 'bg-warning-bg', fg: 'text-warning-fg', text: 'Overdue — payment past due date.' },
  draft:     { bg: 'bg-neutral-bg', fg: 'text-neutral-fg', text: 'Draft — not yet sent.' },
  cancelled: { bg: 'bg-danger-bg',  fg: 'text-danger-fg',  text: 'Cancelled.' },
}

export function InvoiceDetail({ invoiceId, onBack, onMarkPaid }: InvoiceDetailProps) {
  const inv = invoices.find(i => i.id === invoiceId) ?? invoices[0]
  const client = clients.find(c => c.id === inv.clientId)!

  const lines = [
    { desc: 'Brand identity — logo & marks',     qty: 1, unit: inv.amount * 0.55 },
    { desc: 'Landing page design (5 screens)',    qty: 5, unit: (inv.amount * 0.40) / 5 },
    { desc: 'Revision round',                     qty: 2, unit: (inv.amount * 0.05) / 2 },
  ]
  const subtotal = lines.reduce((s, l) => s + l.qty * l.unit, 0)
  const total = subtotal

  const banner = bannerConfig[inv.status]

  return (
    <div>
      {/* Top bar */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="bg-transparent border-0 cursor-pointer text-secondary-foreground p-1 flex hover:text-foreground"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="m-0 t-num text-[22px] font-semibold text-foreground tracking-tight">
              {inv.id}
            </h1>
            <div className="text-[13px] text-secondary-foreground mt-0.5">
              {client.company} · Issued {formatDate(inv.issued)}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Pencil size={14} />Edit</Button>
          <Button variant="outline" size="sm"><Copy size={14} />Duplicate</Button>
          <Button variant="outline" size="sm"><Download size={14} />Download PDF</Button>
          {inv.status !== 'paid' && inv.status !== 'cancelled' && (
            <Button variant="default" size="sm" onClick={onMarkPaid}>
              <CheckCircle2 size={14} />Mark paid
            </Button>
          )}
        </div>
      </div>

      {/* Status banner */}
      <div className={cn("flex items-center gap-2.5 px-3.5 py-2.5 rounded-sm text-[13px] font-medium mb-5", banner.bg, banner.fg)}>
        <Info size={16} />
        {banner.text}
      </div>

      {/* Printable invoice */}
      <Card>
        <div className="px-14 py-12 max-w-[880px] mx-auto">
          {/* Header row */}
          <div className="flex justify-between items-start mb-10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-md bg-ink-blue grid place-items-center shrink-0">
                <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
                  <path d="M10 9.5v13M22 9.5v13M10 9.5l12 13" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <div className="text-[15px] font-semibold text-foreground">BrightLab Studios</div>
                <div className="text-xs text-secondary-foreground">12 Awolowo Road, Ikoyi, Lagos</div>
              </div>
            </div>
            <div className="text-right">
              <div className="t-label">Invoice</div>
              <div className="t-num text-2xl font-semibold text-ink-blue mt-1 tracking-tight">{inv.id}</div>
              <div className="t-num text-xs text-secondary-foreground mt-1.5">Issued {formatDate(inv.issued)}</div>
              <div className="t-num text-xs text-secondary-foreground">Due {formatDate(inv.due)}</div>
            </div>
          </div>

          {/* Invoice to / Amount due */}
          <div className="grid grid-cols-2 gap-6 mb-9">
            <div>
              <div className="t-label mb-2">Invoice to</div>
              <div className="text-sm font-medium text-foreground">{client.company}</div>
              <div className="text-[13px] text-secondary-foreground leading-relaxed">
                {client.name}<br />{client.email}
              </div>
            </div>
            <div>
              <div className="t-label mb-2">Amount due</div>
              <div className="t-num text-[28px] font-bold text-ink-blue tracking-tight leading-none">
                {formatMoney(total, inv.currency)}
              </div>
              <div className="t-num text-xs text-secondary-foreground mt-1">Due {formatDate(inv.due)}</div>
            </div>
          </div>

          {/* Line items */}
          <table className="w-full border-collapse text-[13px] mb-6">
            <thead>
              <tr className="border-b border-ink-blue">
                {(['Description', 'Qty', 'Unit', 'Amount'] as const).map((h, i) => (
                  <th
                    key={h}
                    className={cn(
                      "py-2.5 text-[11px] font-semibold text-secondary-foreground uppercase tracking-wide",
                      i === 0 ? 'text-left' : 'text-right',
                      i === 1 && 'w-[70px]',
                      i === 2 && 'w-[140px]',
                      i === 3 && 'w-[160px]',
                    )}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {lines.map((l, i) => (
                <tr key={i} className="border-b border-surface-muted">
                  <td className="py-3.5 text-foreground">{l.desc}</td>
                  <td className="py-3.5 text-right t-num text-secondary-foreground">{l.qty}</td>
                  <td className="py-3.5 text-right t-num text-secondary-foreground">
                    {formatMoney(l.unit, inv.currency)}
                  </td>
                  <td className="py-3.5 text-right t-num font-medium text-foreground">
                    {formatMoney(l.qty * l.unit, inv.currency)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="flex justify-end mb-10">
            <div className="w-[280px]">
              <div className="flex justify-between py-1.5">
                <span className="text-[13px] text-secondary-foreground">Subtotal</span>
                <span className="t-num">{formatMoney(subtotal, inv.currency)}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-[13px] text-secondary-foreground">VAT</span>
                <span className="t-num">{formatMoney(0, inv.currency)}</span>
              </div>
              <div className="h-px bg-ink-blue my-2.5" />
              <div className="flex justify-between py-1">
                <span className="text-[15px] font-semibold text-foreground">Total</span>
                <span className="t-num text-[18px] font-bold text-ink-blue">
                  {formatMoney(total, inv.currency)}
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-5 border-t border-surface-muted grid grid-cols-2 gap-6">
            <div>
              <div className="t-label mb-1.5">Payment instructions</div>
              <div className="t-num text-[13px] text-secondary-foreground leading-relaxed">
                Bank: Guaranty Trust Bank<br />
                Account: BrightLab Studios Ltd<br />
                Number: 0123 456 789<br />
                Reference: {inv.id}
              </div>
            </div>
            <div>
              <div className="t-label mb-1.5">Notes</div>
              <div className="text-[13px] text-secondary-foreground leading-relaxed">
                Thank you for the work. Payment due within 14 days of issue.
              </div>
            </div>
          </div>

          <div className="pt-6 text-center t-num text-[11px] text-muted-foreground">
            Generated by Invome
          </div>
        </div>
      </Card>
    </div>
  )
}
