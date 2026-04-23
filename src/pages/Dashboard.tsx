import { Clock, CheckCircle2, AlertTriangle, Users } from "lucide-react";
import { clients, invoices, revenue } from "../data/mock";
import { Card, CardHeader } from "../components/ui/card";
import { Th, Td } from "../components/ui/table";
import { StatusBadge } from "../utils/status-badge";
import { Button } from "../components/ui/button";
import { PageHeader } from "../layout/PageHeader";
import { formatMoney } from "../utils/money";
import { formatDate } from "../utils/fmt";
import { cn } from "../lib/utils";
import type { LucideIcon } from "lucide-react";
import type { RevenueDataPoint } from "../types";

export function Dashboard() {
  const outstanding = invoices
    .filter((i) => i.status === "sent" || i.status === "overdue")
    .reduce(
      (s, i) => s + (i.currency === "NGN" ? i.amount : i.amount * 1500),
      0,
    );

  const paidThisMonth = invoices
    .filter((i) => i.status === "paid" && i.due.startsWith("2026-04"))
    .reduce(
      (s, i) => s + (i.currency === "NGN" ? i.amount : i.amount * 1500),
      0,
    );

  const overdueCount = invoices.filter((i) => i.status === "overdue").length;
  const recent = invoices.slice(0, 5);

  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle="An overview of your invoicing activity."
      />

      <div className="grid grid-cols-4 gap-3.5 mb-6">
        <StatCard
          label="Outstanding"
          value={formatMoney(outstanding)}
          sub="Across 2 invoices"
          Icon={Clock}
          tint="red"
        />
        <StatCard
          label="Paid this month"
          value={formatMoney(paidThisMonth)}
          sub={
            <span>
              <b className="text-success-fg">↑ 18%</b> vs last month
            </span>
          }
          Icon={CheckCircle2}
          tint="green"
        />
        <StatCard
          label="Overdue"
          value={overdueCount}
          sub="1 over 14 days"
          Icon={AlertTriangle}
        />
        <StatCard
          label="Total clients"
          value={clients.length}
          sub="+2 this month"
          Icon={Users}
        />
      </div>

      <div
        className="grid gap-4 mb-4"
        style={{ gridTemplateColumns: "1.6fr 1fr" }}
      >
        <Card>
          <CardHeader
            title="Revenue"
            action={
              <Button variant="ghost" size="sm">
                Last 6 months
              </Button>
            }
          />
          <RevenueChart data={revenue} />
        </Card>

        <Card>
          <CardHeader title="Overdue attention" />
          <div className="px-5 pb-5 pt-1">
            {invoices
              .filter((i) => i.status === "overdue")
              .map((inv) => {
                const client = clients.find((c) => c.id === inv.clientId)!;
                const days = Math.floor(
                  (new Date("2026-04-18").getTime() -
                    new Date(inv.due).getTime()) /
                    86400000,
                );
                return (
                  <div
                    key={inv.id}
                    className="flex justify-between items-center py-2.5 border-b border-surface-muted cursor-pointer last:border-0"
                  >
                    <div>
                      <div className="text-[13px] font-medium text-foreground">
                        {client.company}
                      </div>
                      <div className="text-xs text-warning-fg mt-0.5">
                        {days} days past due
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="t-num text-sm font-semibold text-foreground">
                        {formatMoney(inv.amount, inv.currency)}
                      </div>
                      <div className="t-num text-[11px] text-muted-foreground mt-0.5">
                        {inv.id}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader
          title="Recent invoices"
          action={
            <Button variant="ghost" size="sm">
              View all →
            </Button>
          }
        />
        <table className="w-full border-collapse text-[13px]">
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
            {recent.map((inv) => {
              const client = clients.find((c) => c.id === inv.clientId)!;
              return (
                <tr
                  key={inv.id}
                  className="cursor-pointer hover:bg-canvas transition-colors"
                >
                  <Td>
                    <span className="t-num font-medium">{inv.id}</span>
                  </Td>
                  <Td>
                    {client.company}
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {client.name}
                    </div>
                  </Td>
                  <Td align="right">
                    <span className="t-num">
                      {formatMoney(inv.amount, inv.currency)}
                    </span>
                  </Td>
                  <Td>
                    <StatusBadge status={inv.status} />
                  </Td>
                  <Td>
                    <span className="t-num text-secondary-foreground">
                      {formatDate(inv.due)}
                    </span>
                  </Td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string | number;
  sub: React.ReactNode;
  Icon: LucideIcon;
  tint?: "red" | "green";
}

function StatCard({ label, value, sub, Icon, tint }: StatCardProps) {
  return (
    <div
      className={cn(
        "border rounded-md p-4.5 shadow-xs",
        tint === "red" && "bg-outstanding-tint border-[rgba(254,202,202,0.5)]",
        tint === "green" && "bg-paid-tint border-[rgba(187,247,208,0.5)]",
        !tint && "bg-white border-border",
      )}
    >
      <div className="flex justify-between items-center mb-3.5">
        <span className="text-xs font-medium text-secondary-foreground">
          {label}
        </span>
        <span
          className={cn(
            "w-7 h-7 rounded-md grid place-items-center",
            tint === "red" && "bg-danger-bg text-danger-fg",
            tint === "green" && "bg-success-bg text-success-fg",
            !tint && "bg-surface-muted text-secondary-foreground",
          )}
        >
          <Icon size={16} />
        </span>
      </div>
      <div className="t-num text-2xl font-semibold text-foreground tracking-tight leading-none">
        {value}
      </div>
      <div className="t-num text-xs text-secondary-foreground mt-1.5">
        {sub}
      </div>
    </div>
  );
}

interface RevenueChartProps {
  data: RevenueDataPoint[];
}

function RevenueChart({ data }: RevenueChartProps) {
  const max = Math.max(...data.map((d) => d.value));
  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div className="px-5 pb-5 pt-4">
      <div className="t-num text-[28px] font-semibold text-foreground tracking-tight mb-4.5">
        ₦{"\u2009"}
        {total.toLocaleString("en-NG")}
        <span className="text-[13px] font-normal text-secondary-foreground ml-2.5">
          total billed
        </span>
      </div>
      <div className="flex items-end gap-4.5 h-40 border-b border-border pb-1">
        {data.map((d, i) => (
          <div
            key={i}
            className="flex-1 flex flex-col items-center gap-2 h-full justify-end"
          >
            <div className="t-num text-[11px] text-secondary-foreground font-medium">
              {(d.value / 1_000_000).toFixed(1)}M
            </div>
            <div
              className={cn(
                "w-full rounded-t-sm transition-colors",
                i === data.length - 1 ? "bg-ink-blue" : "bg-border",
              )}
              style={{ height: `${(d.value / max) * 100}%` }}
            />
          </div>
        ))}
      </div>
      <div className="flex gap-4.5 mt-2">
        {data.map((d, i) => (
          <div
            key={i}
            className="flex-1 text-center t-num text-[11px] text-muted-foreground font-medium"
          >
            {d.month}
          </div>
        ))}
      </div>
    </div>
  );
}
