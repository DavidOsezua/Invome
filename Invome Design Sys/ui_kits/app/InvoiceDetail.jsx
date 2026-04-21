// Invoice detail / print-style preview.
const InvoiceDetail = ({ invoiceId, onBack, onMarkPaid }) => {
  const { invoices, clients } = window.INVOME_DATA;
  const inv = invoices.find(i => i.id === invoiceId) || invoices[0];
  const client = clients.find(c => c.id === inv.clientId);
  const lines = [
    { desc: 'Brand identity — logo & marks', qty: 1, unit: inv.amount * 0.55 },
    { desc: 'Landing page design (5 screens)', qty: 5, unit: (inv.amount * 0.40) / 5 },
    { desc: 'Revision round', qty: 2, unit: (inv.amount * 0.05) / 2 },
  ];
  const subtotal = lines.reduce((s, l) => s + l.qty * l.unit, 0);
  const vat = 0;
  const total = subtotal + vat;

  const banner = {
    sent:      { bg: '#DBEAFE', fg: '#1D4ED8', text: 'Sent — waiting for payment.' },
    paid:      { bg: '#DCFCE7', fg: '#15803D', text: 'Paid in full.' },
    overdue:   { bg: '#FEF3C7', fg: '#B45309', text: 'Overdue — payment past due date.' },
    draft:     { bg: '#F3F4F6', fg: '#4B5563', text: 'Draft — not yet sent.' },
    cancelled: { bg: '#FEE2E2', fg: '#B91C1C', text: 'Cancelled.' },
  }[inv.status];

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={onBack} style={{ background: 'none', border: 0, cursor: 'pointer', color: '#4B5563', padding: 4, display: 'flex' }}><Icon name="arrow-left" size={18} /></button>
          <div>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 600, color: '#111827', letterSpacing: '-0.01em', fontVariantNumeric: 'tabular-nums' }}>{inv.id}</h1>
            <div style={{ fontSize: 13, color: '#4B5563', marginTop: 2 }}>{client.company} · Issued {fmt.date(inv.issued)}</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="secondary" icon="pencil">Edit</Button>
          <Button variant="secondary" icon="copy">Duplicate</Button>
          <Button variant="secondary" icon="download">Download PDF</Button>
          {inv.status !== 'paid' && inv.status !== 'cancelled' && (
            <Button variant="primary" icon="check-circle-2" onClick={onMarkPaid}>Mark paid</Button>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: banner.bg, color: banner.fg, borderRadius: 6, fontSize: 13, fontWeight: 500, marginBottom: 20 }}>
        <Icon name="info" size={16} />
        {banner.text}
      </div>

      {/* Printable invoice */}
      <Card padding="0">
        <div style={{ padding: '48px 56px', maxWidth: 880, margin: '0 auto' }}>
          {/* Header row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 40 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 7, background: '#1E2A44', display: 'grid', placeItems: 'center' }}>
                <svg width="22" height="22" viewBox="0 0 32 32" fill="none"><path d="M10 9.5v13M22 9.5v13M10 9.5l12 13" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#111827' }}>BrightLab Studios</div>
                <div style={{ fontSize: 12, color: '#4B5563' }}>12 Awolowo Road, Ikoyi, Lagos</div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#9CA3AF', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Invoice</div>
              <div style={{ fontSize: 24, fontWeight: 600, color: '#1E2A44', marginTop: 4, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.01em' }}>{inv.id}</div>
              <div style={{ fontSize: 12, color: '#4B5563', marginTop: 6, fontVariantNumeric: 'tabular-nums' }}>Issued {fmt.date(inv.issued)}</div>
              <div style={{ fontSize: 12, color: '#4B5563', fontVariantNumeric: 'tabular-nums' }}>Due {fmt.date(inv.due)}</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 36 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#9CA3AF', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>Invoice to</div>
              <div style={{ fontSize: 14, color: '#111827', fontWeight: 500 }}>{client.company}</div>
              <div style={{ fontSize: 13, color: '#4B5563', lineHeight: 1.55 }}>{client.name}<br/>{client.email}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#9CA3AF', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>Amount due</div>
              <div style={{ fontSize: 28, fontWeight: 700, color: '#1E2A44', fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em', lineHeight: 1 }}>
                {fmt.money(total, inv.currency)}
              </div>
              <div style={{ fontSize: 12, color: '#4B5563', marginTop: 4, fontVariantNumeric: 'tabular-nums' }}>Due {fmt.date(inv.due)}</div>
            </div>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, marginBottom: 24 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1E2A44' }}>
                <th style={{ textAlign: 'left', padding: '10px 0', fontSize: 11, fontWeight: 600, color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Description</th>
                <th style={{ textAlign: 'right', padding: '10px 0', width: 70, fontSize: 11, fontWeight: 600, color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Qty</th>
                <th style={{ textAlign: 'right', padding: '10px 0', width: 140, fontSize: 11, fontWeight: 600, color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Unit</th>
                <th style={{ textAlign: 'right', padding: '10px 0', width: 160, fontSize: 11, fontWeight: 600, color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {lines.map((l, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #F3F4F6' }}>
                  <td style={{ padding: '14px 0', color: '#111827' }}>{l.desc}</td>
                  <td style={{ padding: '14px 0', textAlign: 'right', color: '#4B5563', fontVariantNumeric: 'tabular-nums' }}>{l.qty}</td>
                  <td style={{ padding: '14px 0', textAlign: 'right', color: '#4B5563', fontVariantNumeric: 'tabular-nums' }}>{fmt.money(l.unit, inv.currency)}</td>
                  <td style={{ padding: '14px 0', textAlign: 'right', color: '#111827', fontVariantNumeric: 'tabular-nums', fontWeight: 500 }}>{fmt.money(l.qty * l.unit, inv.currency)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 40 }}>
            <div style={{ width: 280 }}>
              <SumRow label="Subtotal"><span style={{ fontVariantNumeric: 'tabular-nums' }}>{fmt.money(subtotal, inv.currency)}</span></SumRow>
              <SumRow label="VAT"><span style={{ fontVariantNumeric: 'tabular-nums' }}>{fmt.money(vat, inv.currency)}</span></SumRow>
              <div style={{ height: 1, background: '#1E2A44', margin: '10px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: '#111827' }}>Total</span>
                <span style={{ fontSize: 18, fontWeight: 700, color: '#1E2A44', fontVariantNumeric: 'tabular-nums' }}>{fmt.money(total, inv.currency)}</span>
              </div>
            </div>
          </div>

          <div style={{ padding: '20px 0', borderTop: '1px solid #F3F4F6', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#9CA3AF', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>Payment instructions</div>
              <div style={{ fontSize: 13, color: '#4B5563', lineHeight: 1.6, fontVariantNumeric: 'tabular-nums' }}>
                Bank: Guaranty Trust Bank<br/>
                Account: BrightLab Studios Ltd<br/>
                Number: 0123 456 789<br/>
                Reference: {inv.id}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#9CA3AF', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>Notes</div>
              <div style={{ fontSize: 13, color: '#4B5563', lineHeight: 1.6 }}>
                Thank you for the work. Payment due within 14 days of issue.
              </div>
            </div>
          </div>

          <div style={{ paddingTop: 24, textAlign: 'center', fontSize: 11, color: '#9CA3AF' }}>Generated by Invome</div>
        </div>
      </Card>
    </div>
  );
};

window.InvoiceDetail = InvoiceDetail;
