import { useState } from "react";
import { Search, Plus, Filter, Download, MoreHorizontal, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const ITEMS = [
  { id: "ITM-001", name: "Wireless Earbuds Pro", sku: "WEP-001", category: "Electronics", stock: 142, price: 59.99, status: "In Stock" },
  { id: "ITM-002", name: "Organic Coffee Blend", sku: "OCB-010", category: "Food & Beverage", stock: 8, price: 29.99, status: "Low Stock" },
  { id: "ITM-003", name: "USB-C Hub Adapter", sku: "UHA-005", category: "Electronics", stock: 87, price: 49.99, status: "In Stock" },
  { id: "ITM-004", name: "Bamboo Water Bottle", sku: "BWB-020", category: "Lifestyle", stock: 0, price: 19.99, status: "Out of Stock" },
  { id: "ITM-005", name: "LED Desk Lamp", sku: "LDL-015", category: "Home & Office", stock: 65, price: 39.99, status: "In Stock" },
  { id: "ITM-006", name: "Bluetooth Speaker", sku: "BTS-003", category: "Electronics", stock: 33, price: 79.99, status: "In Stock" },
  { id: "ITM-007", name: "Phone Case Premium", sku: "PCP-012", category: "Accessories", stock: 5, price: 24.99, status: "Low Stock" },
  { id: "ITM-008", name: "Laptop Stand Aluminum", sku: "LSA-007", category: "Home & Office", stock: 21, price: 69.99, status: "In Stock" },
];

const STATUS_BADGE: Record<string, string> = {
  "In Stock": "bg-success/10 text-success border-success/20",
  "Low Stock": "bg-warning/10 text-warning border-warning/20",
  "Out of Stock": "bg-destructive/10 text-destructive border-destructive/20",
};

const InventoryPage = () => {
  const [search, setSearch] = useState("");
  const filtered = ITEMS.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()) || i.sku.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Inventory</h1>
          <p className="text-sm text-muted-foreground">{ITEMS.length} items · 3 categories</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-1" /> Export</Button>
          <Button size="sm"><Plus className="w-4 h-4 mr-1" /> Add Item</Button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search items..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Button variant="outline" size="sm"><Filter className="w-4 h-4 mr-1" /> Filters</Button>
      </div>

      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left text-xs font-semibold text-muted-foreground p-3 pl-4">Item</th>
              <th className="text-left text-xs font-semibold text-muted-foreground p-3">SKU</th>
              <th className="text-left text-xs font-semibold text-muted-foreground p-3">Category</th>
              <th className="text-right text-xs font-semibold text-muted-foreground p-3">Stock</th>
              <th className="text-right text-xs font-semibold text-muted-foreground p-3">Price</th>
              <th className="text-left text-xs font-semibold text-muted-foreground p-3">Status</th>
              <th className="p-3 w-10"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                <td className="p-3 pl-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-md bg-muted flex items-center justify-center">
                      <Package className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                </td>
                <td className="p-3 text-sm font-mono text-muted-foreground">{item.sku}</td>
                <td className="p-3 text-sm text-muted-foreground">{item.category}</td>
                <td className="p-3 text-sm text-right font-medium">{item.stock}</td>
                <td className="p-3 text-sm text-right font-medium">${item.price.toFixed(2)}</td>
                <td className="p-3">
                  <Badge variant="outline" className={`text-[10px] font-medium ${STATUS_BADGE[item.status]}`}>{item.status}</Badge>
                </td>
                <td className="p-3">
                  <button className="p-1 rounded hover:bg-muted text-muted-foreground"><MoreHorizontal className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryPage;
