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
  const [submissionId, setSubmissionId] = useState<string>(uuidv4());

  const regenerateSubmissionId = () => {
    setSubmissionId(uuidv4());
  };

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

      if (formType === 'prefeitura_floresta' || formType === 'condBaronesaDaFonte') {
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

      if (type === 'corpoDeBombeiros') {
        formData.append('origem', 'Corpo de Bombeiros');
        formData.append('comercial', 'JULIO');
        formData.append('tipo', 'interno');
        formData.append('tipo_cliente', 'corpo_de_bombeiros');
      }

      if (type === 'policiaMilitar') {
        formData.append('origem', 'Polícia Militar');
        formData.append('comercial', 'JULIO');
        formData.append('tipo', 'interno');
        formData.append('tipo_cliente', 'policia_militar');
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

      if (type === 'uvp') {
        formData.append('origem', 'UVP');
        formData.append('comercial', 'Julio/Tadeu');
        formData.append('tipo', 'interno');
        formData.append('tipo_cliente', 'UVP');
      }

      if (type === 'oab') {
        formData.append('origem', 'oab');
        formData.append('comercial', 'Julio/Camara dos ADV');
        formData.append('tipo', 'interno');
        formData.append('tipo_cliente', 'oab');
      }

      if (type === 'tre') {
        formData.append('origem', 'tre');
        formData.append('comercial', 'Julio/Camara dos ADV');
        formData.append('tipo', 'interno');
        formData.append('tipo_cliente', 'tre');
      }

      if (type === 'max_beneficios') {
        formData.append('origem', 'Max Beneficios');
        formData.append('comercial', 'ads');
        formData.append('tipo', 'digital');
        formData.append('tipo_cliente', 'max_beneficios');
      }

      if (type === 'flyer_condominios') {
        formData.append('origem', 'Flyer Condominios');
        formData.append('comercial', 'ads');
        formData.append('tipo', 'digital');
        formData.append('tipo_cliente', 'flyer_condominio');
      }

      if (type === 'flyer_delivery') {
        formData.append('origem', 'Flyer delivery');
        formData.append('comercial', 'ads');
        formData.append('tipo', 'digital');
        formData.append('tipo_cliente', 'flyer_delivery')
      }

      if (type === 'atletas') {
        formData.append('origem', 'Atletas');
        formData.append('comercial', 'Luis Genes');
        formData.append('tipo', 'digital');
        formData.append('tipo_cliente', 'atletas')
      }

      if (type === 'mormaiiday') {
        formData.append('origem', 'MormaiiDay');
        formData.append('comercial', 'Luis Genes');
        formData.append('tipo', 'digital');
        formData.append('tipo_cliente', 'MormaiiDay')
      }

      if (type === 'matchfit') {
        formData.append('origem', 'MatchFit');
        formData.append('comercial', 'Luis Genes');
        formData.append('tipo', 'Ação off');
        formData.append('tipo_cliente', 'MatchFit')
      }

      if (type === 'fesindico') {
        formData.append('origem', 'Fesindico');
        formData.append('comercial', 'Fesindico');
        formData.append('tipo', 'Fesindico');
        formData.append('tipo_cliente', 'Fesindico')
      }


      if (type === 'outubrorosa') {
        formData.append('origem', 'acao_outubro_rosa');
        formData.append('comercial', 'Amanda');
        formData.append('tipo', 'acao_outubro_rosa');
        formData.append('tipo_cliente', 'acao_outubro_rosa')
      }

      if (type === 'condBaronesaDaFonte') {
        formData.append('origem', 'Condomínio Baronesa da Fonte');
        formData.append('comercial', 'Carlos Cavalcante');
        formData.append('tipo', 'externo');
        formData.append('tipo_cliente', 'condBaronesaDaFonte')
      }

      if (type === 'mcp') {
        formData.append('origem', 'MCP');
        formData.append('comercial', 'Luis Genes');
        formData.append('tipo', 'externo');
        formData.append('tipo_cliente', 'mcp')
      }

      if (type === 'assembleia_seara') {
        formData.append('origem', 'Assembleia Seara');
        formData.append('comercial', 'Janndui');
        formData.append('tipo', 'externo');
        formData.append('tipo_cliente', 'assembleia_seara')
      }

      if (type === 'igreja_adventista') {
        formData.append('origem', 'Igreja Adventista');
        formData.append('comercial', 'Jandui');
        formData.append('tipo', 'externo');
        formData.append('tipo_cliente', 'igreja_adventista')
      }

      if (type === 'azure') {
        formData.append('origem', 'Azure');
        formData.append('comercial', 'Luis Genes');
        formData.append('tipo', 'interno');
        formData.append('tipo_cliente', 'azure')
      }

      if (type === 'rei_davi_condominio') {
        formData.append('origem', 'Rei Davi Condominio');
        formData.append('comercial', 'Luis Varela');
        formData.append('tipo', 'externo');
        formData.append('tipo_cliente', 'rei_davi_condominio')
      }

      if (type === 'autoescola_santana') {
        formData.append('origem', 'Autoescola Santana');
        formData.append('comercial', 'Antônio Autoescola');
        formData.append('tipo', 'externo');
        formData.append('tipo_cliente', 'autoescola_santana')
      }

      if (type === 'cond_jardim_bela_vista') {
        formData.append('origem', 'Condomínio Jardim Bela Vista');
        formData.append('comercial', 'Eduardo Albuquerque TR');
        formData.append('tipo', 'externo');
        formData.append('tipo_cliente', 'cond_jardim_bela_vista')
      }

      if (type === 'cia_athletica_recife') {
        formData.append('origem', 'Cia Athletica Recife');
        formData.append('comercial', 'Julio');
        formData.append('tipo', 'externo');
        formData.append('tipo_cliente', 'cia_athletica_recife')
      }

      if (type === 'edf_praia_de_gamboa') {
        formData.append('origem', 'EDF Praia de Gamboa');
        formData.append('comercial', 'Iranildo');
        formData.append('tipo', 'externo');
        formData.append('tipo_cliente', 'edf_praia_de_gamboa')
      }

      if (type === 'cond_praia_da_pipa') {
        formData.append('origem', 'Condomínio Praia da Pipa');
        formData.append('comercial', 'Iranildo');
        formData.append('tipo', 'externo');
        formData.append('tipo_cliente', 'cond_praia_da_pipa')
      }

      if (type === 'socelme') {
        formData.append('origem', 'Socelme');
        formData.append('comercial', 'Socelme');
        formData.append('tipo', 'externo');
        formData.append('tipo_cliente', 'socelme')
      } 

      if (type === 'fast_solucoes') {
        formData.append('origem', 'Fast Solucoes');
        formData.append('comercial', 'Fast Solucoes');
        formData.append('tipo', 'externo');
        formData.append('tipo_cliente', 'fast_solucoes')
      }

      if (type === 'aspcre') {
        formData.append('origem', 'Aspcre');
        formData.append('comercial', 'Aspcre');
        formData.append('tipo', 'externo');
        formData.append('tipo_cliente', 'aspcre')
      }

      if (type === 'edf_ilha_de_capri') {
        formData.append('origem', 'EDF Ilha de Capri');
        formData.append('comercial', 'Amanda');
        formData.append('tipo', 'Interno');
        formData.append('tipo_cliente', 'edf_ilha_de_capri')
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
    regenerateSubmissionId,
  };
}; 