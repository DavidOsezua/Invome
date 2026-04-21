import { useState } from "react"
import { Search, Download, Send, CheckCircle2, MoreHorizontal } from "lucide-react"
import { clients, invoices } from "../data/mock"
import { Card } from "../components/ui/card"
import { Th, Td } from "../components/ui/table"
import { Select } from "../components/ui/select"
import { StatusBadge } from "../utils/status-badge"
import { Button } from "../components/ui/button"
import { PageHeader } from "../layout/PageHeader"
import { formatMoney } from "../utils/money"
import { formatDate } from "../utils/fmt"

interface InvoicesListProps {
  onOpenInvoice: (id: string) => void
  onNew: () => void
}

export function InvoicesList({ onOpenInvoice, onNew }: InvoicesListProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [statusFilter, setStatusFilter] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = invoices.filter(inv => {
    if (statusFilter !== 'all' && inv.status !== statusFilter) return false
    if (search) {
      const client = clients.find(c => c.id === inv.clientId)!
      const hay = `${inv.id} ${client.name} ${client.company}`.toLowerCase()
      if (!hay.includes(search.toLowerCase())) return false
    }
    return true
  })

  const toggle = (id: string) => {
    const next = new Set(selected)
    next.has(id) ? next.delete(id) : next.add(id)
    setSelected(next)
  }

  const toggleAll = () => {
    if (selected.size === filtered.length) setSelected(new Set())
    else setSelected(new Set(filtered.map(i => i.id)))
  }

  return (
    <div>
      <PageHeader
        title="Invoices"
        subtitle={`${filtered.length} of ${invoices.length} invoices`}
        action={<Button variant="default" onClick={onNew}><Send size={16} />New invoice</Button>}
      />

      <Card className="overflow-hidden">
        {/* Filter bar */}
        <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-surface-muted flex-wrap">
          <div className="relative flex-1 min-w-[260px] max-w-xs">
            <Search size={16} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search invoice # or client"
              className="w-full h-[34px] pl-8 pr-3 border border-border rounded-sm text-sm font-[inherit] text-foreground focus:outline-none focus:border-ink-blue"
            />
          </div>
          <Select
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              { value: 'all',       label: 'All statuses' },
              { value: 'paid',      label: 'Paid' },
              { value: 'sent',      label: 'Sent' },
              { value: 'overdue',   label: 'Overdue' },
              { value: 'draft',     label: 'Draft' },
              { value: 'cancelled', label: 'Cancelled' },
            ]}
          />
          <Select
            value="all"
            onChange={() => {}}
            options={[
              { value: 'all', label: 'All clients' },
              ...clients.map(c => ({ value: c.id, label: c.company })),
            ]}
          />
          <Select
            value="30"
            onChange={() => {}}
            options={[
              { value: '30',  label: 'Last 30 days' },
              { value: '90',  label: 'Last 90 days' },
              { value: 'ytd', label: 'Year to date' },
            ]}
          />
          <div className="ml-auto">
            <Button variant="outline" size="sm"><Download size={14} />Export</Button>
          </div>
        </div>

        {/* Bulk action bar */}
        {selected.size > 0 && (
          <div className="flex items-center gap-3 px-5 py-2.5 bg-canvas border-b border-border">
            <span className="text-[13px] font-medium text-foreground">{selected.size} selected</span>
            <Button variant="outline" size="sm"><Send size={14} />Send</Button>
            <Button variant="outline" size="sm"><CheckCircle2 size={14} />Mark paid</Button>
            <Button variant="outline" size="sm"><Download size={14} />Download</Button>
            <Button variant="ghost" size="sm" className="ml-auto" onClick={() => setSelected(new Set())}>
              Clear
            </Button>
          </div>
        )}

        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr>
              <Th className="w-10">
                <input
                  type="checkbox"
                  checked={selected.size === filtered.length && filtered.length > 0}
                  onChange={toggleAll}
                />
              </Th>
              <Th>Invoice #</Th>
              <Th>Client</Th>
              <Th align="right">Amount</Th>
              <Th>Status</Th>
              <Th>Due</Th>
              <Th className="w-10" />
            </tr>
          </thead>
          <tbody>
            {filtered.map(inv => {
              const client = clients.find(c => c.id === inv.clientId)!
              const isSel = selected.has(inv.id)
              return (
                <tr key={inv.id} className={isSel ? 'bg-canvas' : 'hover:bg-canvas transition-colors'}>
                  <Td>
                    <input type="checkbox" checked={isSel} onChange={() => toggle(inv.id)} />
                  </Td>
                  <Td>
                    <button
                      onClick={() => onOpenInvoice(inv.id)}
                      className="t-num font-medium text-foreground hover:underline cursor-pointer bg-transparent border-0 p-0"
                    >
                      {inv.id}
                    </button>
                  </Td>
                  <Td>
                    {client.company}
                    <div className="text-xs text-muted-foreground mt-0.5">{client.name}</div>
                  </Td>
                  <Td align="right">
                    <span className="t-num">{formatMoney(inv.amount, inv.currency)}</span>
                  </Td>
                  <Td><StatusBadge status={inv.status} /></Td>
                  <Td>
                    <span className="t-num text-secondary-foreground">{formatDate(inv.due)}</span>
                  </Td>
                  <Td>
                    <button className="bg-transparent border-0 cursor-pointer text-muted-foreground p-1 rounded hover:bg-surface-muted">
                      <MoreHorizontal size={16} />
                    </button>
                  </Td>
                </tr>
              )
            })}
          </tbody>
        </table>

        <div className="flex items-center justify-between px-5 py-3.5 border-t border-surface-muted">
          <span className="t-num text-xs text-muted-foreground">
            Showing 1–{filtered.length} of {filtered.length}
          </span>
          <div className="flex gap-1.5">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" disabled>Next</Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
