// Invoices list — filter bar, table, bulk actions, pagination.
const InvoicesList = ({ onOpenInvoice, onNew }) => {
  const { invoices, clients } = window.INVOME_DATA;
  const [selected, setSelected] = React.useState(new Set());
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [search, setSearch] = React.useState('');

  const filtered = invoices.filter(inv => {
    if (statusFilter !== 'all' && inv.status !== statusFilter) return false;
    if (search) {
      const c = clients.find(c => c.id === inv.clientId);
      const hay = (inv.id + ' ' + c.name + ' ' + c.company).toLowerCase();
      if (!hay.includes(search.toLowerCase())) return false;
    }
    return true;
  });

  const toggle = (id) => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
  };
  const toggleAll = () => {
    if (selected.size === filtered.length) setSelected(new Set());
    else setSelected(new Set(filtered.map(i => i.id)));
  };

  return (
    <div>
      <Header title="Invoices" subtitle={`${filtered.length} of ${invoices.length} invoices`} action={
        <Button variant="primary" icon="plus" onClick={onNew}>New invoice</Button>
      } />

      <Card style={{ overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 20px', borderBottom: '1px solid #F3F4F6', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: '1 1 260px', maxWidth: 320 }}>
            <Icon name="search" size={16} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search invoice # or client"
              style={{ width: '100%', height: 34, padding: '0 12px 0 34px', border: '1px solid #E5E7EB', borderRadius: 6, fontSize: 13, fontFamily: 'inherit' }} />
          </div>
          <Select value={statusFilter} onChange={setStatusFilter} options={[
            { v: 'all', l: 'All statuses' },
            { v: 'paid', l: 'Paid' },
            { v: 'sent', l: 'Sent' },
            { v: 'overdue', l: 'Overdue' },
            { v: 'draft', l: 'Draft' },
            { v: 'cancelled', l: 'Cancelled' },
          ]} />
          <Select value="all" onChange={()=>{}} options={[{ v: 'all', l: 'All clients' }, ...clients.map(c => ({ v: c.id, l: c.company }))]} />
          <Select value="30" onChange={()=>{}} options={[{ v: '30', l: 'Last 30 days' }, { v: '90', l: 'Last 90 days' }, { v: 'ytd', l: 'Year to date' }]} />
          <div style={{ marginLeft: 'auto' }}>
            <Button variant="secondary" size="sm" icon="download">Export</Button>
          </div>
        </div>

        {selected.size > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 20px', background: '#F8FAFC', borderBottom: '1px solid #E5E7EB' }}>
            <span style={{ fontSize: 13, color: '#111827', fontWeight: 500 }}>{selected.size} selected</span>
            <Button variant="secondary" size="sm" icon="send">Send</Button>
            <Button variant="secondary" size="sm" icon="check-circle-2">Mark paid</Button>
            <Button variant="secondary" size="sm" icon="download">Download</Button>
            <Button variant="ghost" size="sm" onClick={() => setSelected(new Set())} style={{ marginLeft: 'auto' }}>Clear</Button>
          </div>
        )}

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              <Th style={{ width: 40, padding: '10px 20px' }}>
                <input type="checkbox" checked={selected.size === filtered.length && filtered.length > 0} onChange={toggleAll} />
              </Th>
              <Th>Invoice #</Th>
              <Th>Client</Th>
              <Th align="right">Amount</Th>
              <Th>Status</Th>
              <Th>Due</Th>
              <Th style={{ width: 40 }}></Th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(inv => {
              const c = clients.find(c => c.id === inv.clientId);
              const isSel = selected.has(inv.id);
              return (
                <tr key={inv.id}
                  onMouseEnter={e => !isSel && (e.currentTarget.style.background = '#F8FAFC')}
                  onMouseLeave={e => !isSel && (e.currentTarget.style.background = '')}
                  style={{ background: isSel ? '#F8FAFC' : '' }}>
                  <Td><input type="checkbox" checked={isSel} onChange={() => toggle(inv.id)} /></Td>
                  <Td><a onClick={() => onOpenInvoice(inv.id)} style={{ fontWeight: 500, fontVariantNumeric: 'tabular-nums', color: '#111827', cursor: 'pointer', textDecoration: 'none' }}>{inv.id}</a></Td>
                  <Td>{c.company}<div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2 }}>{c.name}</div></Td>
                  <Td align="right"><Money amount={inv.amount} currency={inv.currency} /></Td>
                  <Td><Badge status={inv.status} /></Td>
                  <Td><span style={{ color: '#4B5563', fontVariantNumeric: 'tabular-nums' }}>{fmt.date(inv.due)}</span></Td>
                  <Td><button style={{ background: 'none', border: 0, cursor: 'pointer', color: '#9CA3AF', padding: 4, borderRadius: 4 }}><Icon name="more-horizontal" size={16}/></button></Td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderTop: '1px solid #F3F4F6' }}>
          <span style={{ fontSize: 12, color: '#9CA3AF', fontVariantNumeric: 'tabular-nums' }}>Showing 1–{filtered.length} of {filtered.length}</span>
          <div style={{ display: 'flex', gap: 6 }}>
            <Button variant="secondary" size="sm" disabled>Previous</Button>
            <Button variant="secondary" size="sm" disabled>Next</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

const Select = ({ value, onChange, options }) => (
  <select value={value} onChange={e => onChange(e.target.value)} style={{
    height: 34, padding: '0 30px 0 12px', border: '1px solid #E5E7EB', borderRadius: 6,
    fontSize: 13, color: '#111827', fontFamily: 'inherit', background: "#fff url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='1.5'><polyline points='6 9 12 15 18 9'/></svg>\") right 10px center / 14px no-repeat",
    appearance: 'none', cursor: 'pointer',
  }}>{options.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}</select>
);

Object.assign(window, { InvoicesList, Select });
