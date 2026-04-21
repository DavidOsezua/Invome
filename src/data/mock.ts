import type { Client, Invoice, RevenueDataPoint } from '../types'

export const clients: Client[] = [
  { id: 'c1', name: 'Adaeze Okafor',       company: 'BrightLab Studios',   email: 'adaeze@brightlab.ng',   currency: 'NGN', outstanding: 450000,  billed: 2150000, last: '2026-04-21' },
  { id: 'c2', name: 'Tunde Bello',         company: 'Bello & Sons',        email: 'tunde@belloandsons.ng', currency: 'NGN', outstanding: 0,       billed: 3850000, last: '2026-04-10' },
  { id: 'c3', name: 'Sarah Chen',          company: 'Northwind Co.',       email: 'sarah@northwindco.com', currency: 'USD', outstanding: 2400,    billed: 9800,    last: '2026-03-28' },
  { id: 'c4', name: 'Lagos Logistics Ltd', company: 'Lagos Logistics Ltd', email: 'accounts@lagoslog.com', currency: 'NGN', outstanding: 0,       billed: 6200000, last: '2026-04-10' },
  { id: 'c5', name: 'Chidinma Eze',        company: 'Eze & Partners',      email: 'chidi@ezepartners.ng',  currency: 'NGN', outstanding: 320000,  billed: 1120000, last: '2026-04-18' },
  { id: 'c6', name: 'Marcus Leitner',      company: 'Berlin Works GmbH',   email: 'marcus@berlinworks.de', currency: 'USD', outstanding: 0,       billed: 4200,    last: '2026-02-14' },
]

export const invoices: Invoice[] = [
  { id: 'INV-0142', clientId: 'c1', amount: 450000,  currency: 'NGN', status: 'sent',      issued: '2026-04-17', due: '2026-04-24' },
  { id: 'INV-0141', clientId: 'c4', amount: 1200000, currency: 'NGN', status: 'paid',      issued: '2026-03-27', due: '2026-04-10' },
  { id: 'INV-0140', clientId: 'c3', amount: 2400,    currency: 'USD', status: 'overdue',   issued: '2026-03-14', due: '2026-03-28' },
  { id: 'INV-0139', clientId: 'c5', amount: 320000,  currency: 'NGN', status: 'sent',      issued: '2026-04-11', due: '2026-04-25' },
  { id: 'INV-0138', clientId: 'c2', amount: 850000,  currency: 'NGN', status: 'paid',      issued: '2026-03-27', due: '2026-04-10' },
  { id: 'INV-0137', clientId: 'c1', amount: 180000,  currency: 'NGN', status: 'paid',      issued: '2026-03-18', due: '2026-04-01' },
  { id: 'INV-0136', clientId: 'c6', amount: 1800,    currency: 'USD', status: 'paid',      issued: '2026-02-14', due: '2026-02-28' },
  { id: 'INV-0135', clientId: 'c3', amount: 3200,    currency: 'USD', status: 'paid',      issued: '2026-02-08', due: '2026-02-22' },
  { id: 'INV-0134', clientId: 'c4', amount: 2400000, currency: 'NGN', status: 'paid',      issued: '2026-02-01', due: '2026-02-15' },
  { id: 'INV-0133', clientId: 'c2', amount: 620000,  currency: 'NGN', status: 'paid',      issued: '2026-01-22', due: '2026-02-05' },
  { id: 'INV-0132', clientId: 'c5', amount: 420000,  currency: 'NGN', status: 'cancelled', issued: '2026-01-15', due: '2026-01-29' },
  { id: 'INV-0131', clientId: 'c1', amount: 275000,  currency: 'NGN', status: 'paid',      issued: '2026-01-08', due: '2026-01-22' },
  { id: 'INV-0130', clientId: 'c4', amount: 1800000, currency: 'NGN', status: 'paid',      issued: '2025-12-20', due: '2026-01-03' },
  { id: 'INV-0129', clientId: 'c2', amount: 540000,  currency: 'NGN', status: 'paid',      issued: '2025-12-12', due: '2025-12-26' },
  { id: 'INV-0143', clientId: 'c5', amount: 0,       currency: 'NGN', status: 'draft',     issued: '2026-04-18', due: '2026-05-02' },
]

export const revenue: RevenueDataPoint[] = [
  { month: 'Nov', value: 1800000 },
  { month: 'Dec', value: 2340000 },
  { month: 'Jan', value: 2815000 },
  { month: 'Feb', value: 3120000 + 1800 * 1500 + 3200 * 1500 },
  { month: 'Mar', value: 1030000 },
  { month: 'Apr', value: 2050000 },
]
