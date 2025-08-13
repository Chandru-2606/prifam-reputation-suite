import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import Reviews from "./pages/Reviews";
import Upload from "./pages/Upload";
import Configuration from "./pages/Configuration";
import UserManagement from "./pages/UserManagement";
import CreateUser from "./pages/CreateUser";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/super-admin" element={<SuperAdminDashboard />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/configuration" element={<Configuration />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/create-user" element={<CreateUser />} />
          <Route path="/admin-management" element={<SuperAdminDashboard />} />
          <Route path="/settings" element={<Configuration />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
