// Settings — tabbed layout.
const Settings = () => {
  const [tab, setTab] = React.useState('business');
  const tabs = [
    { id: 'profile',  label: 'Profile' },
    { id: 'business', label: 'Business' },
    { id: 'tax',      label: 'Tax' },
    { id: 'defaults', label: 'Invoice defaults' },
  ];
  return (
    <div>
      <Header title="Settings" subtitle="Manage your profile, business, and invoice defaults." />
      <Card>
        <div style={{ display: 'flex', gap: 2, padding: '10px 20px 0', borderBottom: '1px solid #F3F4F6' }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              background: 'none', border: 0, padding: '10px 14px',
              fontFamily: 'inherit', fontSize: 13, fontWeight: 500,
              color: tab === t.id ? '#111827' : '#4B5563', cursor: 'pointer',
              borderBottom: `2px solid ${tab === t.id ? '#1E2A44' : 'transparent'}`,
              marginBottom: -1,
            }}>{t.label}</button>
          ))}
        </div>
        <div style={{ padding: 24, maxWidth: 640 }}>
          {tab === 'business' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <Field label="Business name"><input style={inp} defaultValue="BrightLab Studios" /></Field>
              <Field label="Address"><input style={inp} defaultValue="12 Awolowo Road, Ikoyi, Lagos" /></Field>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <Field label="Phone"><input style={inp} defaultValue="+234 801 234 5678" /></Field>
                <Field label="Website"><input style={inp} defaultValue="brightlab.ng" /></Field>
              </div>
              <Field label="Bank account">
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 10 }}>
                  <input style={inp} defaultValue="Guaranty Trust Bank" />
                  <input style={{ ...inp, fontVariantNumeric: 'tabular-nums' }} defaultValue="0123 456 789" />
                </div>
              </Field>
            </div>
          )}
          {tab === 'profile' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <Field label="Full name"><input style={inp} defaultValue="Ọlámidé Adébáyọ̀" /></Field>
              <Field label="Email"><input style={inp} defaultValue="olamide@brightlab.ng" /></Field>
            </div>
          )}
          {tab === 'tax' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <Field label="VAT rate (%)"><input style={{ ...inp, fontVariantNumeric: 'tabular-nums' }} defaultValue="7.5" /></Field>
              <Field label="TIN (Tax ID)"><input style={{ ...inp, fontVariantNumeric: 'tabular-nums' }} defaultValue="12345678-0001" /></Field>
            </div>
          )}
          {tab === 'defaults' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <Field label="Default payment terms">
                <Select value="net14" onChange={()=>{}} options={[{v:'net7',l:'Net 7'},{v:'net14',l:'Net 14'},{v:'net30',l:'Net 30'}]} />
              </Field>
              <Field label="Invoice number prefix"><input style={inp} defaultValue="INV-" /></Field>
              <Field label="Default notes">
                <textarea style={{ ...inp, height: 80, padding: '10px 12px' }} defaultValue="Thank you for the work. Payment due within 14 days of issue." />
              </Field>
            </div>
          )}
        </div>
        <div style={{ padding: '14px 20px', borderTop: '1px solid #F3F4F6', display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <Button variant="ghost">Cancel</Button>
          <Button variant="primary">Save changes</Button>
        </div>
      </Card>
    </div>
  );
};

window.Settings = Settings;
