// Shared layout atoms: Card, CardHeader, Header, Th, Td.
const Card = ({ children, style, padding }) => (
  <div style={{
    background: '#fff',
    border: '1px solid #E5E7EB',
    borderRadius: 8,
    boxShadow: '0 1px 2px rgba(17,24,39,0.04)',
    padding,
    ...style,
  }}>{children}</div>
);

const CardHeader = ({ title, action }) => (
  <div style={{ padding: '16px 20px', borderBottom: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
    <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: '#111827', letterSpacing: '-0.01em' }}>{title}</h3>
    {action}
  </div>
);

const Header = ({ title, subtitle, action }) => (
  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
    <div>
      <h1 style={{ margin: 0, fontSize: 24, fontWeight: 600, color: '#111827', letterSpacing: '-0.01em', lineHeight: 1.2 }}>{title}</h1>
      {subtitle && <p style={{ margin: '4px 0 0', fontSize: 14, color: '#4B5563' }}>{subtitle}</p>}
    </div>
    {action}
  </div>
);

const Th = ({ children, align = 'left', style }) => (
  <th style={{
    textAlign: align, padding: '10px 20px', background: '#F8FAFC',
    fontSize: 11, fontWeight: 600, color: '#4B5563',
    letterSpacing: '0.04em', textTransform: 'uppercase',
    borderBottom: '1px solid #E5E7EB', borderTop: '1px solid #F3F4F6',
    ...style,
  }}>{children}</th>
);

const Td = ({ children, align = 'left', style }) => (
  <td style={{
    textAlign: align, padding: '13px 20px',
    borderBottom: '1px solid #F3F4F6', color: '#111827', verticalAlign: 'middle',
    ...style,
  }}>{children}</td>
);

Object.assign(window, { Card, CardHeader, Header, Th, Td });
