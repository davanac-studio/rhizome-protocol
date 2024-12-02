/**
 * Root Component: App
 * Description: Main application component that sets up routing and global providers.
 * Wraps the entire application with necessary context providers and routing configuration.
 * 
 * @returns {JSX.Element} The root application component with routing and providers
 */
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import ProjectDetails from "./pages/ProjectDetails";
import EditProject from "./pages/EditProject";
import Auth from "./pages/Auth";
import UserProfile from "./pages/UserProfile";
import About from "./pages/About";
import Users from "./pages/Users";
import NavBar from "./components/NavBar";

const queryClient = new QueryClient();

/**
 * Main application component that configures global providers and routing
 * 
 * @returns {JSX.Element} Configured application with routing and providers
 */
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
              <Route path="/project/:idWithSlug" element={<ProjectDetails />} />
              <Route path="/project/:idWithSlug/edit" element={<EditProject />} />
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