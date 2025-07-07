import { useState } from 'react';
import { toast } from 'sonner';
import { FormValues } from '@/types/form';
import { v4 as uuidv4 } from 'uuid';

// Helper function to format phone number (outside the hook to avoid re-creation on every render)
const formatPhoneNumber = (phone: string): string => {
  const digitsOnly = phone.replace(/\D/g, '');
  if (digitsOnly.length === 11) {
    return `55${digitsOnly.substring(0, 2)}${digitsOnly.substring(2, 7)}${digitsOnly.substring(7, 11)}`;
  }
  if (digitsOnly.length === 10) {
    return `55${digitsOnly.substring(0, 2)}${digitsOnly.substring(2, 6)}${digitsOnly.substring(6, 10)}`;
  }
  return phone;
};

export const useLeadForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [submissionId] = useState<string>(uuidv4());

  const handleSubmit = async (data: FormValues, type: string) => {
    try {
      setIsLoading(true);

      const formData = new FormData();

      // Append all original form fields to FormData
      Object.entries(data).forEach(([key, value]) => {
        // Only append if value is not null, undefined, or empty string
        if (value !== undefined && value !== null && value !== '') {
          formData.append(key, value as string);
        }
      });

      // Add the type of the form
      formData.append('type', type);

      const formType = formData.get('type');

      let desconto = 0.2;

      if (formType === 'prefeitura_floresta') {
        desconto = 0.15;
      };

      formData.append('desconto', (desconto * 100).toString());

      // --- Logic for phone formatting ---
      if (data.phone) {
        formData.append('phone_formatted', formatPhoneNumber(data.phone));
      }

      // --- Logic for firstName ---
      const firstName = data.name ? data.name.split(' ')[0] : '';
      formData.append('firstName', firstName);

      // --- Logic for consumption calculations ---
      // Certifica-se de que 'consumo' existe e é um número válido antes de calcular
      if (data.consumo && !isNaN(parseFloat(data.consumo))) {
        const consumo = parseFloat(data.consumo.replace(/\s/g, '').replace(',', '.'));

        const valorComDesconto = Math.round(consumo * (1 - desconto));
        formData.append('valor_com_desconto', valorComDesconto.toLocaleString('pt-BR'));

        const economiaMensal = Math.round(consumo * desconto);
        formData.append('economia_mensal', economiaMensal.toLocaleString('pt-BR'));

        const economiaAnual = Math.round(economiaMensal * 12);
        formData.append('economia_1_ano', economiaAnual.toLocaleString('pt-BR'));

        const economia3Anos = Math.round(economiaMensal * 36);
        formData.append('economia_3_anos', economia3Anos.toLocaleString('pt-BR'));

        const economia5Anos = Math.round(economiaMensal * 60);
        formData.append('economia_5_anos', economia5Anos.toLocaleString('pt-BR'));
      }

      // Lógica específica para cada tipo de formulário
      if (type === 'circulomilitar') {
        formData.append('origem', 'Círculo Militar de Pernambuco');
        formData.append('comercial', 'JULIO');
        formData.append('tipo', 'interno');
        formData.append('tipo_cliente', 'circulo_militar');
      }

      if (type === 'servrecife') {
        formData.append('origem', 'Servidores do Recife');
        formData.append('comercial', 'JULIO');
        formData.append('tipo', 'interno');
        formData.append('tipo_cliente', 'serv_recife');
      }

      if (type === 'agencialean') {
        formData.append('origem', 'Agência Lean');
        formData.append('comercial', 'LUIS GENES');
        formData.append('tipo', 'interno');
        formData.append('tipo_cliente', 'agencia_lean');
      }

      if (type === 'instagram') {
        formData.append('origem', 'instagram');
        formData.append('comercial', 'ads');
        formData.append('tipo', 'digital');
        formData.append('tipo_cliente', 'digital');
      }

      if (type === 'alumiaco') {
        formData.append('origem', 'alumiaco');
        formData.append('comercial', 'Andre Fausto');
        formData.append('tipo', 'interno');
        formData.append('tipo_cliente', 'alumiaco');
      }

      if (type === 'prefeitura_floresta') {
        formData.append('origem', 'Prefeitura de Floresta');
        formData.append('comercial', 'CONSIGFACIL');
        formData.append('tipo', 'externo');
        formData.append('tipo_cliente', 'prefeituraFloresta');
      }


      // Adiciona submissionId e data de cadastro
      formData.append('submissionId', submissionId);
      formData.append('data_cadastro', new Date().toISOString());
      formData.append('timestamp', new Date().toISOString());

      console.log('Enviando formulário:', {
        tipo: type,
        submissionId,
        data_cadastro: new Date().toISOString()
      });

      const response = await fetch(import.meta.env.VITE_WEBHOOK_URL, {
        method: 'POST',
        // IMPORTANTE: Não defina 'Content-Type' aqui. O navegador faz isso automaticamente
        // para FormData, incluindo o 'boundary' correto.
        body: formData,
      });

      if (!response.ok) {
        console.error('Erro na resposta do servidor:', {
          status: response.status,
          statusText: response.statusText,
          submissionId
        });
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