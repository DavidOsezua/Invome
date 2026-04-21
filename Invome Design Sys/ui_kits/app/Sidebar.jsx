// Sidebar — persistent left nav, 232px.
const Sidebar = ({ view, onNav, onNewInvoice }) => {
  const items = [
    { id: 'dashboard', label: 'Dashboard', icon: 'layout-dashboard' },
    { id: 'invoices',  label: 'Invoices',  icon: 'file-text' },
    { id: 'clients',   label: 'Clients',   icon: 'users' },
    { id: 'reports',   label: 'Reports',   icon: 'bar-chart-2' },
    { id: 'settings',  label: 'Settings',  icon: 'settings' },
  ];
  const isActive = (id) => {
    if (id === 'invoices') return view === 'invoices' || view === 'invoice-new' || view === 'invoice-detail';
    if (id === 'clients') return view === 'clients';
    return view === id;
  };
  return (
    <aside style={{
      width: 232, flexShrink: 0, background: '#fff',
      borderRight: '1px solid #E5E7EB', padding: '20px 14px',
      display: 'flex', flexDirection: 'column', height: '100vh', position: 'sticky', top: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 8px 18px', borderBottom: '1px solid #F3F4F6', marginBottom: 14 }}>
        <div style={{ width: 28, height: 28, borderRadius: 6, background: '#1E2A44', display: 'grid', placeItems: 'center' }}>
          <svg width="17" height="17" viewBox="0 0 32 32" fill="none"><path d="M10 9.5v13M22 9.5v13M10 9.5l12 13" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <b style={{ fontSize: 15, fontWeight: 600, color: '#111827', letterSpacing: '-0.01em' }}>Invome</b>
      </div>
      <Button variant="primary" icon="plus" onClick={onNewInvoice} style={{ width: '100%', marginBottom: 18 }}>New invoice</Button>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {items.map((it) => {
          const active = isActive(it.id);
          return <NavItem key={it.id} {...it} active={active} onClick={() => onNav(it.id)} />;
        })}
      </nav>
      <div style={{ marginTop: 'auto', paddingTop: 14, borderTop: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#1E2A44', color: '#fff', display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 600 }}>OA</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: '#111827', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Ọlámidé Adébáyọ̀</div>
          <div style={{ fontSize: 11, color: '#9CA3AF' }}>BrightLab Studios</div>
        </div>
      </div>
    </aside>
  );
};

const NavItem = ({ label, icon, active, onClick }) => {
  const [hover, setHover] = React.useState(false);
  return (
    <a href="#" onClick={(e) => { e.preventDefault(); onClick(); }}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px',
        fontSize: 13, fontWeight: 500, textDecoration: 'none', borderRadius: 6,
        color: active ? '#111827' : '#4B5563',
        background: active || hover ? '#F3F4F6' : 'transparent',
        transition: 'background 160ms',
      }}>
      <Icon name={icon} size={16} style={{ color: active ? '#1E2A44' : '#9CA3AF' }} />
      {label}
    </a>
  );
};

window.Sidebar = Sidebar;
