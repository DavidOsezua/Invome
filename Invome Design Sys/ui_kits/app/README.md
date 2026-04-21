# Invome — App UI Kit

A click-through recreation of the Invome web app. Six screens connected through a persistent sidebar and React state.

## Run
Open `index.html`. No build step — Babel/React load from CDN.

## Screens
- **Dashboard** — stat cards, revenue bar chart, overdue-attention panel, recent invoices
- **Invoices** — filter bar, selectable table, bulk-action bar, pagination
- **Invoice new** — client select, line items, details, sticky totals panel, add-client modal
- **Invoice detail** — printable invoice layout with status banner and action bar
- **Clients** — table + right-side detail drawer listing the client's invoices
- **Settings** — tabbed forms (Profile / Business / Tax / Invoice defaults)

## Components (all in this folder)
- `Primitives.jsx` — Icon · Badge · Button · Money · formatters
- `Layout.jsx` — Card · CardHeader · Header · Th · Td
- `Sidebar.jsx` — persistent left nav (232px) with user footer
- `Dashboard.jsx` — StatCard · RevenueChart · recent invoices table
- `InvoicesList.jsx` — Select · filter bar · invoice table · bulk actions
- `InvoiceNew.jsx` — Field · AddClientModal · line-items editor · live totals
- `InvoiceDetail.jsx` — printable invoice layout
- `ClientsList.jsx` — ClientDrawer · clients table
- `Settings.jsx` — tabbed settings panels

## Interactions
- Click any invoice row → detail view
- Click **New invoice** (sidebar or header) → creation form
- Click **Save & send** on the form → returns to list with a toast
- Click **Mark paid** in detail view → shows toast
- Click **Add new client** inside invoice form → modal
- Click a row in **Clients** → right-side drawer
- View state persists via `localStorage` across reloads
