import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, ShoppingCart, Package, TrendingUp, Truck,
  BarChart3, Settings, Box, Receipt, Users, ChevronLeft, ChevronRight,
  CreditCard, FileText, Zap, Globe
} from "lucide-react";

const NAV_SECTIONS = [
  {
    label: "Main",
    items: [
      { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
      { to: "/pos", icon: ShoppingCart, label: "POS Terminal" },
    ],
  },
  {
    label: "Commerce",
    items: [
      { to: "/inventory", icon: Package, label: "Inventory" },
      { to: "/sales", icon: TrendingUp, label: "Sales" },
      { to: "/purchases", icon: Truck, label: "Purchases" },
      { to: "/customers", icon: Users, label: "Customers" },
    ],
  },
  {
    label: "Finance",
    items: [
      { to: "/invoices", icon: Receipt, label: "Invoices" },
      { to: "/taxes", icon: CreditCard, label: "Taxes" },
      { to: "/reports", icon: BarChart3, label: "Reports" },
    ],
  },
  {
    label: "System",
    items: [
      { to: "/warehouse", icon: Box, label: "Warehouses" },
      { to: "/integrations", icon: Globe, label: "Integrations" },
      { to: "/automation", icon: Zap, label: "Automation" },
      { to: "/templates", icon: FileText, label: "Templates" },
      { to: "/settings", icon: Settings, label: "Settings" },
    ],
  },
];

interface AppSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const AppSidebar = ({ collapsed, onToggle }: AppSidebarProps) => {
  const location = useLocation();

  return (
    <aside
      className={`flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-200 ${
        collapsed ? "w-16" : "w-60"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between h-14 px-3 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <ShoppingCart className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-sidebar-accent-foreground text-sm">KashaPOS</span>
          </div>
        )}
        <button onClick={onToggle} className="p-1.5 rounded-md text-sidebar-foreground hover:bg-sidebar-accent">
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-5">
        {NAV_SECTIONS.map((section) => (
          <div key={section.label}>
            {!collapsed && (
              <p className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-sidebar-muted">
                {section.label}
              </p>
            )}
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const active = location.pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`sidebar-link ${active ? "sidebar-link-active" : "sidebar-link-inactive"}`}
                    title={collapsed ? item.label : undefined}
                  >
                    <item.icon className="w-4 h-4 shrink-0" />
                    {!collapsed && <span>{item.label}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default AppSidebar;
