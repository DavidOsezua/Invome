export type InvoiceStatus = 'paid' | 'sent' | 'overdue' | 'draft' | 'cancelled'
export type Currency = 'NGN' | 'USD'
export type View = 'dashboard' | 'invoices' | 'invoice-new' | 'invoice-detail' | 'clients' | 'reports' | 'settings'

export interface Client {
  id: string
  name: string
  company: string
  email: string
  currency: Currency
  outstanding: number
  billed: number
  last: string
}

export interface Invoice {
  id: string
  clientId: string
  amount: number
  currency: Currency
  status: InvoiceStatus
  issued: string
  due: string
}

export interface RevenueDataPoint {
  month: string
  value: number
}
