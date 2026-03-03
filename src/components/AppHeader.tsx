import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Bell, Search, LogOut, Store } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const PLAN_COLORS: Record<string, string> = {
  basic: "bg-success/15 text-success border-success/30",
  professional: "bg-info/15 text-info border-info/30",
  enterprise: "bg-warning/15 text-warning border-warning/30",
};

const AppHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="h-14 border-b border-border bg-card flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search anything..."
            className="pl-9 pr-4 py-1.5 text-sm bg-muted rounded-md border-none outline-none focus:ring-2 focus:ring-ring w-64 placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-sm">
          <Store className="w-4 h-4 text-muted-foreground" />
          <span className="font-medium">{user?.businessName}</span>
          <Badge variant="outline" className={`text-[10px] uppercase tracking-wider font-semibold ${PLAN_COLORS[user?.plan || "basic"]}`}>
            {user?.plan}
          </Badge>
        </div>

        <button className="relative p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
        </button>

        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
          {user?.name?.split(" ").map((n) => n[0]).join("")}
        </div>

        <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground">
          <LogOut className="w-4 h-4" />
        </Button>
      </div>
    </header>
  );
};

export default AppHeader;
