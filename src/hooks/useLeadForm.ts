import { useForm } from 'react-hook-form';
import { FormValues } from '@/types/form';

export const useLeadForm = (showCondominioSelect: boolean) => {
  const form = useForm<FormValues>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      consumo: '',
      estabelecimento: showCondominioSelect ? '' : undefined
    }
  });

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
      e.target.value = value;
    }
  };

  const handleConsumoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    e.target.value = value;
  };

  return {
    form,
    handlePhoneChange,
    handleConsumoChange
  };
}; 