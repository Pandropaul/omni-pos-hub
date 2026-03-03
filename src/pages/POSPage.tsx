import { useState } from "react";
import { Search, Plus, Minus, Trash2, CreditCard, Banknote, Smartphone, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  sku: string;
}

const CATALOG = [
  { id: "1", name: "Wireless Earbuds Pro", price: 59.99, sku: "WEP-001" },
  { id: "2", name: "Organic Coffee Blend", price: 29.99, sku: "OCB-010" },
  { id: "3", name: "USB-C Hub Adapter", price: 49.99, sku: "UHA-005" },
  { id: "4", name: "Bamboo Water Bottle", price: 19.99, sku: "BWB-020" },
  { id: "5", name: "LED Desk Lamp", price: 39.99, sku: "LDL-015" },
  { id: "6", name: "Bluetooth Speaker", price: 79.99, sku: "BTS-003" },
  { id: "7", name: "Phone Case Premium", price: 24.99, sku: "PCP-012" },
  { id: "8", name: "Laptop Stand Aluminum", price: 69.99, sku: "LSA-007" },
  { id: "9", name: "Wireless Charger Pad", price: 34.99, sku: "WCP-008" },
  { id: "10", name: "Noise Cancel Headset", price: 149.99, sku: "NCH-002" },
  { id: "11", name: "Mechanical Keyboard", price: 89.99, sku: "MKB-004" },
  { id: "12", name: "Webcam HD 1080p", price: 54.99, sku: "WHD-009" },
];

const POSPage = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [search, setSearch] = useState("");

  const filtered = CATALOG.filter(
    (p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = (item: (typeof CATALOG)[0]) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) return prev.map((c) => (c.id === item.id ? { ...c, qty: c.qty + 1 } : c));
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const updateQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev.map((c) => (c.id === id ? { ...c, qty: Math.max(0, c.qty + delta) } : c)).filter((c) => c.qty > 0)
    );
  };

  const removeItem = (id: string) => setCart((prev) => prev.filter((c) => c.id !== id));

  const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div className="flex gap-4 h-[calc(100vh-7.5rem)]">
      {/* Product grid */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search products or scan barcode..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
        </div>

        <div className="flex-1 overflow-auto grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 content-start">
          {filtered.map((item) => (
            <button
              key={item.id}
              onClick={() => addToCart(item)}
              className="stat-card text-left p-4 hover:border-primary/40 cursor-pointer active:scale-[0.98] transition-transform"
            >
              <div className="w-full aspect-square bg-muted rounded-md mb-3 flex items-center justify-center">
                <ShoppingCart className="w-8 h-8 text-muted-foreground/40" />
              </div>
              <p className="text-sm font-medium truncate">{item.name}</p>
              <p className="text-xs text-muted-foreground font-mono">{item.sku}</p>
              <p className="text-sm font-bold text-primary mt-1">${item.price.toFixed(2)}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Cart */}
      <div className="w-80 xl:w-96 bg-card border border-border rounded-lg flex flex-col">
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold text-sm">Current Sale</h3>
          <p className="text-xs text-muted-foreground">{cart.length} items</p>
        </div>

        <div className="flex-1 overflow-auto p-3 space-y-2">
          {cart.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <ShoppingCart className="w-10 h-10 mb-2 opacity-30" />
              <p className="text-sm">Cart is empty</p>
              <p className="text-xs">Tap products to add</p>
            </div>
          )}
          {cart.map((item) => (
            <div key={item.id} className="flex items-center gap-2 p-2 rounded-md bg-muted/50">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{item.name}</p>
                <p className="text-xs text-muted-foreground">${item.price.toFixed(2)} each</p>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => updateQty(item.id, -1)} className="w-6 h-6 rounded bg-background border border-border flex items-center justify-center hover:bg-muted">
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-8 text-center text-sm font-medium">{item.qty}</span>
                <button onClick={() => updateQty(item.id, 1)} className="w-6 h-6 rounded bg-background border border-border flex items-center justify-center hover:bg-muted">
                  <Plus className="w-3 h-3" />
                </button>
              </div>
              <p className="text-sm font-semibold w-16 text-right">${(item.price * item.qty).toFixed(2)}</p>
              <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-border space-y-2">
          <div className="flex justify-between text-sm"><span className="text-muted-foreground">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
          <div className="flex justify-between text-sm"><span className="text-muted-foreground">Tax (8%)</span><span>${tax.toFixed(2)}</span></div>
          <div className="flex justify-between text-base font-bold pt-2 border-t border-border"><span>Total</span><span className="text-primary">${total.toFixed(2)}</span></div>

          <div className="grid grid-cols-3 gap-2 pt-3">
            <Button variant="outline" className="flex-col h-14 gap-1" disabled={cart.length === 0}>
              <Banknote className="w-4 h-4" />
              <span className="text-[10px]">Cash</span>
            </Button>
            <Button variant="outline" className="flex-col h-14 gap-1" disabled={cart.length === 0}>
              <CreditCard className="w-4 h-4" />
              <span className="text-[10px]">Card</span>
            </Button>
            <Button variant="outline" className="flex-col h-14 gap-1" disabled={cart.length === 0}>
              <Smartphone className="w-4 h-4" />
              <span className="text-[10px]">UPI</span>
            </Button>
          </div>
          <Button className="w-full mt-2" disabled={cart.length === 0}>
            Charge ${total.toFixed(2)}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default POSPage;
