import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import LeadForm from '@/components/LeadForm';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun } from "lucide-react";

const Index = () => {
  const location = useLocation();
  const path = location.pathname;
  const [loaded, setLoaded] = useState(false);
  const isMobile = useIsMobile();
  const { isDarkMode, toggleDarkMode } = useTheme();

  // Simple animation on load
  useEffect(() => {
    setLoaded(true);
  }, []);

  // Determina se deve mostrar o campo de condomínio baseado na rota
  const showCondominio = path !== '/instagram' && path !== '/associacoes';
  const isAssociacao = path === '/associacoes';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-trenergia-blue/10 to-trenergia-blue/30 px-4 py-8 md:py-12">
      <button
        onClick={toggleDarkMode}
        className="fixed top-4 right-4 z-50 p-2 rounded-full bg-white/80 dark:bg-gray-900/80 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-gray-200 dark:border-gray-700"
        aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDarkMode ? (
          <Sun className="w-5 h-5 text-yellow-500" />
        ) : (
          <Moon className="w-5 h-5 text-gray-700" />
        )}
      </button>
      <div
        className={`form-container bg-white shadow-xl w-full ${isMobile ? 'max-w-[95%] p-4' : 'max-w-md p-8'
          } ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
      >
      </div>
    </div>
  );
};

export default Index;
