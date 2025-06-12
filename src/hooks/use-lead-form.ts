import { useState } from 'react';
import { toast } from 'sonner';
import { FormValues } from '@/types/form';

export const useLeadForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: FormValues, type: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(import.meta.env.VITE_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          type,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar formulário');
      }

      toast.success('Formulário enviado com sucesso!');
      return true;
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      toast.error(error instanceof Error ? error.message : 'Erro ao enviar formulário');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleSubmit,
  };
}; 