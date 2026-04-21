// Dashboard screen — stat cards, revenue chart, recent invoices.
const Dashboard = ({ onNav, onOpenInvoice }) => {
  const { invoices, clients, revenue } = window.INVOME_DATA;
  const outstanding = invoices.filter(i => i.status === 'sent' || i.status === 'overdue').reduce((s, i) => s + (i.currency === 'NGN' ? i.amount : i.amount * 1500), 0);
  const paidThisMonth = invoices.filter(i => i.status === 'paid' && i.due.startsWith('2026-04')).reduce((s, i) => s + (i.currency === 'NGN' ? i.amount : i.amount * 1500), 0);
  const overdueCount = invoices.filter(i => i.status === 'overdue').length;
  const recent = invoices.slice(0, 5);

  return (
    <div>
      <Header title="Dashboard" subtitle="An overview of your invoicing activity." />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
        <StatCard label="Outstanding" value={fmt.shortMoney(outstanding, 'NGN')} sub="Across 2 invoices" icon="clock" tint="red" />
        <StatCard label="Paid this month" value={fmt.shortMoney(paidThisMonth, 'NGN')} sub={<span><b style={{color:'#15803D'}}>↑ 18%</b> vs last month</span>} icon="check-circle-2" tint="green" />
        <StatCard label="Overdue" value={overdueCount} sub="1 over 14 days" icon="alert-triangle" />
        <StatCard label="Total clients" value={clients.length} sub="+2 this month" icon="users" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 16, marginBottom: 16 }}>
        <Card>
          <CardHeader title="Revenue" action={<Button variant="ghost" size="sm">Last 6 months</Button>} />
          <RevenueChart data={revenue} />
        </Card>
        <Card>
          <CardHeader title="Overdue attention" />
          <div style={{ padding: '4px 20px 20px' }}>
            {invoices.filter(i => i.status === 'overdue').map(inv => {
              const c = clients.find(c => c.id === inv.clientId);
              const days = Math.floor((new Date('2026-04-18') - new Date(inv.due)) / 86400000);
              return (
                <div key={inv.id} onClick={() => onOpenInvoice(inv.id)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #F3F4F6', cursor: 'pointer' }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: '#111827' }}>{c.company}</div>
                    <div style={{ fontSize: 12, color: '#B45309', marginTop: 2 }}>{days} days past due</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <Money amount={inv.amount} currency={inv.currency} bold />
                    <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2, fontVariantNumeric: 'tabular-nums' }}>{inv.id}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader title="Recent invoices" action={<Button variant="ghost" size="sm" onClick={() => onNav('invoices')}>View all →</Button>} />
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              <Th>Invoice #</Th>
              <Th>Client</Th>
              <Th align="right">Amount</Th>
              <Th>Status</Th>
              <Th>Due</Th>
            </tr>
          </thead>
          <tbody>
            {recent.map(inv => {
              const c = clients.find(c => c.id === inv.clientId);
              return (
                <tr key={inv.id} onClick={() => onOpenInvoice(inv.id)} style={{ cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.background = '#F8FAFC'} onMouseLeave={e => e.currentTarget.style.background = ''}>
                  <Td><span style={{ fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}>{inv.id}</span></Td>
                  <Td>{c.company}<div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2 }}>{c.name}</div></Td>
                  <Td align="right"><Money amount={inv.amount} currency={inv.currency} /></Td>
                  <Td><Badge status={inv.status} /></Td>
                  <Td><span style={{ color: '#4B5563', fontVariantNumeric: 'tabular-nums' }}>{fmt.date(inv.due)}</span></Td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

const StatCard = ({ label, value, sub, icon, tint }) => {
  const tintStyles = {
    red:   { background: '#FEF2F2', borderColor: 'rgba(254, 202, 202, 0.5)', iconBg: '#FEE2E2', iconFg: '#B91C1C' },
    green: { background: '#F0FDF4', borderColor: 'rgba(187, 247, 208, 0.5)', iconBg: '#DCFCE7', iconFg: '#15803D' },
  };
  const t = tintStyles[tint] || {};
  return (
    <div style={{
      background: t.background || '#fff',
      border: `1px solid ${t.borderColor || '#E5E7EB'}`,
      borderRadius: 8, padding: '18px 18px 16px',
      boxShadow: '0 1px 2px rgba(17,24,39,0.04)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <span style={{ fontSize: 12, fontWeight: 500, color: '#4B5563' }}>{label}</span>
        <span style={{ width: 28, height: 28, borderRadius: 6, background: t.iconBg || '#F3F4F6', color: t.iconFg || '#4B5563', display: 'grid', placeItems: 'center' }}>
          <Icon name={icon} size={16} />
        </span>
      </div>
      <div style={{ fontSize: 24, fontWeight: 600, color: '#111827', fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.01em', lineHeight: 1.1 }}>{value}</div>
      <div style={{ fontSize: 12, color: '#4B5563', marginTop: 6, fontVariantNumeric: 'tabular-nums' }}>{sub}</div>
    </div>
  );
};

const RevenueChart = ({ data }) => {
  const max = Math.max(...data.map(d => d.value));
  return (
    <div style={{ padding: '16px 20px 20px' }}>
      <div style={{ fontSize: 28, fontWeight: 600, color: '#111827', fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em', marginBottom: 18 }}>
        ₦ {(data.reduce((s,d)=>s+d.value,0)).toLocaleString('en-NG')}
        <span style={{ fontSize: 13, color: '#4B5563', fontWeight: 400, marginLeft: 10 }}>total billed</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 18, height: 160, borderBottom: '1px solid #E5E7EB', paddingBottom: 4 }}>
        {data.map((d, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, height: '100%', justifyContent: 'flex-end' }}>
            <div style={{ fontSize: 11, color: '#4B5563', fontVariantNumeric: 'tabular-nums', fontWeight: 500 }}>
              {(d.value / 1000000).toFixed(1)}M
            </div>
            <div style={{ width: '100%', height: `${(d.value / max) * 100}%`, background: i === data.length - 1 ? '#1E2A44' : '#E5E7EB', borderRadius: '4px 4px 0 0', transition: 'background 160ms' }} />
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 18, marginTop: 8 }}>
        {data.map((d, i) => <div key={i} style={{ flex: 1, textAlign: 'center', fontSize: 11, color: '#9CA3AF', fontWeight: 500 }}>{d.month}</div>)}
      </div>
    </div>
  );
};

window.Dashboard = Dashboard;
