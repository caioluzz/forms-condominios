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
import Alumiaco from "./pages/Alumiaco";
import Floresta from "./pages/Floresta";
import UVP from "./pages/UVP";
import OAB from "./pages/OAB";
import TRE from "./pages/TRE";
import FlyerCondominios from "./pages/FlyerCondominios";
import FlyerDelivery from "./pages/FlyerDelivery";
import MaxBeneficios from "./pages/MaxBeneficios";
import Atletas from "./pages/Atletas";
import MormaiiDay from "./pages/MormaiiDay";
import MatchFit from "./pages/MatchFit";
import Fesindico from "./pages/Fesindico";
import OutubroRosa from "./pages/OutubroRosa";
import CorpoDeBombeiros from "./pages/CorpoDeBombeiros";
import PoliciaMilitar from "./pages/PoliciaMilitar";
import CondBaronesaDaFonte from "./pages/condBaronesaDaFonte";
import MCP from "./pages/MCP";
import AssembleiaSeara from "./pages/AssembleiaSeara";
import IgrejaAdventista from "./pages/IgrejaAdventista";
import Azure from "./pages/Azure";
import ReiDaviCondominio from "./pages/ReiDavi";
import AutoescolaSantana from "./pages/AutoescolaSantana";
import CondJardimBelaVista from "./pages/CondJardimBelaVista";
import CiaAthleicaRecife from "./pages/CiaAthleicaRecife";
import EdfPraiaDeGamboa from "./pages/EdfPraiaDeGamboa";
import CondPraiaDaPipa from "./pages/CondPraiaDaPipa";
import Socelme from "./pages/Socelme";
import FastSolucoes from "./pages/FastSolucoes";
import Aspcre from "./pages/Aspcre";
import EdfIlhaDeCapri from "./pages/EdfIlhaDeCapri";
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
            <Route path="/alumiaco" element={<Alumiaco />} />
            <Route path="/prefeitura-floresta" element={<Floresta />} />
            <Route path="/uvp-pe" element={<UVP />} />
            <Route path="/oab-pe" element={<OAB />} />
            <Route path="/tre-pe" element={<TRE />} />
            <Route path="/flyer-delivery" element={<FlyerDelivery />} />
            <Route path="/flyer-condominios" element={<FlyerCondominios />} />
            <Route path="/max-beneficios" element={<MaxBeneficios />} />
            <Route path="/atletas" element={<Atletas />} />
            <Route path="/mormaiiday" element={<MormaiiDay />} />
            <Route path="/matchfit" element={<MatchFit />} />
            <Route path="/fesindico" element={<Fesindico />} />
            <Route path="/outubrorosa" element={<OutubroRosa />} />
            <Route path="/policia-militar" element={<PoliciaMilitar />} />
            <Route path="/corpo-de-bombeiros" element={<CorpoDeBombeiros />} />
            <Route path="/cond-baronesa-da-fonte" element={<CondBaronesaDaFonte />} />
            <Route path="/mcp" element={<MCP />} />
            <Route path="/assembleia-de-deus" element={<AssembleiaSeara />} />
            <Route path="/igreja-adventista" element={<IgrejaAdventista />} />
            <Route path="/azure" element={<Azure />} />
            <Route path="/rei-davi-condominio" element={<ReiDaviCondominio />} />
            <Route path="/autoescola-santana" element={<AutoescolaSantana />} />
            <Route path="/cond-jardim-bela-vista" element={<CondJardimBelaVista />} />
            <Route path="/cia-athletica-recife" element={<CiaAthleicaRecife />} />
            <Route path="/edf-praia-de-gamboa" element={<EdfPraiaDeGamboa />} />
            <Route path="/cond-praia-da-pipa" element={<CondPraiaDaPipa />} />
            <Route path="/socelme" element={<Socelme />} />
            <Route path="/fast-solucoes" element={<FastSolucoes />} />
            <Route path="/aspcre" element={<Aspcre />} />
            <Route path="/edf-ilha-de-capri" element={<EdfIlhaDeCapri />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
