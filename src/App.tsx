import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ScrollToAnchor from "./components/ScrollToAnchor";
import Index from "./pages/Index.tsx";
import Photos from "./pages/Photos.tsx";
import Friend from "./pages/Friend.tsx";
import Daily from "./pages/Daily.tsx";
import Study from "./pages/Study.tsx";
import Photography from "./pages/Photography.tsx";
import Gaming from "./pages/Gaming.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToAnchor />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/photos" element={<Photos />} />
          <Route path="/friend" element={<Friend />} />
          <Route path="/daily" element={<Daily />} />
          <Route path="/study" element={<Study />} />
          <Route path="/photography" element={<Photography />} />
          <Route path="/gaming" element={<Gaming />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
