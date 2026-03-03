import { Search, Plus, Filter, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const POS_ORDERS = [
  { id: "PO-501", vendor: "TechSupply Co.", date: "Mar 1, 2026", items: 12, total: 4800.00, status: "Received" },
  { id: "PO-500", vendor: "Global Imports Ltd.", date: "Feb 28, 2026", items: 8, total: 2350.00, status: "In Transit" },
  { id: "PO-499", vendor: "EcoGoods Inc.", date: "Feb 27, 2026", items: 5, total: 1200.00, status: "Ordered" },
  { id: "PO-498", vendor: "Premium Parts", date: "Feb 25, 2026", items: 20, total: 6100.00, status: "Received" },
  { id: "PO-497", vendor: "QuickShip Wholesale", date: "Feb 24, 2026", items: 3, total: 890.00, status: "Cancelled" },
];

const STATUS_BADGE: Record<string, string> = {
  Received: "bg-success/10 text-success border-success/20",
  "In Transit": "bg-info/10 text-info border-info/20",
  Ordered: "bg-warning/10 text-warning border-warning/20",
  Cancelled: "bg-destructive/10 text-destructive border-destructive/20",
};

const PurchasesPage = () => {
  const [search, setSearch] = useState("");
  const filtered = POS_ORDERS.filter((o) => o.vendor.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold">Purchase Orders</h1><p className="text-sm text-muted-foreground">{POS_ORDERS.length} orders</p></div>
        <Button size="sm"><Plus className="w-4 h-4 mr-1" /> New Purchase</Button>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search purchases..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Button variant="outline" size="sm"><Filter className="w-4 h-4 mr-1" /> Filters</Button>
      </div>
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left text-xs font-semibold text-muted-foreground p-3 pl-4">PO #</th>
              <th className="text-left text-xs font-semibold text-muted-foreground p-3">Vendor</th>
              <th className="text-left text-xs font-semibold text-muted-foreground p-3">Date</th>
              <th className="text-right text-xs font-semibold text-muted-foreground p-3">Items</th>
              <th className="text-right text-xs font-semibold text-muted-foreground p-3">Total</th>
              <th className="text-left text-xs font-semibold text-muted-foreground p-3">Status</th>
              <th className="p-3 w-10"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((o) => (
              <tr key={o.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                <td className="p-3 pl-4 text-sm font-mono font-medium text-primary">{o.id}</td>
                <td className="p-3 text-sm font-medium">{o.vendor}</td>
                <td className="p-3 text-sm text-muted-foreground">{o.date}</td>
                <td className="p-3 text-sm text-right">{o.items}</td>
                <td className="p-3 text-sm text-right font-medium">${o.total.toFixed(2)}</td>
                <td className="p-3"><Badge variant="outline" className={`text-[10px] font-medium ${STATUS_BADGE[o.status]}`}>{o.status}</Badge></td>
                <td className="p-3"><button className="p-1 rounded hover:bg-muted text-muted-foreground"><MoreHorizontal className="w-4 h-4" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurchasesPage;
