import { useState } from "react"
import { Sidebar } from "./Sidebar"
import { Dashboard } from "../pages/Dashboard"
import { InvoicesList } from "../pages/InvoicesList"
import { InvoiceNew } from "../pages/InvoiceNew"
import { InvoiceDetail } from "../pages/InvoiceDetail"
import { ClientsList } from "../pages/ClientsList"
import { Settings } from "../pages/Settings"
import type { View } from "../types"

export function AppShell() {
  const [view, setView] = useState<View>('dashboard')
  const [openInvoiceId, setOpenInvoiceId] = useState<string | null>(null)

  const onNav = (v: View) => setView(v)
  const onNewInvoice = () => setView('invoice-new')
  const onOpenInvoice = (id: string) => {
    setOpenInvoiceId(id)
    setView('invoice-detail')
  }

  return (
    <div className="flex min-h-screen bg-canvas">
      <Sidebar view={view} onNav={onNav} onNewInvoice={onNewInvoice} />
      <main className="flex-1 p-8 overflow-auto min-w-0">
        {view === 'dashboard' && (
          <Dashboard onNav={onNav} onOpenInvoice={onOpenInvoice} />
        )}
        {view === 'invoices' && (
          <InvoicesList onOpenInvoice={onOpenInvoice} onNew={onNewInvoice} />
        )}
        {view === 'invoice-new' && (
          <InvoiceNew onCancel={() => setView('invoices')} onSave={() => setView('invoices')} />
        )}
        {view === 'invoice-detail' && openInvoiceId && (
          <InvoiceDetail
            invoiceId={openInvoiceId}
            onBack={() => setView('invoices')}
            onMarkPaid={() => setView('invoices')}
          />
        )}
        {view === 'clients' && <ClientsList />}
        {view === 'settings' && <Settings />}
        {view === 'reports' && (
          <div className="flex items-center justify-center h-64 text-muted-foreground text-sm">
            Reports coming soon.
          </div>
        )}
      </main>
    </div>
  )
}
