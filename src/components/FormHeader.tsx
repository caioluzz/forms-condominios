import React from 'react';
import { Sun } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { FormConfig } from '@/config/formTypes';

interface FormHeaderProps {
  config: FormConfig;
}

const FormHeader: React.FC<FormHeaderProps> = ({ config }) => {
  const isMobile = useIsMobile();

  return (
    <div className="mb-8 md:mb-10 text-center animate-fade-in">
      <div className="inline-flex items-center justify-center mb-4">
        <Sun className={`${isMobile ? 'w-8 h-8' : 'w-10 h-10'} text-yellow-500 mr-3`} />
        <span className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-trenergia-blue`}>
          TR Energia
        </span>
      </div>
      <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-4 leading-tight">
        {config.title}
      </h1>
      <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base max-w-2xl mx-auto">
        {config.description}
      </p>
    </div>
  );
};

export default FormHeader;
