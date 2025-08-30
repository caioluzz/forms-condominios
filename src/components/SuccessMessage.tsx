import React from 'react';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';

interface SuccessMessageProps {
  message: string;
  onBack?: () => void;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ message, onBack }) => {
  return (
    <div className="animate-fade-in flex flex-col items-center justify-center py-8">
      <div className="w-16 h-16 mb-4 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
        <CheckCircle className="h-10 w-10 text-trenergia-green" />
      </div>

      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
        Recebemos seus dados!
      </h2>

      <p className="text-gray-600 dark:text-gray-300 text-center mb-6 max-w-sm text-balance">
        Obrigado pelo seu interesse nas soluções da TR Energia. Nossa equipe entrará em contato em até 24 horas uteis com a proposta de economia na conta de energia.
      </p>

      <div className="bg-trenergia-gray dark:bg-gray-800 p-4 rounded-lg max-w-sm mb-6">
        <p className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
          <span className="text-trenergia-green mr-2">•</span>
          <span>
            <span className="font-medium">Próximos passos:</span> Elaboraremos a proposta de economia de energia para que você possa aproveitar o seu desconto exclusivo.
          </span>
        </p>
      </div>

      {onBack && (
        <Button
          onClick={onBack}
          className="w-full bg-trenergia-blue hover:bg-trenergia-lightblue text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Preencher Novo Formulário
        </Button>
      )}
    </div>
  );
};

export default SuccessMessage;
