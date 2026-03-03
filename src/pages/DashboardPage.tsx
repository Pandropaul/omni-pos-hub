import { useAuth } from "@/contexts/AuthContext";
import {
  DollarSign, ShoppingCart, Package, TrendingUp, ArrowUpRight, ArrowDownRight, Users, BarChart3
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const salesData = [
  { name: "Mon", sales: 4200, orders: 32 },
  { name: "Tue", sales: 5100, orders: 41 },
  { name: "Wed", sales: 3800, orders: 28 },
  { name: "Thu", sales: 6300, orders: 55 },
  { name: "Fri", sales: 7100, orders: 62 },
  { name: "Sat", sales: 8400, orders: 78 },
  { name: "Sun", sales: 5600, orders: 45 },
];

const topProducts = [
  { name: "Wireless Earbuds Pro", sold: 142, revenue: 8520 },
  { name: "Organic Coffee Blend", sold: 98, revenue: 2940 },
  { name: "USB-C Hub Adapter", sold: 87, revenue: 4350 },
  { name: "Bamboo Water Bottle", sold: 76, revenue: 1520 },
  { name: "LED Desk Lamp", sold: 65, revenue: 3250 },
];

const recentTransactions = [
  { id: "TXN-1042", customer: "Emily Watson", amount: 245.00, status: "Completed", time: "2 min ago" },
  { id: "TXN-1041", customer: "James Lee", amount: 89.50, status: "Completed", time: "15 min ago" },
  { id: "TXN-1040", customer: "Maria Garcia", amount: 412.00, status: "Pending", time: "32 min ago" },
  { id: "TXN-1039", customer: "Alex Kim", amount: 67.25, status: "Completed", time: "1 hr ago" },
  { id: "TXN-1038", customer: "Sarah Johnson", amount: 198.00, status: "Refunded", time: "2 hrs ago" },
];

const STATUS_STYLES: Record<string, string> = {
  Completed: "bg-success/10 text-success",
  Pending: "bg-warning/10 text-warning",
  Refunded: "bg-destructive/10 text-destructive",
};

const DashboardPage = () => {
  const { user } = useAuth();

  const stats = [
    { label: "Today's Sales", value: "$8,420", change: "+12.5%", up: true, icon: DollarSign },
    { label: "Orders", value: "78", change: "+8.2%", up: true, icon: ShoppingCart },
    { label: "Items in Stock", value: "2,451", change: "-3.1%", up: false, icon: Package },
    { label: "Active Customers", value: "1,204", change: "+5.7%", up: true, icon: Users },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Welcome back, {user?.name?.split(" ")[0]}</h1>
        <p className="text-muted-foreground text-sm">Here's what's happening at {user?.businessName} today.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">{s.label}</span>
              <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                <s.icon className="w-4 h-4 text-primary" />
              </div>
            </div>
            <p className="text-2xl font-bold">{s.value}</p>
            <div className="flex items-center gap-1 mt-1">
              {s.up ? (
                <ArrowUpRight className="w-3 h-3 text-success" />
              ) : (
                <ArrowDownRight className="w-3 h-3 text-destructive" />
              )}
              <span className={`text-xs font-medium ${s.up ? "text-success" : "text-destructive"}`}>{s.change}</span>
              <span className="text-xs text-muted-foreground">vs yesterday</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 stat-card">
          <h3 className="text-sm font-semibold mb-4">Weekly Sales</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(173, 58%, 39%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(173, 58%, 39%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="name" className="text-xs" tick={{ fill: "hsl(220, 10%, 46%)" }} />
              <YAxis className="text-xs" tick={{ fill: "hsl(220, 10%, 46%)" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(0, 0%, 100%)",
                  border: "1px solid hsl(220, 13%, 91%)",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Area type="monotone" dataKey="sales" stroke="hsl(173, 58%, 39%)" fillOpacity={1} fill="url(#salesGradient)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="stat-card">
          <h3 className="text-sm font-semibold mb-4">Orders by Day</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="name" className="text-xs" tick={{ fill: "hsl(220, 10%, 46%)" }} />
              <YAxis className="text-xs" tick={{ fill: "hsl(220, 10%, 46%)" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(0, 0%, 100%)",
                  border: "1px solid hsl(220, 13%, 91%)",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="orders" fill="hsl(217, 91%, 60%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Transactions */}
        <div className="stat-card">
          <h3 className="text-sm font-semibold mb-4">Recent Transactions</h3>
          <div className="space-y-3">
            {recentTransactions.map((t) => (
              <div key={t.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-medium">{t.customer}</p>
                  <p className="text-xs text-muted-foreground font-mono">{t.id} · {t.time}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">${t.amount.toFixed(2)}</p>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${STATUS_STYLES[t.status]}`}>
                    {t.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="stat-card">
          <h3 className="text-sm font-semibold mb-4">Top Products</h3>
          <div className="space-y-3">
            {topProducts.map((p, i) => (
              <div key={p.name} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.sold} sold</p>
                </div>
                <p className="text-sm font-semibold">${p.revenue.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
