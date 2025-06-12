import React from 'react';
import { Check } from 'lucide-react';

interface SuccessMessageProps {
  message: string;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center animate-fade-in">
      <div className="mb-4 p-3 bg-green-100 rounded-full">
        <Check className="w-8 h-8 text-green-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Formulário Enviado!</h2>
      <p className="text-gray-600">{message}</p>
    </div>
  );
};

export default SuccessMessage;
