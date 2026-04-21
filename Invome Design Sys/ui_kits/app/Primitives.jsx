// Shared primitives: Icon, Badge, Button, Money, formatters.
const Icon = ({ name, size = 20, stroke = 1.5, style, className }) => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (window.lucide && ref.current) window.lucide.createIcons({ attrs: { 'stroke-width': stroke, width: size, height: size }, nameAttr: 'data-lucide', icons: undefined });
  });
  return <i ref={ref} data-lucide={name} style={{ width: size, height: size, display: 'inline-flex', strokeWidth: stroke, ...style }} className={className} />;
};

const fmt = {
  ngn: (n) => '₦ ' + Number(n).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
  usd: (n) => '$ ' + Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
  money: (n, c) => c === 'USD' ? fmt.usd(n) : fmt.ngn(n),
  shortMoney: (n, c) => {
    const sym = c === 'USD' ? '$ ' : '₦ ';
    return sym + Number(n).toLocaleString(c === 'USD' ? 'en-US' : 'en-NG');
  },
  date: (s) => {
    const d = new Date(s);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  },
  dateShort: (s) => {
    const d = new Date(s);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  },
};

const STATUS_META = {
  paid:      { label: 'Paid',      bg: '#DCFCE7', fg: '#15803D' },
  sent:      { label: 'Sent',      bg: '#DBEAFE', fg: '#1D4ED8' },
  overdue:   { label: 'Overdue',   bg: '#FEF3C7', fg: '#B45309' },
  draft:     { label: 'Draft',     bg: '#F3F4F6', fg: '#4B5563' },
  cancelled: { label: 'Cancelled', bg: '#FEE2E2', fg: '#B91C1C' },
};

const Badge = ({ status, children }) => {
  const m = STATUS_META[status] || { label: children, bg: '#F3F4F6', fg: '#4B5563' };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      fontSize: 11, fontWeight: 600, lineHeight: 1,
      padding: '4px 9px', borderRadius: 9999,
      background: m.bg, color: m.fg,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }} />
      {m.label}
    </span>
  );
};

const btnBase = {
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
  fontFamily: 'inherit', fontSize: 14, fontWeight: 500, lineHeight: 1,
  height: 36, padding: '0 14px', borderRadius: 6, border: '1px solid transparent',
  cursor: 'pointer', transition: 'background 160ms, border-color 160ms, color 160ms',
  whiteSpace: 'nowrap',
};

const Button = ({ variant = 'secondary', size = 'md', icon, children, onClick, type = 'button', style, disabled }) => {
  const variants = {
    primary:   { background: '#1E2A44', color: '#fff' },
    secondary: { background: '#fff', color: '#111827', borderColor: '#E5E7EB' },
    ghost:     { background: 'transparent', color: '#4B5563' },
    danger:    { background: '#fff', color: '#B91C1C', borderColor: '#E5E7EB' },
  };
  const sizes = {
    sm: { height: 28, padding: '0 10px', fontSize: 12, borderRadius: 5 },
    md: {},
    lg: { height: 40, padding: '0 18px', fontSize: 14 },
  };
  const [hover, setHover] = React.useState(false);
  const hoverBg = {
    primary: '#141d31',
    secondary: '#F8FAFC',
    ghost: '#F3F4F6',
    danger: '#FEE2E2',
  }[variant];
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        ...btnBase, ...variants[variant], ...sizes[size],
        opacity: disabled ? 0.45 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        background: hover && !disabled ? hoverBg : variants[variant].background,
        ...style,
      }}
    >
      {icon && <Icon name={icon} size={size === 'sm' ? 14 : 16} />}
      {children}
    </button>
  );
};

const Money = ({ amount, currency = 'NGN', bold, muted, style }) => (
  <span style={{
    fontVariantNumeric: 'tabular-nums',
    fontWeight: bold ? 600 : 500,
    color: muted ? '#9CA3AF' : '#111827',
    ...style,
  }}>{fmt.money(amount, currency)}</span>
);

Object.assign(window, { Icon, fmt, STATUS_META, Badge, Button, Money });
