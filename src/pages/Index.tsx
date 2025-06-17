import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import LeadForm from '@/components/LeadForm';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const location = useLocation();
  const path = location.pathname;
  const [loaded, setLoaded] = useState(false);
  const isMobile = useIsMobile();

  // Simple animation on load
  useEffect(() => {
    setLoaded(true);
  }, []);

  // Determina se deve mostrar o campo de condomínio baseado na rota
  const showCondominio = path !== '/instagram' && path !== '/associacoes';
  const isAssociacao = path === '/associacoes';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-trenergia-blue/10 to-trenergia-blue/30 px-4 py-8 md:py-12">
      <div
        className={`form-container bg-white dark:bg-gray-900 shadow-xl w-full ${isMobile ? 'max-w-[95%] p-4' : 'max-w-md p-8'
          } ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
      >
      </div>
    </div>
  );
};

export default Index;
