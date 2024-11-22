import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import UserProfile from "./pages/UserProfile";
import ProjectDetails from "./pages/ProjectDetails";
import EditProject from "./pages/EditProject";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile/:username" element={<UserProfile />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
            <Route path="/project/:id/edit" element={<EditProject />} />
          </Routes>
        </main>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;