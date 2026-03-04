import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, SAMPLE_CREDENTIALS } from "@/contexts/AuthContext";
import { ShoppingCart, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (login(email, password)) {
      navigate("/dashboard");
    } else {
      setError("Invalid credentials. Try one of the sample logins below.");
    }
  };

  const fillCredentials = (em: string, pw: string) => {
    setEmail(em);
    setPassword(pw);
    setError("");
  };

  return (
    <div className="min-h-screen flex bg-sidebar">
      {/* Left panel - branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <ShoppingCart className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-sidebar-accent-foreground">KashaPOS</span>
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-sidebar-accent-foreground leading-tight">
            Your Business,<br />In One Place
          </h1>
          <p className="text-sidebar-foreground text-lg max-w-md">
            Manage inventory, sales, purchases, and multi-branch operations from a single powerful platform.
          </p>
        </div>
        <p className="text-sidebar-muted text-sm">© 2026 KashaPOS. All rights reserved.</p>
      </div>

      {/* Right panel - login form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md bg-card rounded-xl shadow-xl border border-border p-8 animate-fade-in">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <ShoppingCart className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold">KashaPOS</span>
          </div>

          <h2 className="text-2xl font-bold mb-1">Sign in</h2>
          <p className="text-muted-foreground mb-6">Enter your credentials to access the dashboard</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input id="password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button type="submit" className="w-full">Sign in</Button>
          </form>

          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Sample Logins</p>
            <div className="space-y-2">
              {SAMPLE_CREDENTIALS.map((c) => (
                <button
                  key={c.email}
                  onClick={() => fillCredentials(c.email, c.password)}
                  className="w-full flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/30 hover:bg-muted/50 transition-colors text-left"
                >
                  <div>
                    <span className={`text-sm font-semibold ${c.color}`}>{c.label}</span>
                    <p className="text-xs text-muted-foreground font-mono">{c.email}</p>
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">{c.password}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
