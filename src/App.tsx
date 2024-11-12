import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import ProjectDetails from "./pages/ProjectDetails";
import Auth from "./pages/Auth";
import UserProfile from "./pages/UserProfile";
import About from "./pages/About";
import Users from "./pages/Users";
import NavBar from "./components/NavBar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-gray-50">
            <NavBar />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/project/:id" element={<ProjectDetails />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/profile/:username" element={<UserProfile />} />
              <Route path="/about" element={<About />} />
              <Route path="/users" element={<Users />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;