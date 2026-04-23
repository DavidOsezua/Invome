import { useState } from "react"
import { Plus, X } from "lucide-react"
import { clients, invoices } from "../data/mock"
import { Card } from "../components/ui/card"
import { Th, Td } from "../components/ui/table"
import { StatusBadge } from "../utils/status-badge"
import { Button } from "../components/ui/button"
import { PageHeader } from "../layout/PageHeader"
import { formatMoney } from "../utils/money"
import { formatDate } from "../utils/fmt"
import type { Client, Invoice } from "../types"

export function ClientsList() {
  const [openId, setOpenId] = useState<string | null>(null)
  const open = clients.find(c => c.id === openId) ?? null

  return (
    <div>
      <PageHeader
        title="Clients"
        subtitle={`${clients.length} clients`}
        action={<Button variant="default"><Plus size={16} />Add client</Button>}
      />

      <Card className="overflow-hidden">
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr>
              <Th>Client</Th>
              <Th>Email</Th>
              <Th align="right">Outstanding</Th>
              <Th align="right">Total billed</Th>
              <Th>Last invoice</Th>
            </tr>
          </thead>
          <tbody>
            {clients.map(c => (
              <tr
                key={c.id}
                onClick={() => setOpenId(c.id)}
                className="cursor-pointer hover:bg-canvas transition-colors"
              >
                <Td>
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-surface-muted grid place-items-center text-[11px] font-semibold text-secondary-foreground shrink-0">
                      {c.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{c.company}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{c.name}</div>
                    </div>
                  </div>
                </Td>
                <Td><span className="text-secondary-foreground">{c.email}</span></Td>
                <Td align="right">
                  {c.outstanding > 0
                    ? <span className="t-num text-warning-fg">{formatMoney(c.outstanding, c.currency)}</span>
                    : <span className="t-num text-muted-foreground">—</span>}
                </Td>
                <Td align="right">
                  <span className="t-num">{formatMoney(c.billed, c.currency)}</span>
                </Td>
                <Td>
                  <span className="t-num text-secondary-foreground">{formatDate(c.last)}</span>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {open && (
        <ClientDrawer
          client={open}
          invoices={invoices.filter(i => i.clientId === open.id)}
          onClose={() => setOpenId(null)}
        />
      )}
    </div>
  )
}

interface ClientDrawerProps {
  client: Client
  invoices: Invoice[]
  onClose: () => void
}

function ClientDrawer({ client, invoices, onClose }: ClientDrawerProps) {
  return (
    <div className="fixed inset-0 z-50">
      <div onClick={onClose} className="absolute inset-0 bg-foreground/35" />
      <div className="absolute right-0 top-0 h-screen w-110 bg-white shadow-lg flex flex-col">
        <div className="flex justify-between items-start px-6 py-5 border-b border-surface-muted">
          <div>
            <h3 className="m-0 text-[18px] font-semibold text-foreground">{client.company}</h3>
            <div className="text-[13px] text-secondary-foreground mt-1">
              {client.name} · {client.email}
            </div>
          </div>
          <button onClick={onClose} className="bg-transparent border-0 text-muted-foreground cursor-pointer p-1 hover:text-foreground">
            <X size={18} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 px-6 py-5 border-b border-surface-muted">
          <div>
            <div className="t-label mb-1">Outstanding</div>
            <div className={`t-num text-[18px] font-semibold ${client.outstanding > 0 ? 'text-warning-fg' : 'text-foreground'}`}>
              {formatMoney(client.outstanding, client.currency)}
            </div>
          </div>
          <div>
            <div className="t-label mb-1">Total billed</div>
            <div className="t-num text-[18px] font-semibold text-foreground">
              {formatMoney(client.billed, client.currency)}
            </div>
          </div>
        </div>

        <div className="px-6 pt-4 pb-2 t-label">Invoices</div>

        <div className="overflow-y-auto flex-1">
          {invoices.map(inv => (
            <div
              key={inv.id}
              className="flex justify-between items-center px-6 py-3 border-b border-surface-muted"
            >
              <div>
                <div className="t-num text-[13px] font-medium text-foreground">{inv.id}</div>
                <div className="t-num text-xs text-muted-foreground mt-0.5">Due {formatDate(inv.due)}</div>
              </div>
              <div className="flex items-center gap-3">
                <span className="t-num font-semibold">{formatMoney(inv.amount, inv.currency)}</span>
                <StatusBadge status={inv.status} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
