import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Instagram from './pages/Instagram';
import Condominio from './pages/Condominio';
import Associacao from './pages/Associacao';
import CirculoMilitar from './pages/CirculoMilitar';
import AgenciaLean from './pages/AgenciaLean';
import NotFound from './pages/NotFound';
import { ThemeProvider } from "./contexts/ThemeContext";
import ServRecife from "./pages/ServRecife";
import { ThemeToggle } from "./components/ThemeToggle";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Router>
          <ThemeToggle />
          <Routes>
            <Route path="/" element={<Instagram />} />
            <Route path="/instagram" element={<Instagram />} />
            <Route path="/condominios" element={<Condominio />} />
            <Route path="/associacao" element={<Associacao />} />
            <Route path="/circulomilitar" element={<CirculoMilitar />} />
            <Route path="/agencialean" element={<AgenciaLean />} />
            <Route path="/servrecife" element={<ServRecife />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
