import { useState } from "react";
import { Plus, X, Send, Eye } from "lucide-react";
import { clients } from "../data/mock";
import { Card, CardHeader } from "../components/ui/card";
import { Th, Td } from "../components/ui/table";
import { Select } from "../components/ui/select";
import { Input, Textarea, Field } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { PageHeader } from "../layout/PageHeader";
import { formatMoney } from "../utils/money";

interface InvoiceNewProps {
  onCancel?: () => void;
  onSave?: () => void;
}

interface LineItem {
  id?: number;
  desc?: string;
  qty?: number;
  unit?: number;
}

export function InvoiceNew({ onCancel, onSave }: InvoiceNewProps) {
  const [clientId, setClientId] = useState("c1");
  const [addClientOpen, setAddClientOpen] = useState(false);
  const [lines, setLines] = useState<LineItem[]>([
    { id: 1, desc: "Brand identity — logo & marks", qty: 1, unit: 250000 },
    { id: 2, desc: "Landing page design (5 screens)", qty: 5, unit: 40000 },
    { id: 3, desc: "Revision round", qty: 2, unit: 25000 },
  ]);
  const [notes, setNotes] = useState(
    "Thank you for the work. Payment due within 14 days of issue.",
  );
  const [vat, setVat] = useState(7.5);

  const client = clients.find((c) => c.id === clientId)!;
  const subtotal = lines.reduce((s, l) => s + l.qty * l.unit, 0);
  const tax = (subtotal * vat) / 100;
  const total = subtotal + tax;

  const addLine = () =>
    setLines([...lines, { id: Date.now(), desc: "", qty: 1, unit: 0 }]);
  const updateLine = (id: number, k: keyof LineItem, v: string) =>
    setLines(
      lines.map((l) =>
        l.id === id ? { ...l, [k]: k === "desc" ? v : Number(v) || 0 } : l,
      ),
    );
  const removeLine = (id: number) => setLines(lines.filter((l) => l.id !== id));

  return (
    <div
      className="grid gap-5 items-start"
      style={{ gridTemplateColumns: "1fr 320px" }}
    >
      <div>
        <PageHeader
          title="New invoice"
          subtitle="Invoice #INV-0143 · auto-generated"
        />

        <Card className="mb-4">
          <CardHeader
            title="Client"
            action={
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setAddClientOpen(true)}
              >
                <Plus size={14} />
                Add new client
              </Button>
            }
          />
          <div className="p-5">
            <Field label="Bill to">
              <Select
                value={clientId}
                onChange={setClientId}
                options={clients.map((c) => ({
                  value: c.id,
                  label: `${c.company} — ${c.name}`,
                }))}
              />
            </Field>
            {client && (
              <div className="mt-3 p-3.5 bg-canvas rounded-sm text-[13px] text-secondary-foreground leading-relaxed">
                <div className="text-foreground font-medium">
                  {client.company}
                </div>
                <div>
                  {client.name} · {client.email}
                </div>
                <div className="mt-1">Default currency: {client.currency}</div>
              </div>
            )}
          </div>
        </Card>

        <Card className="mb-4">
          <CardHeader title="Line items" />
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <Th>Description</Th>
                <Th align="right" className="w-[90px]">
                  Qty
                </Th>
                <Th align="right" className="w-[140px]">
                  Unit price
                </Th>
                <Th align="right" className="w-[140px]">
                  Amount
                </Th>
                <Th className="w-10" />
              </tr>
            </thead>
            <tbody>
              {lines.map((l) => (
                <tr key={l.id}>
                  <Td>
                    <Input
                      value={l.desc}
                      onChange={(e) => updateLine(l.id, "desc", e.target.value)}
                    />
                  </Td>
                  <Td>
                    <Input
                      type="number"
                      value={l.qty}
                      onChange={(e) => updateLine(l.id, "qty", e.target.value)}
                      className="text-right t-num"
                    />
                  </Td>
                  <Td>
                    <Input
                      type="number"
                      value={l.unit}
                      onChange={(e) => updateLine(l.id, "unit", e.target.value)}
                      className="text-right t-num"
                    />
                  </Td>
                  <Td align="right">
                    <span className="t-num">
                      {formatMoney(l.qty * l.unit, client.currency)}
                    </span>
                  </Td>
                  <Td>
                    <button
                      onClick={() => removeLine(l.id)}
                      className="bg-transparent border-0 text-muted-foreground cursor-pointer p-1 hover:text-foreground"
                    >
                      <X size={14} />
                    </button>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-5 py-3 border-t border-surface-muted">
            <Button variant="ghost" size="sm" onClick={addLine}>
              <Plus size={14} />
              Add line
            </Button>
          </div>
        </Card>

        <Card className="mb-4">
          <CardHeader title="Details" />
          <div className="p-5 grid grid-cols-2 gap-4">
            <Field label="Invoice number">
              <Input value="INV-0143" readOnly />
            </Field>
            <Field label="Issue date">
              <Input type="date" defaultValue="2026-04-18" />
            </Field>
            <Field label="Due date">
              <Input type="date" defaultValue="2026-05-02" />
            </Field>
            <Field label="Payment terms">
              <Select
                value="net14"
                onChange={() => {}}
                options={[
                  { value: "net7", label: "Net 7" },
                  { value: "net14", label: "Net 14" },
                  { value: "net30", label: "Net 30" },
                  { value: "due", label: "Due on receipt" },
                ]}
              />
            </Field>
            <Field label="VAT rate (%)">
              <Input
                type="number"
                value={vat}
                onChange={(e) => setVat(Number(e.target.value) || 0)}
                className="t-num"
              />
            </Field>
            <Field label="Currency">
              <Select
                value={client.currency}
                onChange={() => {}}
                options={[
                  { value: "NGN", label: "NGN — ₦" },
                  { value: "USD", label: "USD — $" },
                ]}
              />
            </Field>
            <div className="col-span-2">
              <Field label="Notes (printed on invoice)">
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="h-[72px]"
                />
              </Field>
            </div>
          </div>
        </Card>
      </div>

      {/* Sticky summary */}
      <div className="sticky top-5">
        <Card>
          <CardHeader title="Summary" />
          <div className="p-5">
            <SumRow label="Subtotal">
              <span className="t-num">
                {formatMoney(subtotal, client.currency)}
              </span>
            </SumRow>
            <SumRow label={`VAT (${vat}%)`}>
              <span className="t-num">{formatMoney(tax, client.currency)}</span>
            </SumRow>
            <div className="h-px bg-border my-3" />
            <SumRow label="Total" big>
              <span className="t-num text-[18px] font-bold text-ink-blue">
                {formatMoney(total, client.currency)}
              </span>
            </SumRow>
            <div className="flex flex-col gap-2 mt-4">
              <Button variant="default" className="w-full" onClick={onSave}>
                <Send size={16} />
                Save & send
              </Button>
              <Button variant="outline" className="w-full">
                <Eye size={16} />
                Preview
              </Button>
              <Button variant="ghost" className="w-full" onClick={onCancel}>
                Save draft
              </Button>
            </div>
          </div>
        </Card>
        <p className="text-xs text-muted-foreground mt-3 leading-relaxed px-1">
          Totals update as you edit line items. Sending locks the invoice and
          emails a PDF to {client.email}.
        </p>
      </div>

      {addClientOpen && (
        <AddClientModal onClose={() => setAddClientOpen(false)} />
      )}
    </div>
  );
}

interface SumRowProps {
  label: string;
  children: React.ReactNode;
  big?: boolean;
}

function SumRow({ label, children, big }: SumRowProps) {
  return (
    <div className="flex justify-between items-center py-1.5">
      <span
        className={
          big
            ? "text-[14px] font-semibold text-foreground"
            : "text-[13px] text-secondary-foreground"
        }
      >
        {label}
      </span>
      {children}
    </div>
  );
}

function AddClientModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 bg-foreground/50 grid place-items-center z-50"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[440px] bg-white rounded-lg shadow-lg"
      >
        <div className="flex items-center justify-between px-5 py-[18px] border-b border-surface-muted">
          <h3 className="m-0 text-base font-semibold text-foreground">
            Add new client
          </h3>
          <button
            onClick={onClose}
            className="bg-transparent border-0 text-muted-foreground cursor-pointer p-1"
          >
            <X size={18} />
          </button>
        </div>
        <div className="p-5 flex flex-col gap-3.5">
          <Field label="Company name">
            <Input placeholder="e.g. BrightLab Studios" />
          </Field>
          <Field label="Contact name">
            <Input placeholder="e.g. Adaeze Okafor" />
          </Field>
          <Field label="Email">
            <Input placeholder="client@company.com" />
          </Field>
          <Field label="Default currency">
            <Select
              value="NGN"
              onChange={() => {}}
              options={[
                { value: "NGN", label: "NGN — Nigerian Naira" },
                { value: "USD", label: "USD — US Dollar" },
              ]}
            />
          </Field>
        </div>
        <div className="flex justify-end gap-2 px-5 py-3.5 border-t border-surface-muted">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="default" onClick={onClose}>
            Save client
          </Button>
        </div>
      </div>
    </div>
  );
}
