// Invoice create form — client select, line items, details, sticky totals.
const InvoiceNew = ({ onCancel, onSave }) => {
  const { clients } = window.INVOME_DATA;
  const [clientId, setClientId] = React.useState('c1');
  const [addClientOpen, setAddClientOpen] = React.useState(false);
  const [lines, setLines] = React.useState([
    { id: 1, desc: 'Brand identity — logo & marks', qty: 1, unit: 250000 },
    { id: 2, desc: 'Landing page design (5 screens)', qty: 5, unit: 40000 },
    { id: 3, desc: 'Revision round',                 qty: 2, unit: 25000 },
  ]);
  const [notes, setNotes] = React.useState('Thank you for the work. Payment due within 14 days of issue.');
  const [vat, setVat] = React.useState(7.5);

  const client = clients.find(c => c.id === clientId);
  const subtotal = lines.reduce((s, l) => s + l.qty * l.unit, 0);
  const tax = subtotal * vat / 100;
  const total = subtotal + tax;

  const addLine = () => setLines([...lines, { id: Date.now(), desc: '', qty: 1, unit: 0 }]);
  const updateLine = (id, k, v) => setLines(lines.map(l => l.id === id ? { ...l, [k]: k === 'desc' ? v : Number(v) || 0 } : l));
  const removeLine = (id) => setLines(lines.filter(l => l.id !== id));

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20, alignItems: 'flex-start' }}>
      <div>
        <Header title="New invoice" subtitle="Invoice #INV-0143 · auto-generated" />

        <Card style={{ marginBottom: 16 }}>
          <CardHeader title="Client" action={<Button variant="ghost" size="sm" icon="plus" onClick={() => setAddClientOpen(true)}>Add new client</Button>} />
          <div style={{ padding: '16px 20px 20px' }}>
            <Field label="Bill to">
              <Select value={clientId} onChange={setClientId} options={clients.map(c => ({ v: c.id, l: `${c.company} — ${c.name}` }))} />
            </Field>
            {client && (
              <div style={{ marginTop: 12, padding: 14, background: '#F8FAFC', borderRadius: 6, fontSize: 13, color: '#4B5563', lineHeight: 1.55 }}>
                <div style={{ color: '#111827', fontWeight: 500 }}>{client.company}</div>
                <div>{client.name} · {client.email}</div>
                <div style={{ marginTop: 4 }}>Default currency: {client.currency}</div>
              </div>
            )}
          </div>
        </Card>

        <Card style={{ marginBottom: 16 }}>
          <CardHeader title="Line items" />
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <Th>Description</Th>
                <Th align="right" style={{ width: 90 }}>Qty</Th>
                <Th align="right" style={{ width: 140 }}>Unit price</Th>
                <Th align="right" style={{ width: 140 }}>Amount</Th>
                <Th style={{ width: 40 }}></Th>
              </tr>
            </thead>
            <tbody>
              {lines.map(l => (
                <tr key={l.id}>
                  <Td><input value={l.desc} onChange={e => updateLine(l.id, 'desc', e.target.value)} style={inp} /></Td>
                  <Td><input type="number" value={l.qty} onChange={e => updateLine(l.id, 'qty', e.target.value)} style={{ ...inp, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }} /></Td>
                  <Td><input type="number" value={l.unit} onChange={e => updateLine(l.id, 'unit', e.target.value)} style={{ ...inp, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }} /></Td>
                  <Td align="right"><Money amount={l.qty * l.unit} currency={client.currency} /></Td>
                  <Td><button onClick={() => removeLine(l.id)} style={{ background: 'none', border: 0, color: '#9CA3AF', cursor: 'pointer', padding: 4 }}><Icon name="x" size={14} /></button></Td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ padding: '12px 20px', borderTop: '1px solid #F3F4F6' }}>
            <Button variant="ghost" size="sm" icon="plus" onClick={addLine}>Add line</Button>
          </div>
        </Card>

        <Card style={{ marginBottom: 16 }}>
          <CardHeader title="Details" />
          <div style={{ padding: '16px 20px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Field label="Invoice number"><input style={inp} value="INV-0143" readOnly /></Field>
            <Field label="Issue date"><input style={inp} type="date" defaultValue="2026-04-18" /></Field>
            <Field label="Due date"><input style={inp} type="date" defaultValue="2026-05-02" /></Field>
            <Field label="Payment terms">
              <Select value="net14" onChange={()=>{}} options={[{v:'net7',l:'Net 7'},{v:'net14',l:'Net 14'},{v:'net30',l:'Net 30'},{v:'due',l:'Due on receipt'}]} />
            </Field>
            <Field label="VAT rate (%)"><input style={{ ...inp, fontVariantNumeric: 'tabular-nums' }} type="number" value={vat} onChange={e => setVat(Number(e.target.value) || 0)} /></Field>
            <Field label="Currency"><Select value={client.currency} onChange={()=>{}} options={[{v:'NGN',l:'NGN — ₦'},{v:'USD',l:'USD — $'}]} /></Field>
            <div style={{ gridColumn: 'span 2' }}>
              <Field label="Notes (printed on invoice)">
                <textarea value={notes} onChange={e => setNotes(e.target.value)} style={{ ...inp, height: 72, padding: '10px 12px', resize: 'vertical' }} />
              </Field>
            </div>
          </div>
        </Card>
      </div>

      <div style={{ position: 'sticky', top: 20 }}>
        <Card>
          <CardHeader title="Summary" />
          <div style={{ padding: '16px 20px 20px' }}>
            <SumRow label="Subtotal"><Money amount={subtotal} currency={client.currency} /></SumRow>
            <SumRow label={`VAT (${vat}%)`}><Money amount={tax} currency={client.currency} /></SumRow>
            <div style={{ height: 1, background: '#E5E7EB', margin: '12px 0' }} />
            <SumRow big label="Total"><Money amount={total} currency={client.currency} bold style={{ color: '#1E2A44', fontSize: 18 }} /></SumRow>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 16 }}>
              <Button variant="primary" icon="send" onClick={onSave}>Save & send</Button>
              <Button variant="secondary" icon="eye">Preview</Button>
              <Button variant="ghost" onClick={onCancel}>Save draft</Button>
            </div>
          </div>
        </Card>
        <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 12, lineHeight: 1.55, padding: '0 4px' }}>
          Totals update as you edit line items. Sending locks the invoice and emails a PDF to {client.email}.
        </div>
      </div>

      {addClientOpen && <AddClientModal onClose={() => setAddClientOpen(false)} />}
    </div>
  );
};

const Field = ({ label, children }) => (
  <div>
    <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#4B5563', marginBottom: 6 }}>{label}</label>
    {children}
  </div>
);

const inp = {
  width: '100%', height: 36, padding: '0 12px',
  border: '1px solid #E5E7EB', borderRadius: 6, background: '#fff',
  fontFamily: 'inherit', fontSize: 13, color: '#111827', boxSizing: 'border-box',
};

const SumRow = ({ label, children, big }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: big ? '4px 0' : '6px 0' }}>
    <span style={{ fontSize: big ? 14 : 13, color: big ? '#111827' : '#4B5563', fontWeight: big ? 600 : 400 }}>{label}</span>
    {children}
  </div>
);

const AddClientModal = ({ onClose }) => (
  <div style={{ position: 'fixed', inset: 0, background: 'rgba(17,24,39,0.5)', display: 'grid', placeItems: 'center', zIndex: 100 }} onClick={onClose}>
    <div onClick={e => e.stopPropagation()} style={{
      width: 440, background: '#fff', borderRadius: 12,
      boxShadow: '0 24px 48px -12px rgba(17,24,39,0.25)',
    }}>
      <div style={{ padding: '18px 20px', borderBottom: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: '#111827' }}>Add new client</h3>
        <button onClick={onClose} style={{ background: 'none', border: 0, color: '#9CA3AF', cursor: 'pointer', padding: 4 }}><Icon name="x" size={18} /></button>
      </div>
      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Field label="Company name"><input style={inp} placeholder="e.g. BrightLab Studios" /></Field>
        <Field label="Contact name"><input style={inp} placeholder="e.g. Adaeze Okafor" /></Field>
        <Field label="Email"><input style={inp} placeholder="client@company.com" /></Field>
        <Field label="Default currency">
          <Select value="NGN" onChange={()=>{}} options={[{v:'NGN',l:'NGN — Nigerian Naira'},{v:'USD',l:'USD — US Dollar'}]} />
        </Field>
      </div>
      <div style={{ padding: '14px 20px', borderTop: '1px solid #F3F4F6', display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
        <Button variant="ghost" onClick={onClose}>Cancel</Button>
        <Button variant="primary" onClick={onClose}>Save client</Button>
      </div>
    </div>
  </div>
);

Object.assign(window, { InvoiceNew, Field, inp, AddClientModal });
