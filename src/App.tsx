import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Index from "./pages/Index";
import UserProfile from "./pages/UserProfile";
import About from "./pages/About";
import Users from "./pages/Users";
import NavBar from "./components/NavBar";
import { BlogPostEditor } from "./components/blog/BlogPostEditor";
import { BlogPost } from "./components/blog/BlogPost";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <NavBar />
          <div className="container mx-auto">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/profile/:username" element={<UserProfile />} />
              <Route path="/about" element={<About />} />
              <Route path="/users" element={<Users />} />
              <Route path="/posts/new" element={<BlogPostEditor />} />
              <Route path="/posts/:slug" element={<BlogPost />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;