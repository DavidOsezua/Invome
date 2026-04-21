// Clients list + drawer.
const ClientsList = () => {
  const { clients, invoices } = window.INVOME_DATA;
  const [openId, setOpenId] = React.useState(null);
  const open = clients.find(c => c.id === openId);

  return (
    <div>
      <Header title="Clients" subtitle={`${clients.length} clients`} action={
        <Button variant="primary" icon="plus">Add client</Button>
      } />

      <Card style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
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
              <tr key={c.id} onClick={() => setOpenId(c.id)} style={{ cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.background = '#F8FAFC'}
                onMouseLeave={e => e.currentTarget.style.background = ''}>
                <Td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#F3F4F6', display: 'grid', placeItems: 'center', fontSize: 11, fontWeight: 600, color: '#4B5563' }}>
                      {c.name.split(' ').map(n => n[0]).slice(0,2).join('')}
                    </div>
                    <div>
                      <div style={{ fontWeight: 500, color: '#111827' }}>{c.company}</div>
                      <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2 }}>{c.name}</div>
                    </div>
                  </div>
                </Td>
                <Td><span style={{ color: '#4B5563' }}>{c.email}</span></Td>
                <Td align="right">
                  {c.outstanding > 0
                    ? <Money amount={c.outstanding} currency={c.currency} style={{ color: '#B45309' }} />
                    : <span style={{ color: '#9CA3AF', fontVariantNumeric: 'tabular-nums' }}>—</span>}
                </Td>
                <Td align="right"><Money amount={c.billed} currency={c.currency} /></Td>
                <Td><span style={{ color: '#4B5563', fontVariantNumeric: 'tabular-nums' }}>{fmt.date(c.last)}</span></Td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {open && <ClientDrawer client={open} invoices={invoices.filter(i => i.clientId === open.id)} onClose={() => setOpenId(null)} />}
    </div>
  );
};

const ClientDrawer = ({ client, invoices, onClose }) => (
  <div style={{ position: 'fixed', inset: 0, zIndex: 100 }}>
    <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(17,24,39,0.35)' }} />
    <div style={{
      position: 'absolute', right: 0, top: 0, height: '100vh', width: 440,
      background: '#fff', boxShadow: '0 12px 24px -6px rgba(17,24,39,0.15)',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ padding: '20px 24px', borderBottom: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: '#111827' }}>{client.company}</h3>
          <div style={{ fontSize: 13, color: '#4B5563', marginTop: 4 }}>{client.name} · {client.email}</div>
        </div>
        <button onClick={onClose} style={{ background: 'none', border: 0, color: '#9CA3AF', cursor: 'pointer', padding: 4 }}><Icon name="x" size={18} /></button>
      </div>
      <div style={{ padding: '20px 24px', borderBottom: '1px solid #F3F4F6', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#9CA3AF', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>Outstanding</div>
          <div style={{ fontSize: 18, fontWeight: 600, color: client.outstanding > 0 ? '#B45309' : '#111827', fontVariantNumeric: 'tabular-nums' }}>
            {fmt.money(client.outstanding, client.currency)}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#9CA3AF', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>Total billed</div>
          <div style={{ fontSize: 18, fontWeight: 600, color: '#111827', fontVariantNumeric: 'tabular-nums' }}>
            {fmt.money(client.billed, client.currency)}
          </div>
        </div>
      </div>
      <div style={{ padding: '16px 24px 8px', fontSize: 11, fontWeight: 600, color: '#9CA3AF', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Invoices</div>
      <div style={{ overflowY: 'auto', flex: 1 }}>
        {invoices.map(inv => (
          <div key={inv.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 24px', borderBottom: '1px solid #F3F4F6' }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: '#111827', fontVariantNumeric: 'tabular-nums' }}>{inv.id}</div>
              <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2, fontVariantNumeric: 'tabular-nums' }}>Due {fmt.date(inv.due)}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Money amount={inv.amount} currency={inv.currency} bold />
              <Badge status={inv.status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

Object.assign(window, { ClientsList, ClientDrawer });
