import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import LoginPage from "@/pages/LoginPage";
import DashboardLayout from "@/components/DashboardLayout";
import DashboardPage from "@/pages/DashboardPage";
import POSPage from "@/pages/POSPage";
import InventoryPage from "@/pages/InventoryPage";
import SalesPage from "@/pages/SalesPage";
import PurchasesPage from "@/pages/PurchasesPage";
import ReportsPage from "@/pages/ReportsPage";
import PlaceholderPage from "@/components/PlaceholderPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/pos" element={<POSPage />} />
              <Route path="/inventory" element={<InventoryPage />} />
              <Route path="/sales" element={<SalesPage />} />
              <Route path="/purchases" element={<PurchasesPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/customers" element={<PlaceholderPage title="Customers" description="Customer management with profiles, purchase history, and loyalty tracking. Coming soon." />} />
              <Route path="/invoices" element={<PlaceholderPage title="Invoices" description="Create and manage invoices, credit notes, and payment tracking." />} />
              <Route path="/taxes" element={<PlaceholderPage title="Tax Management" description="Configure tax rates, exemptions, and compliance reporting." />} />
              <Route path="/warehouse" element={<PlaceholderPage title="Warehouses" description="Manage multiple warehouses, storage locations, and transfer orders." />} />
              <Route path="/integrations" element={<PlaceholderPage title="Integrations" description="Connect with Shopify, WhatsApp, payment gateways, and more." />} />
              <Route path="/automation" element={<PlaceholderPage title="Automation" description="Set up workflow rules, email alerts, webhooks, and custom functions." />} />
              <Route path="/templates" element={<PlaceholderPage title="Templates" description="Customize PDF invoices, email templates, and receipt formats." />} />
              <Route path="/settings" element={<PlaceholderPage title="Settings" description="Configure users, roles, branches, registers, and system preferences." />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
