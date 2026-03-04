import { useNavigate } from "react-router-dom";
import { ShoppingCart, Check, ArrowRight, BarChart3, Package, Globe, Zap, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const PLANS = [
  {
    name: "Basic",
    price: "49,000",
    period: "/yr",
    accounts: "1 Account",
    description: "Perfect for single-store businesses getting started",
    features: [
      "1 Register",
      "1 Branch",
      "POS Terminal",
      "Inventory Management",
      "Sales & Purchase Orders",
      "Basic Reports",
      "Email Support",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Professional",
    price: "99,000",
    period: "/yr",
    accounts: "3 Accounts",
    description: "For growing businesses with multiple team members",
    features: [
      "3 Registers",
      "3 Branches",
      "Everything in Basic",
      "Multi-currency Support",
      "Advanced Reports & Dashboards",
      "Barcode & Serial Tracking",
      "Integrations (WhatsApp, SMS)",
      "Priority Support",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Premium",
    price: "300,000",
    period: "/yr",
    accounts: "Unlimited Accounts",
    description: "Enterprise-grade for multi-branch operations",
    features: [
      "Unlimited Registers",
      "Unlimited Branches",
      "Everything in Professional",
      "Warehouse Management",
      "Automation & Workflows",
      "Custom PDF & Email Templates",
      "API Access",
      "Dedicated Account Manager",
      "Custom Integrations",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

const FEATURES = [
  { icon: ShoppingCart, title: "POS Terminal", desc: "Fast, reliable billing with offline support and barcode scanning." },
  { icon: Package, title: "Inventory Control", desc: "Track stock, variants, batches, and transfers across locations." },
  { icon: BarChart3, title: "Smart Reports", desc: "Real-time dashboards and custom reports for data-driven decisions." },
  { icon: Globe, title: "Multi-Branch", desc: "Manage multiple stores, warehouses, and registers from one platform." },
  { icon: Zap, title: "Automation", desc: "Workflow rules, alerts, webhooks, and scheduled tasks." },
  { icon: Shield, title: "Secure & Reliable", desc: "Role-based access, audit logs, and cloud-first architecture." },
];

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <ShoppingCart className="w-4.5 h-4.5 text-primary-foreground" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-foreground">KashaPOS</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
          </div>
          <Button onClick={() => navigate("/login")} size="sm">
            Sign In <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-8">
            <Zap className="w-3.5 h-3.5" /> Cloud-First POS Platform
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1] mb-6">
            Your Business,<br />
            <span className="text-primary">In One Place</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            KashaPOS is the all-in-one point of sale system for modern commerce. 
            Manage inventory, sales, purchases, and multi-branch operations from a single powerful platform.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button size="lg" onClick={() => navigate("/login")} className="text-base px-8 h-12">
              Start Free Trial <ArrowRight className="w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })} className="text-base px-8 h-12">
              View Pricing
            </Button>
          </div>
          <div className="flex items-center justify-center gap-6 mt-10 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-primary" /> 14-day free trial</span>
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-primary" /> No credit card required</span>
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-primary" /> Cancel anytime</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Everything You Need to Run Your Business</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">Powerful modules designed to scale from a single store to a multi-branch enterprise.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <div key={f.title} className="stat-card group cursor-default">
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-1.5">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-muted/50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Simple, Transparent Pricing</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">Choose the plan that fits your business. Upgrade or downgrade anytime.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl border p-8 flex flex-col transition-all duration-300 ${
                  plan.highlighted
                    ? "bg-card border-primary shadow-xl shadow-primary/10 scale-[1.03]"
                    : "bg-card border-border hover:border-primary/30 hover:shadow-lg"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-foreground mb-1">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm text-muted-foreground">KES</span>
                    <span className="text-4xl font-extrabold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-1.5 text-sm text-primary font-medium">
                    <Users className="w-3.5 h-3.5" /> {plan.accounts}
                  </div>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-foreground">
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => navigate("/login")}
                  variant={plan.highlighted ? "default" : "outline"}
                  className="w-full h-11"
                >
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
              <ShoppingCart className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground">KashaPOS</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 KashaPOS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
