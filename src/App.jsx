import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/mainlayout";
import Dashboard from "./pages/dashboard";
import Documents from "./pages/documents";
import Lawyers from "./pages/lawyers";
import Chatbot from "./pages/chatbot";
import Settings from "./pages/settings";
import NotFound from "./pages/notfound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout><Dashboard /></MainLayout>} />
          <Route path="/documents" element={<MainLayout><Documents /></MainLayout>} />
          <Route path="/lawyers" element={<MainLayout><Lawyers /></MainLayout>} />
          <Route path="/chatbot" element={<MainLayout><Chatbot /></MainLayout>} />
          <Route path="/settings" element={<MainLayout><Settings /></MainLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
