import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ProtectedRoute } from "@/components/ui/protected-route";
import { AppShell } from "@/components/layout/AppShell";

// Auth pages
import { Login } from "@/pages/auth/Login";
import { Register } from "@/pages/auth/Register";
import { VerifyMagicLink } from "@/pages/auth/VerifyMagicLink";

// App pages
import { Dashboard } from "@/pages/Dashboard";
import { Fields } from "@/pages/Fields";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verify" element={<VerifyMagicLink />} />
              
              {/* Protected routes */}
              <Route path="/" element={
                <ProtectedRoute>
                  <AppShell />
                </ProtectedRoute>
              }>
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="fields" element={<Fields />} />
                {/* Placeholder routes for other features */}
                <Route path="uploads" element={<div className="p-6"><h1 className="text-2xl font-bold">Uploads</h1><p className="text-muted-foreground">Upload and process imagery</p></div>} />
                <Route path="devices" element={<div className="p-6"><h1 className="text-2xl font-bold">Devices</h1><p className="text-muted-foreground">Manage IoT sensors</p></div>} />
                <Route path="alerts" element={<div className="p-6"><h1 className="text-2xl font-bold">Alerts</h1><p className="text-muted-foreground">View and manage alerts</p></div>} />
                <Route path="settings" element={<div className="p-6"><h1 className="text-2xl font-bold">Settings</h1><p className="text-muted-foreground">Account and system settings</p></div>} />
              </Route>
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
