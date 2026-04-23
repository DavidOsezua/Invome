import {
  LayoutDashboard,
  FileText,
  Users,
  BarChart2,
  Settings,
  Plus,
} from "lucide-react";
import { cn } from "../lib/utils";
import { NavLink, useLocation } from "react-router-dom";

const navItems = [
  { id: "dashboard" as const, label: "Dashboard", Icon: LayoutDashboard },
  { id: "invoices" as const, label: "Invoices", Icon: FileText },
  { id: "clients" as const, label: "Clients", Icon: Users },
  { id: "reports" as const, label: "Reports", Icon: BarChart2 },
  { id: "settings" as const, label: "Settings", Icon: Settings },
];

export function Sidebar() {
  const location = useLocation();
  console.log(location.pathname);

  return (
    <aside className="w-58 shrink-0 bg-sidebar flex flex-col h-screen sticky top-0 py-5 px-3.5">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-2 pb-4.5 border-b border-sidebar-border mb-3.5">
        <div className="w-7 h-7 rounded-md bg-white/10 grid place-items-center shrink-0">
          <svg width="17" height="17" viewBox="0 0 32 32" fill="none">
            <path
              d="M10 9.5v13M22 9.5v13M10 9.5l12 13"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span className="text-[15px] font-semibold text-sidebar-foreground tracking-tight">
          Invome
        </span>
      </div>

      {/* New invoice */}
      <NavLink
        to={"newinvoice"}
        className="w-full mb-4.5 h-9 flex items-center justify-center gap-2 rounded-sm border border-white/20 text-sidebar-foreground text-sm font-medium hover:bg-sidebar-accent transition-colors cursor-pointer"
      >
        <Plus size={16} />
        New invoice
      </NavLink>

      {/* Nav */}
      <nav className="flex flex-col gap-0.5">
        {navItems.map(({ id, label, Icon }) => {
          const active = location.pathname === `/app/${id}`;
          return (
            <NavLink
              to={`${id}`}
              key={id}
              className={cn(
                "flex items-center gap-2.5 px-2.5 py-2 text-[13px] font-medium rounded-sm transition-colors text-left w-full cursor-pointer",
                active
                  ? "bg-sidebar-accent text-sidebar-foreground"
                  : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground",
              )}
            >
              <Icon size={16} />
              {label}
            </NavLink>
          );
        })}
      </nav>

      {/* User footer */}
      <div className="mt-auto pt-3.5 border-t border-sidebar-border flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-full bg-white/10 grid place-items-center text-xs font-semibold text-sidebar-foreground shrink-0">
          OA
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[13px] font-medium text-sidebar-foreground truncate">
            Ọlámidé Adébáyọ̀
          </div>
          <div className="text-[11px] text-sidebar-foreground/50">
            BrightLab Studios
          </div>
        </div>
      </div>
    </aside>
  );
}
