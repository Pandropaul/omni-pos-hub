import {
  BarChart3, TrendingUp, Package, DollarSign, FileText, Download, Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from "recharts";

const monthlyRevenue = [
  { month: "Sep", revenue: 32000 },
  { month: "Oct", revenue: 38000 },
  { month: "Nov", revenue: 45000 },
  { month: "Dec", revenue: 52000 },
  { month: "Jan", revenue: 41000 },
  { month: "Feb", revenue: 48000 },
];

const categoryBreakdown = [
  { name: "Electronics", value: 45, color: "hsl(173, 58%, 39%)" },
  { name: "Food & Bev", value: 25, color: "hsl(217, 91%, 60%)" },
  { name: "Lifestyle", value: 18, color: "hsl(38, 92%, 50%)" },
  { name: "Home & Office", value: 12, color: "hsl(142, 71%, 45%)" },
];

const profitTrend = [
  { month: "Sep", profit: 8400 },
  { month: "Oct", profit: 9800 },
  { month: "Nov", profit: 12200 },
  { month: "Dec", profit: 14500 },
  { month: "Jan", profit: 10800 },
  { month: "Feb", profit: 13200 },
];

const REPORT_TYPES = [
  { icon: TrendingUp, label: "Sales Report", desc: "Revenue, orders, and trends" },
  { icon: Package, label: "Inventory Report", desc: "Stock levels and movement" },
  { icon: DollarSign, label: "Receivables", desc: "Outstanding customer payments" },
  { icon: FileText, label: "Purchase Report", desc: "Vendor bills and payments" },
  { icon: BarChart3, label: "Profit & Loss", desc: "Income vs expenses summary" },
  { icon: Calendar, label: "Activity Log", desc: "User actions and changes" },
];

const ReportsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold">Reports & Analytics</h1><p className="text-sm text-muted-foreground">Business intelligence overview</p></div>
        <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-1" /> Export All</Button>
      </div>

      {/* Quick access */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {REPORT_TYPES.map((r) => (
          <button key={r.label} className="stat-card text-left p-4 hover:border-primary/40 cursor-pointer">
            <r.icon className="w-5 h-5 text-primary mb-2" />
            <p className="text-sm font-medium">{r.label}</p>
            <p className="text-[11px] text-muted-foreground">{r.desc}</p>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 stat-card">
          <h3 className="text-sm font-semibold mb-4">Monthly Revenue</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="month" tick={{ fill: "hsl(220, 10%, 46%)", fontSize: 12 }} />
              <YAxis tick={{ fill: "hsl(220, 10%, 46%)", fontSize: 12 }} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(0,0%,100%)", border: "1px solid hsl(220,13%,91%)", borderRadius: "8px", fontSize: "12px" }} />
              <Bar dataKey="revenue" fill="hsl(173, 58%, 39%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="stat-card">
          <h3 className="text-sm font-semibold mb-4">Sales by Category</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={categoryBreakdown} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={4}>
                {categoryBreakdown.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: "hsl(0,0%,100%)", border: "1px solid hsl(220,13%,91%)", borderRadius: "8px", fontSize: "12px" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {categoryBreakdown.map((c) => (
              <div key={c.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                  <span className="text-muted-foreground">{c.name}</span>
                </div>
                <span className="font-medium">{c.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="stat-card">
        <h3 className="text-sm font-semibold mb-4">Profit Trend</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={profitTrend}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis dataKey="month" tick={{ fill: "hsl(220, 10%, 46%)", fontSize: 12 }} />
            <YAxis tick={{ fill: "hsl(220, 10%, 46%)", fontSize: 12 }} />
            <Tooltip contentStyle={{ backgroundColor: "hsl(0,0%,100%)", border: "1px solid hsl(220,13%,91%)", borderRadius: "8px", fontSize: "12px" }} />
            <Line type="monotone" dataKey="profit" stroke="hsl(142, 71%, 45%)" strokeWidth={2} dot={{ fill: "hsl(142, 71%, 45%)" }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ReportsPage;
