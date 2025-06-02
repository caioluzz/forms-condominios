import * as React from 'react';
import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { User, Mail, Phone, Zap, Building, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import FormHeader from './FormHeader';
import SuccessMessage from './SuccessMessage';
import { useIsMobile } from '@/hooks/use-mobile';
import { v4 as uuidv4 } from 'uuid';

// Interface para as informações do condomínio/associação
interface CondominioInfo {
  nome: string;
  comercial: string;
  tipo: 'interno' | 'externo';
}

// Mapeamento dos condomínios com suas informações
const condominiosInfo: Record<string, CondominioInfo> = {
  'EDF. LUCIANO COSTA': {
    nome: 'EDF. LUCIANO COSTA',
    comercial: 'AMANDA TR',
    tipo: 'interno'
  },
  'EDF. LOFT CASA FORTE': {
    nome: 'EDF. LOFT CASA FORTE',
    comercial: 'AMANDA TR',
    tipo: 'interno'
  },
  'EDF. COSTA AZUL': {
    nome: 'EDF. COSTA AZUL',
    comercial: 'AMANDA TR',
    tipo: 'interno'
  },
  'COND. CONJUNTO RESIDENCIAL IGNEZ ANDREAZZA': {
    nome: 'COND. CONJUNTO RESIDENCIAL IGNEZ ANDREAZZA',
    comercial: 'AMANDA TR',
    tipo: 'interno'
  },
  'EDF. GIRASSOIS': {
    nome: 'EDF. GIRASSOIS',
    comercial: 'AMANDA TR',
    tipo: 'interno'
  },
  'EDF. PARC DE LOIRE': {
    nome: 'EDF. PARC DE LOIRE',
    comercial: 'AMANDA TR',
    tipo: 'interno'
  },
  'EDF. QUATRO ESTAÇÃO': {
    nome: 'EDF. QUATRO ESTAÇÃO',
    comercial: 'AMANDA TR',
    tipo: 'interno'
  },
  'EDF. JOHN LENNON': {
    nome: 'EDF. JOHN LENNON',
    comercial: 'AMANDA TR',
    tipo: 'interno'
  },
  'EDF. LIVERPOOL': {
    nome: 'EDF. LIVERPOOL',
    comercial: 'AMANDA TR',
    tipo: 'interno'
  },
  'EDF. BRUXELAS': {
    nome: 'EDF. BRUXELAS',
    comercial: 'AMANDA TR',
    tipo: 'interno'
  },
  'EDF. SÃO SALVADOR': {
    nome: 'EDF. SÃO SALVADOR',
    comercial: 'AMANDA TR',
    tipo: 'interno'
  },
  'EDF. AVIGNON': {
    nome: 'EDF. AVIGNON',
    comercial: 'AMANDA TR',
    tipo: 'interno'
  },
  'EDF. PARK FLEMING': {
    nome: 'EDF. PARK FLEMING',
    comercial: 'AMANDA TR',
    tipo: 'interno'
  },
  'EDF. PORTE ORLEANS': {
    nome: 'EDF. PORTE ORLEANS',
    comercial: 'AMANDA',
    tipo: 'interno'
  },
  'EDF. CASA GRANDE DAS UBAIAS': {
    nome: 'EDF. CASA GRANDE DAS UBAIAS',
    comercial: 'ANDRE FAUSTO',
    tipo: 'interno'
  },
  'EDF. ROYAL EMBASSY': {
    nome: 'EDF. ROYAL EMBASSY',
    comercial: 'ANDRE FAUSTO',
    tipo: 'interno'
  },
  'EDF. FIRST S VILLAGE': {
    nome: 'EDF. FIRST S VILLAGE',
    comercial: 'ANDRE FAUSTO',
    tipo: 'interno'
  },
  'EDF. ATLANTA': {
    nome: 'EDF. ATLANTA',
    comercial: 'ANDRE FAUSTO',
    tipo: 'interno'
  },
  'EDF. MAISON CLASSIC': {
    nome: 'EDF. MAISON CLASSIC',
    comercial: 'ANDRE FAUSTO',
    tipo: 'interno'
  },
  'EDF. VEREDA DO MAR': {
    nome: 'EDF. VEREDA DO MAR',
    comercial: 'ANDRE FAUSTO',
    tipo: 'interno'
  },
  'EDF. RESIDENCIAL LINCOLN AVENIDA': {
    nome: 'EDF. RESIDENCIAL LINCOLN AVENIDA',
    comercial: 'ANDRE FAUSTO',
    tipo: 'interno'
  },
  'EDF. MONTE DOS GUARARAPES': {
    nome: 'EDF. MONTE DOS GUARARAPES',
    comercial: 'ANDRE FAUSTO',
    tipo: 'interno'
  },
  'EDF. ALGARVE': {
    nome: 'EDF. ALGARVE',
    comercial: 'ANDRE FAUSTO',
    tipo: 'interno'
  },
  'EDF. COSTA DO SOL': {
    nome: 'EDF. COSTA DO SOL',
    comercial: 'ANDRE FAUSTO',
    tipo: 'interno'
  },
  'EDF. EMILIA LOPES': {
    nome: 'EDF. EMILIA LOPES',
    comercial: 'ANDRE FAUSTO',
    tipo: 'interno'
  },
  'EDF. CARLA DIAS': {
    nome: 'EDF. CARLA DIAS',
    comercial: 'ANDRE FAUSTO',
    tipo: 'interno'
  },
  'EDF. COSTA DAS PALMEIRAS': {
    nome: 'EDF. COSTA DAS PALMEIRAS',
    comercial: 'ANDRE FAUSTO',
    tipo: 'interno'
  },
  'COND. RESIDENCIAL FERREIRA LOPES': {
    nome: 'COND. RESIDENCIAL FERREIRA LOPES',
    comercial: 'ANDRE FAUSTO',
    tipo: 'interno'
  },
  'EDF. LULA CARDOSO AYRES': {
    nome: 'EDF. LULA CARDOSO AYRES',
    comercial: 'ANDRE FAUSTO',
    tipo: 'interno'
  },
  'EDF. ESPANHA': {
    nome: 'EDF. ESPANHA',
    comercial: 'CAMILLA',
    tipo: 'externo'
  },
  'EDF. GOLDEN LAKE': {
    nome: 'EDF. GOLDEN LAKE',
    comercial: 'CAMILLA',
    tipo: 'externo'
  },
  'COND. PRIVE TROPICALIENTE': {
    nome: 'COND. PRIVE TROPICALIENTE',
    comercial: 'CRISTIANE',
    tipo: 'interno'
  },
  'EDF. UBAIAS PRINCE': {
    nome: 'EDF. UBAIAS PRINCE',
    comercial: 'DANILO TR',
    tipo: 'externo'
  },
  'EDF. PORTAL DO CAPIBARIBE': {
    nome: 'EDF. PORTAL DO CAPIBARIBE',
    comercial: 'EDUARDO',
    tipo: 'externo'
  },
  'COND. EMPRESARIAL GABRIEL BACELAR CORPORATE': {
    nome: 'COND. EMPRESARIAL GABRIEL BACELAR CORPORATE',
    comercial: 'EDUARDO RIBEIRO',
    tipo: 'externo'
  },
  'EDF. ACROPOLE': {
    nome: 'EDF. ACROPOLE',
    comercial: 'EDUARDO RIBEIRO',
    tipo: 'externo'
  },
  'EDF. MASTER ESPINHEIRO': {
    nome: 'EDF. MASTER ESPINHEIRO',
    comercial: 'EMMANUEL KROMA',
    tipo: 'externo'
  },
  'COND. PIRES FERREIRA': {
    nome: 'COND. PIRES FERREIRA',
    comercial: 'FERNANDA TR',
    tipo: 'externo'
  },
  'EDF. CASTELO B. RENDA': {
    nome: 'EDF. CASTELO B. RENDA',
    comercial: 'FERNANDA TR',
    tipo: 'externo'
  },
  'EDF. OCAPORÃ': {
    nome: 'EDF. OCAPORÃ',
    comercial: 'FERNANDO A F NETO',
    tipo: 'externo'
  },
  'EDF. SAN GERMINIANO': {
    nome: 'EDF. SAN GERMINIANO',
    comercial: 'FOFAO',
    tipo: 'externo'
  },
  'COND. RESIDENCIAL VIA BRECIA': {
    nome: 'COND. RESIDENCIAL VIA BRECIA',
    comercial: 'FOFAO',
    tipo: 'externo'
  },
  'EDF. ADOLPHO PEREIRA CARNEIRO': {
    nome: 'EDF. ADOLPHO PEREIRA CARNEIRO',
    comercial: 'GUSTAVO',
    tipo: 'interno'
  },
  'COND. RESERVA DO POCO': {
    nome: 'COND. RESERVA DO POCO',
    comercial: 'GUSTAVO TR',
    tipo: 'interno'
  },
  'EDF. DUNE': {
    nome: 'EDF. DUNE',
    comercial: 'GUSTAVO TR',
    tipo: 'interno'
  },
  'EDF. MARIA SOPHIE': {
    nome: 'EDF. MARIA SOPHIE',
    comercial: 'GUSTAVO TR',
    tipo: 'interno'
  },
  'COND. CONJ RESD RIO ARAUA': {
    nome: 'COND. CONJ RESD RIO ARAUA',
    comercial: 'GUSTAVO TR',
    tipo: 'interno'
  },
  'COND. MORADA DO SOL': {
    nome: 'COND. MORADA DO SOL',
    comercial: 'HELMO',
    tipo: 'externo'
  },
  'EDF. SALOMAO KELNER': {
    nome: 'EDF. SALOMAO KELNER',
    comercial: 'HELMO',
    tipo: 'externo'
  },
  'EDF. BOULEVARD RESIDENCIAL JOSE NORONHA': {
    nome: 'EDF. BOULEVARD RESIDENCIAL JOSE NORONHA',
    comercial: 'IRANILDO',
    tipo: 'externo'
  },
  'EDF. LITORAL': {
    nome: 'EDF. LITORAL',
    comercial: 'IRANILDO',
    tipo: 'externo'
  },
  'EDF. MARIA DO CARMO ALVES': {
    nome: 'EDF. MARIA DO CARMO ALVES',
    comercial: 'JOÃO MATHEUS',
    tipo: 'externo'
  },
  'EDF. ALBUQUERQUE MOREIRA': {
    nome: 'EDF. ALBUQUERQUE MOREIRA',
    comercial: 'JOSÉ CARLOS (JULIO)',
    tipo: 'externo'
  },
  'EDF. AVA GARDNER E SOPHIE LOREN': {
    nome: 'EDF. AVA GARDNER E SOPHIE LOREN',
    comercial: 'JULIO',
    tipo: 'interno'
  },
  'EDF. PALMVILLAGE': {
    nome: 'EDF. PALMVILLAGE',
    comercial: 'JULIO PARIZIO',
    tipo: 'interno'
  },
  'EDF. OPERA CLASSIC': {
    nome: 'EDF. OPERA CLASSIC',
    comercial: 'JULIO PARIZIO',
    tipo: 'interno'
  },
  'EDF. RIO BRANCO': {
    nome: 'EDF. RIO BRANCO',
    comercial: 'JULIO PARIZIO',
    tipo: 'interno'
  },
  'EDF. ILHA DO RETIRO': {
    nome: 'EDF. ILHA DO RETIRO',
    comercial: 'LUIS GENIS',
    tipo: 'interno'
  },
  'EDF. JARDIM BELA VISTA': {
    nome: 'EDF. JARDIM BELA VISTA',
    comercial: 'LUIS GENIS',
    tipo: 'interno'
  },
  'EDF. PRAIA DE ITAOCA': {
    nome: 'EDF. PRAIA DE ITAOCA',
    comercial: 'LUIS GENIS',
    tipo: 'interno'
  },
  'EDF. MUNIQUE': {
    nome: 'EDF. MUNIQUE',
    comercial: 'MARKETING KROMA',
    tipo: 'externo'
  },
  'EDF. THAIS DIAS': {
    nome: 'EDF. THAIS DIAS',
    comercial: 'OSCAR SETTA',
    tipo: 'externo'
  },
  'EDF. MARIA DIVA': {
    nome: 'EDF. MARIA DIVA',
    comercial: 'PAULO LUCATELLI',
    tipo: 'externo'
  },
  'EDF. DOMINGOS DE CASTRO': {
    nome: 'EDF. DOMINGOS DE CASTRO',
    comercial: 'PAULO LUCATELLI',
    tipo: 'externo'
  },
  'EDF. CONDADO COLONIAL': {
    nome: 'EDF. CONDADO COLONIAL',
    comercial: 'PAULO LUCATELLI',
    tipo: 'externo'
  },
  'EDF. ALDEIA COLONIAL': {
    nome: 'EDF. ALDEIA COLONIAL',
    comercial: 'PAULO LUCATELLI',
    tipo: 'externo'
  },
  'EDF. ALIANÇA COLONIAL': {
    nome: 'EDF. ALIANÇA COLONIAL',
    comercial: 'PAULO LUCATELLI',
    tipo: 'externo'
  },
  'EDF. PARQUE DAS ACACIAS': {
    nome: 'EDF. PARQUE DAS ACACIAS',
    comercial: 'PAULO LUCATELLI',
    tipo: 'externo'
  },
  'EDF. MAIRIPORA VILLAGE': {
    nome: 'EDF. MAIRIPORA VILLAGE',
    comercial: 'RAFAEL GOUVEIA',
    tipo: 'externo'
  },
  'EDF. DOM MOURA': {
    nome: 'EDF. DOM MOURA',
    comercial: 'RODRIGO',
    tipo: 'externo'
  },
  'EDF. COSTA REGO': {
    nome: 'EDF. COSTA REGO',
    comercial: 'SILMAR',
    tipo: 'externo'
  },
  'EDF. ARACOYARA VILLAGE': {
    nome: 'EDF. ARACOYARA VILLAGE',
    comercial: 'SR ANTONIO',
    tipo: 'externo'
  },
  'EDF. ARQUIPELAGO DOS ACORES': {
    nome: 'EDF. ARQUIPELAGO DOS ACORES',
    comercial: 'TR DIRETORIA',
    tipo: 'interno'
  },
  'EDF. JARDIM BEIRA RIO': {
    nome: 'EDF. JARDIM BEIRA RIO',
    comercial: 'TR DIRETORIA',
    tipo: 'interno'
  }
};

// Mapeamento das associações
const associacoesInfo: Record<string, CondominioInfo> = {
  'SISMO - Servidores Municipais de Olinda': {
    nome: 'SISMO - Servidores Municipais de Olinda',
    comercial: 'JULIO',
    tipo: 'interno'
  },
  'ACS - Cabos e Soldados PM/BM': {
    nome: 'ACS - Cabos e Soldados PM/BM',
    comercial: 'JULIO',
    tipo: 'interno'
  },
  'ASPCRE - Servidores Municipais do Recife': {
    nome: 'ASPCRE - Servidores Municipais do Recife',
    comercial: 'JULIO',
    tipo: 'interno'
  },
  'SINDIGUARDAS - Guardas Municipais do Recife': {
    nome: 'SINDIGUARDAS - Guardas Municipais do Recife',
    comercial: 'JULIO',
    tipo: 'interno'
  },
  'UVP - Vereadores de Pernambuco': {
    nome: 'UVP - Vereadores de Pernambuco',
    comercial: 'JULIO',
    tipo: 'interno'
  },
  'SINDICONTAS - Servidores do TCE-PE': {
    nome: 'SINDICONTAS - Servidores do TCE-PE',
    comercial: 'JULIO',
    tipo: 'interno'
  }
};

// Lista de condomínios e associações para o select
const condominios = Object.keys(condominiosInfo);
const associacoes = Object.keys(associacoesInfo);

const formSchema = (showCondominio: boolean, isAssociacao: boolean) => z.object({
  name: z.string()
    .min(3, { message: "Nome deve ter pelo menos 3 caracteres" })
    .max(100, { message: "Nome muito longo" }),
  email: z.string()
    .email({ message: "E-mail inválido" }),
  phone: z.string()
    .min(10, { message: "Telefone deve ter pelo menos 10 dígitos (com DDD)" })
    .max(15, { message: "Número de telefone muito longo" })
    .regex(/^[0-9]+$/, { message: "Telefone deve conter apenas números" }),
  consumo: z.string()
    .min(1, { message: "Por favor, informe o consumo" })
    .regex(/^\d+$/, { message: "O consumo deve conter apenas números" }),
  condominio: (showCondominio || isAssociacao)
    ? z.string().min(1, { message: "Por favor, selecione uma opção" })
    : z.string().optional()
});

interface FormValues {
  name: string;
  email: string;
  phone: string;
  consumo: string;
  condominio?: string;
}

interface LeadFormProps {
  showCondominio?: boolean;
  isAssociacao?: boolean;
}

export function LeadForm({ showCondominio = true, isAssociacao = false }: LeadFormProps) {
  console.log('Ambiente:', import.meta.env.MODE);
  console.log('Webhook URL:', import.meta.env.VITE_WEBHOOK_URL);
  console.log('Tipo de Formulário:', isAssociacao ? 'Associação' : (showCondominio ? 'Condomínio' : 'Instagram'));

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState<string>(uuidv4());
  const isMobile = useIsMobile();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema(showCondominio, isAssociacao)),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      consumo: '',
      condominio: ''
    }
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const formatPhoneNumber = (phone: string): string => {
    const phoneWithout9 = phone.replace(/^(\d{2})9(\d{8})$/, '$1$2');
    return `55${phoneWithout9}`;
  };

  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      setError(null);

      const formData = new FormData();

      const firstName = data.name.split(/\s+/)[0];
      
      Object.entries(data).forEach(([key, value]) => {
        if (value) {
          if (key === 'phone') {
            formData.append('phone', value);
            formData.append('phone_formatted', formatPhoneNumber(value));
          } else {
            formData.append(key, value);
          }
        }
      });

      formData.append('firstName', firstName);

      const consumo = parseFloat(data.consumo);
      if (!isNaN(consumo)) {
        const valorComDesconto = Math.round(consumo * 0.8);
        formData.append('valor_com_desconto', valorComDesconto.toString());

        const economiaMensal = Math.round(consumo * 0.2);
        formData.append('economia_mensal', economiaMensal.toString());

        const economiaAnual = Math.round(economiaMensal * 12);
        formData.append('economia_1_ano', economiaAnual.toString());

        const economia3Anos = Math.round(economiaMensal * 36);
        formData.append('economia_3_anos', economia3Anos.toString());

        const economia5Anos = Math.round(economiaMensal * 60);
        formData.append('economia_5_anos', economia5Anos.toString());
      }

      // Lógica específica para Instagram
      if (!showCondominio && !isAssociacao) {
        formData.append('origem', 'instagram');
        formData.append('comercial', 'ads');
        formData.append('tipo', 'digital');
        formData.append('tipo_cliente', 'instagram');
      }
      // Lógica para condomínios e associações
      else if ((showCondominio || isAssociacao) && data.condominio) {
        const info = isAssociacao ? associacoesInfo[data.condominio] : condominiosInfo[data.condominio];
        if (info) {
          formData.append('origem', info.nome);
          formData.append('comercial', info.comercial);
          formData.append('tipo', info.tipo);
          formData.append('tipo_cliente', isAssociacao ? 'associacao' : 'condominio');
        }
      }

      formData.append('data_cadastro', new Date().toISOString());
      formData.append('submissionId', submissionId);
      formData.append('timestamp', new Date().toISOString());

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const webhookUrl = import.meta.env.VITE_WEBHOOK_URL;
      console.log('Enviando formulário para:', webhookUrl);
      console.log('Dados do formulário:', {
        tipo: isAssociacao ? 'associacao' : (showCondominio ? 'condominio' : 'instagram'),
        origem: data.condominio,
        submissionId
      });

      if (!webhookUrl) {
        console.error('URL do webhook não configurada');
        throw new Error('Configuração do webhook não encontrada. Por favor, verifique as variáveis de ambiente.');
      }

      try {
        new URL(webhookUrl);
      } catch (e) {
        console.error('URL do webhook inválida:', webhookUrl);
        throw new Error('URL do webhook inválida. Por favor, verifique a configuração.');
      }

      const response = await fetch(webhookUrl, {
        method: 'POST',
        body: formData,
        headers: {
          'X-Request-Type': 'form-submission'
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('Erro na resposta do servidor:', {
          status: response.status,
          statusText: response.statusText,
          data: errorData,
          submissionId,
          webhookUrl
        });

        if (response.status === 429) {
          throw new Error('Muitas tentativas. Por favor, aguarde um momento e tente novamente.');
        } else {
          throw new Error(`Erro ao enviar formulário: ${response.statusText}`);
        }
      }

      const contentType = response.headers.get('content-type');
      let result;

      if (contentType && contentType.includes('application/json')) {
        result = await response.json();
      } else {
        result = await response.text();
      }

      console.log('Resposta do servidor:', result);

      if (response.ok) {
        toast.success('Formulário enviado com sucesso!');
        setIsSubmitted(true);
        form.reset();
        setIsSubmitting(false);
      } else {
        throw new Error('Erro ao processar resposta do servidor');
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          toast.error('O envio demorou muito tempo. Por favor, tente novamente.');
        } else {
          toast.error(error.message || 'Erro ao enviar formulário. Por favor, tente novamente.');
        }
      }
      setIsSubmitting(false);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    e.target.value = value;
    form.setValue("phone", value, { shouldValidate: true });
  };

  const handleConsumoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    e.target.value = value;
    form.setValue("consumo", value, { shouldValidate: true });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      const fieldName = e.currentTarget.name as keyof FormValues;
      form.trigger(fieldName);
    }
  };

  if (isSubmitted) {
    return <SuccessMessage />;
  }

  return (
    <div className="animate-fade-in">
      <FormHeader />

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
        <div className="space-y-3 md:space-y-4">
          {(showCondominio || isAssociacao) && (
            <div className="space-y-1 md:space-y-2">
              <Label htmlFor="condominio" className="flex items-center text-sm md:text-base">
                <Building className="w-4 h-4 mr-2 text-trenergia-blue" />
                {isAssociacao ? 'Associação' : 'Condomínio'}
              </Label>
              <div className="relative">
                <Input
                  type="text"
                  id="condominio"
                  placeholder={isAssociacao ? "Digite o nome da associação..." : "Digite o nome do condomínio..."}
                  className="w-full h-9 md:h-10"
                  {...form.register("condominio")}
                  onKeyDown={handleKeyDown}
                  list={isAssociacao ? "associacoes-list" : "condominios-list"}
                  autoComplete="off"
                />
                <datalist id={isAssociacao ? "associacoes-list" : "condominios-list"}>
                  {(isAssociacao ? associacoes : condominios).map((item) => (
                    <option key={item} value={item} />
                  ))}
                </datalist>
              </div>
              {form.formState.errors.condominio && (
                <p className="text-xs md:text-sm text-red-500 animate-slide-up">
                  {form.formState.errors.condominio.message}
                </p>
              )}
              <p className="text-xs text-gray-500">
                Digite o nome {isAssociacao ? 'da associação' : 'do condomínio'} para filtrar a lista.
              </p>
            </div>
          )}

          <div className="space-y-1 md:space-y-2">
            <Label htmlFor="name" className="flex items-center text-sm md:text-base">
              <User className="w-4 h-4 mr-2 text-trenergia-blue" />
              Nome Completo
            </Label>
            <Input
              id="name"
              placeholder="Digite seu nome completo"
              className="animated-input text-sm md:text-base h-9 md:h-10"
              {...form.register("name")}
              onKeyDown={handleKeyDown}
            />
            {form.formState.errors.name && (
              <p className="text-xs md:text-sm text-red-500 animate-slide-up">{form.formState.errors.name.message}</p>
            )}
            <p className="text-xs text-gray-500">
              Por favor, insira seu nome completo para que possamos personalizar sua proposta.
            </p>
          </div>

          <div className="space-y-1 md:space-y-2">
            <Label htmlFor="email" className="flex items-center text-sm md:text-base">
              <Mail className="w-4 h-4 mr-2 text-trenergia-blue" />
              E-mail
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="seu.email@exemplo.com"
              className="animated-input text-sm md:text-base h-9 md:h-10"
              {...form.register("email")}
              onKeyDown={handleKeyDown}
            />
            {form.formState.errors.email && (
              <p className="text-xs md:text-sm text-red-500 animate-slide-up">{form.formState.errors.email.message}</p>
            )}
            <p className="text-xs text-gray-500">
              Informe seu melhor endereço de e-mail.
            </p>
          </div>

          <div className="space-y-1 md:space-y-2">
            <Label htmlFor="phone" className="flex items-center text-sm md:text-base">
              <Phone className="w-4 h-4 mr-2 text-trenergia-blue" />
              Telefone com DDD
            </Label>
            <Input
              id="phone"
              placeholder="DDD + 9 + número"
              className="animated-input text-sm md:text-base h-9 md:h-10"
              {...form.register("phone", {
                onChange: handlePhoneChange
              })}
              onKeyDown={handleKeyDown}
            />
            {form.formState.errors.phone && (
              <p className="text-xs md:text-sm text-red-500 animate-slide-up">{form.formState.errors.phone.message}</p>
            )}
            <p className="text-xs text-gray-500">
              Forneça seu número de telefone com DDD para que possamos entrar em contato, se necessário.
            </p>
          </div>

          <div className="space-y-1 md:space-y-2">
            <Label htmlFor="consumo" className="flex items-center text-sm md:text-base">
              <Zap className="w-4 h-4 mr-2 text-trenergia-blue" />
              Valor da última fatura Neoenergia (R$)
            </Label>
            <Input
              id="consumo"
              type="text"
              placeholder="Digite apenas números"
              className="animated-input text-sm md:text-base h-9 md:h-10"
              {...form.register("consumo", {
                onChange: handleConsumoChange
              })}
              onKeyDown={handleKeyDown}
            />
            {form.formState.errors.consumo && (
              <p className="text-xs md:text-sm text-red-500 animate-slide-up">{form.formState.errors.consumo.message}</p>
            )}
            <p className="text-xs text-gray-500">
              Informe o valor em R$ da sua ultima.
            </p>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-trenergia-blue hover:bg-trenergia-lightblue text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Enviando...' : 'Enviar Formulário'}
        </Button>
      </form>
    </div>
  );
}

export default LeadForm;
