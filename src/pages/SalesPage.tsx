import { Search, Plus, Filter, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const ORDERS = [
  { id: "SO-1042", customer: "Emily Watson", date: "Mar 2, 2026", items: 3, total: 245.00, status: "Fulfilled" },
  { id: "SO-1041", customer: "James Lee", date: "Mar 2, 2026", items: 1, total: 89.50, status: "Processing" },
  { id: "SO-1040", customer: "Maria Garcia", date: "Mar 1, 2026", items: 5, total: 412.00, status: "Shipped" },
  { id: "SO-1039", customer: "Alex Kim", date: "Mar 1, 2026", items: 2, total: 67.25, status: "Fulfilled" },
  { id: "SO-1038", customer: "Sarah Johnson", date: "Feb 28, 2026", items: 1, total: 198.00, status: "Returned" },
  { id: "SO-1037", customer: "David Brown", date: "Feb 28, 2026", items: 4, total: 325.50, status: "Processing" },
  { id: "SO-1036", customer: "Lisa Chen", date: "Feb 27, 2026", items: 2, total: 156.00, status: "Fulfilled" },
];

const STATUS_BADGE: Record<string, string> = {
  Fulfilled: "bg-success/10 text-success border-success/20",
  Processing: "bg-info/10 text-info border-info/20",
  Shipped: "bg-primary/10 text-primary border-primary/20",
  Returned: "bg-destructive/10 text-destructive border-destructive/20",
};

const SalesPage = () => {
  const [search, setSearch] = useState("");
  const filtered = ORDERS.filter((o) => o.customer.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold">Sales Orders</h1><p className="text-sm text-muted-foreground">{ORDERS.length} orders this week</p></div>
        <Button size="sm"><Plus className="w-4 h-4 mr-1" /> New Order</Button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search orders..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Button variant="outline" size="sm"><Filter className="w-4 h-4 mr-1" /> Filters</Button>
      </div>

      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left text-xs font-semibold text-muted-foreground p-3 pl-4">Order</th>
              <th className="text-left text-xs font-semibold text-muted-foreground p-3">Customer</th>
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
                <td className="p-3 text-sm font-medium">{o.customer}</td>
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

export default SalesPage;
