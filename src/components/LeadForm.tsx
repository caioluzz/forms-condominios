import * as React from 'react';
import { useState, useMemo, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { User, Mail, Phone, Zap, Building, Check, ChevronsUpDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import FormHeader from './FormHeader';
import SuccessMessage from './SuccessMessage';
import { useIsMobile } from '@/hooks/use-mobile';
import { v4 as uuidv4 } from 'uuid';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// Interface para as informações do condomínio
interface CondominioInfo {
  nome: string;
  comercial: string;
  tipo: 'interno' | 'externo';
}

// Mapeamento dos condomínios com suas informações
const condominiosInfo: Record<string, CondominioInfo> = {
  'CONDOMINIO DO EDIFICIO LUCIANO COSTA': {
    nome: 'CONDOMINIO DO EDIFICIO LUCIANO COSTA',
    comercial: 'AMANDA TR',
    tipo: 'interno'
  },
  'CONDOMINIO DO EDIFICIO LOFT CASA FORTE': {
    nome: 'CONDOMINIO DO EDIFICIO LOFT CASA FORTE',
    comercial: 'AMANDA TR',
    tipo: 'interno'
  },
  'CONDOMINIO DO EDIFICIO COSTA AZUL': {
    nome: 'CONDOMINIO DO EDIFICIO COSTA AZUL',
    comercial: 'AMANDA TR',
    tipo: 'interno'
  },
  'CONDOMINIO DO CONJUNTO RESIDENCIAL IGNEZ ANDREAZZA': {
    nome: 'CONDOMINIO DO CONJUNTO RESIDENCIAL IGNEZ ANDREAZZA',
    comercial: 'AMANDA TR',
    tipo: 'interno'
  },
  'CONDOMINIO DO EDIFICIO GIRASSOIS': {
    nome: 'CONDOMINIO DO EDIFICIO GIRASSOIS',
    comercial: 'AMANDA TR',
    tipo: 'interno'
  },
  'CONDOMÍNIO DO EDIFÍCIO PARC DE LOIRE': {
    nome: 'CONDOMÍNIO DO EDIFÍCIO PARC DE LOIRE',
    comercial: 'AMANDA TR',
    tipo: 'interno'
  },
  'CONDOMINIO DO EDIFÍCIO QUATRO ESTAÇÃO': {
    nome: 'CONDOMINIO DO EDIFÍCIO QUATRO ESTAÇÃO',
    comercial: 'AMANDA TR',
    tipo: 'interno'
  },
  'CONDOMINIO DO EDIFICIO JOHN LENNON': {
    nome: 'CONDOMINIO DO EDIFICIO JOHN LENNON',
    comercial: 'AMANDA TR',
    tipo: 'interno'
  },
  'CONDOMINIO DO EDIFICIO LIVERPOOL': {
    nome: 'CONDOMINIO DO EDIFICIO LIVERPOOL',
    comercial: 'AMANDA TR',
    tipo: 'interno'
  },
  'CONDOMÍNIO DO EDF. BRUXELAS': {
    nome: 'CONDOMÍNIO DO EDF. BRUXELAS',
    comercial: 'AMANDA TR',
    tipo: 'interno'
  },
  'CONDOMINIO DO EDIFICIO SÃO SALVADOR': {
    nome: 'CONDOMINIO DO EDIFICIO SÃO SALVADOR',
    comercial: 'AMANDA TR',
    tipo: 'interno'
  },
  'CONDOMINIO DO EDIFICIO AVIGNON': {
    nome: 'CONDOMINIO DO EDIFICIO AVIGNON',
    comercial: 'AMANDA TR',
    tipo: 'interno'
  },
  'CONDOMINIO DO EDIFICIO PARK FLEMING': {
    nome: 'CONDOMINIO DO EDIFICIO PARK FLEMING',
    comercial: 'AMANDA TR',
    tipo: 'interno'
  },
  'CONDOMINIO DO EDF. PORTE ORLEANS': {
    nome: 'CONDOMINIO DO EDF. PORTE ORLEANS',
    comercial: 'AMANDA',
    tipo: 'interno'
  },
  'CONDOMINIO EDIFICO CASA GRANDE DAS UBAIAS': {
    nome: 'CONDOMINIO EDIFICO CASA GRANDE DAS UBAIAS',
    comercial: 'ANDRE FAUSTO',
    tipo: 'interno'
  },
  'CONDOMÍNIO DO EDIFÍCIO ROYAL EMBASSY': {
    nome: 'CONDOMÍNIO DO EDIFÍCIO ROYAL EMBASSY',
    comercial: 'ANDRE FAUSTO',
    tipo: 'interno'
  },
  'CONDOMINIO DO EDIFICIO FIRST S VILLAGE': {
    nome: 'CONDOMINIO DO EDIFICIO FIRST S VILLAGE',
    comercial: 'ANDRE FAUSTO',
    tipo: 'interno'
  },
  'CONDOMINIO DO EDIFICIO ATLANTA': {
    nome: 'CONDOMINIO DO EDIFICIO ATLANTA',
    comercial: 'ANDRE FAUSTO',
    tipo: 'interno'
  },
  'CONDOMINIO DO EDIFICIO MAISON CLASSIC': {
    nome: 'CONDOMINIO DO EDIFICIO MAISON CLASSIC',
    comercial: 'ANDRE FAUSTO',
    tipo: 'interno'
  },
  'CONDOMINIO DO EDIFICIO VEREDA DO MAR': {
    nome: 'CONDOMINIO DO EDIFICIO VEREDA DO MAR',
    comercial: 'ANDRE FAUSTO',
    tipo: 'interno'
  },
  'CONDOMINIO DO EDIFICIO RESIDENCIAL LINCOLN AVENIDA': {
    nome: 'CONDOMINIO DO EDIFICIO RESIDENCIAL LINCOLN AVENIDA',
    comercial: 'ANDRE FAUSTO',
    tipo: 'interno'
  },
  'CONDOMINIO DO EDIFICIO MONTE DOS GUARARAPES': {
    nome: 'CONDOMINIO DO EDIFICIO MONTE DOS GUARARAPES',
    comercial: 'ANDRE FAUSTO',
    tipo: 'interno'
  },
  'CONDOMINIO DO EDIFICIO ALGARVE': {
    nome: 'CONDOMINIO DO EDIFICIO ALGARVE',
    comercial: 'ANDRE FAUSTO',
    tipo: 'interno'
  },
  'CONDOMINIO DO EDIFICIO COSTA DO SOL': {
    nome: 'CONDOMINIO DO EDIFICIO COSTA DO SOL',
    comercial: 'ANDRE FAUSTO',
    tipo: 'interno'
  },
  'CONDOMINIO DO EDIFICIO EMILIA LOPES': {
    nome: 'CONDOMINIO DO EDIFICIO EMILIA LOPES',
    comercial: 'ANDRE FAUSTO',
    tipo: 'interno'
  },
  'CONDOMINIO DO EDIFICIO CARLA DIAS': {
    nome: 'CONDOMINIO DO EDIFICIO CARLA DIAS',
    comercial: 'ANDRE FAUSTO',
    tipo: 'interno'
  },
  'CONDOMINIO DO EDIFICIO COSTA DAS PALMEIRAS': {
    nome: 'CONDOMINIO DO EDIFICIO COSTA DAS PALMEIRAS',
    comercial: 'ANDRE FAUSTO',
    tipo: 'interno'
  },
  'CONDOMINIO RESIDENCIAL FERREIRA LOPES': {
    nome: 'CONDOMINIO RESIDENCIAL FERREIRA LOPES',
    comercial: 'ANDRE FAUSTO',
    tipo: 'interno'
  },
  'CONDOMINIO EDIFICIO LULA CARDOSO AYRES': {
    nome: 'CONDOMINIO EDIFICIO LULA CARDOSO AYRES',
    comercial: 'ANDRE FAUSTO',
    tipo: 'interno'
  },
  'CONDOMINIO DO EDIFICIO ESPANHA': {
    nome: 'CONDOMINIO DO EDIFICIO ESPANHA',
    comercial: 'CAMILLA',
    tipo: 'externo'
  },
  'CONDOMINIO DO EDIFICIO GOLDEN LAKE': {
    nome: 'CONDOMINIO DO EDIFICIO GOLDEN LAKE',
    comercial: 'CAMILLA',
    tipo: 'externo'
  },
  'CONDOMINIO DO PRIVE TROPICALIENTE': {
    nome: 'CONDOMINIO DO PRIVE TROPICALIENTE',
    comercial: 'CRISTIANE',
    tipo: 'interno'
  },
  'CONDOMINIO DO EDIFICIO UBAIAS PRINCE': {
    nome: 'CONDOMINIO DO EDIFICIO UBAIAS PRINCE',
    comercial: 'DANILO TR',
    tipo: 'externo'
  },
  'CONDOMINIO DO EDIFICIO PORTAL DO CAPIBARIBE': {
    nome: 'CONDOMINIO DO EDIFICIO PORTAL DO CAPIBARIBE',
    comercial: 'EDUARDO',
    tipo: 'externo'
  },
  'CONDOMINIO DO EMPRESARIAL GABRIEL BACELAR CORPORATE': {
    nome: 'CONDOMINIO DO EMPRESARIAL GABRIEL BACELAR CORPORATE',
    comercial: 'EDUARDO RIBEIRO',
    tipo: 'externo'
  },
  'CONDOMÍNIO DO EDIFÍCIO ACROPOLE': {
    nome: 'CONDOMÍNIO DO EDIFÍCIO ACROPOLE',
    comercial: 'EDUARDO RIBEIRO',
    tipo: 'externo'
  },
  'CONDOMINIO DO EDIFICIO MASTER ESPINHEIRO': {
    nome: 'CONDOMINIO DO EDIFICIO MASTER ESPINHEIRO',
    comercial: 'EMMANUEL KROMA',
    tipo: 'externo'
  },
  'CONDOMINIO PIRES FERREIRA': {
    nome: 'CONDOMINIO PIRES FERREIRA',
    comercial: 'FERNANDA TR',
    tipo: 'externo'
  },
  'CONDOMINIO DO EDIFICIO CASTELO B. RENDA': {
    nome: 'CONDOMINIO DO EDIFICIO CASTELO B. RENDA',
    comercial: 'FERNANDA TR',
    tipo: 'externo'
  },
  'CONDOMINIO EDF. OCAPORÃ': {
    nome: 'CONDOMINIO EDF. OCAPORÃ',
    comercial: 'FERNANDO A F NETO',
    tipo: 'externo'
  },
  'CONDOMINIO EDF SAN GERMINIANO': {
    nome: 'CONDOMINIO EDF SAN GERMINIANO',
    comercial: 'FOFAO',
    tipo: 'externo'
  },
  'CONDOMÍNIO RESIDENCIAL VIA BRECIA': {
    nome: 'CONDOMÍNIO RESIDENCIAL VIA BRECIA',
    comercial: 'FOFAO',
    tipo: 'externo'
  },
  'CONDOMINIO DO EDIFICIO ADOLPHO PEREIRA CARNEIRO': {
    nome: 'CONDOMINIO DO EDIFICIO ADOLPHO PEREIRA CARNEIRO',
    comercial: 'GUSTAVO',
    tipo: 'interno'
  },
  'CONDOMINIO RESERVA DO POCO': {
    nome: 'CONDOMINIO RESERVA DO POCO',
    comercial: 'GUSTAVO TR',
    tipo: 'interno'
  },
  'CONDOMINIO DO EDIFICIO DUNE': {
    nome: 'CONDOMINIO DO EDIFICIO DUNE',
    comercial: 'GUSTAVO TR',
    tipo: 'interno'
  },
  'CONDOMINIO DO EDIFICIO MARIA SOPHIE': {
    nome: 'CONDOMINIO DO EDIFICIO MARIA SOPHIE',
    comercial: 'GUSTAVO TR',
    tipo: 'interno'
  },
  'CONDOMINIO CONJ RESD RIO ARAUA': {
    nome: 'CONDOMINIO CONJ RESD RIO ARAUA',
    comercial: 'GUSTAVO TR',
    tipo: 'interno'
  },
  'CONDOMÍNIO MORADA DO SOL': {
    nome: 'CONDOMÍNIO MORADA DO SOL',
    comercial: 'HELMO',
    tipo: 'externo'
  },
  'CONDOMÍNIO DO EDF SALOMAO KELNER': {
    nome: 'CONDOMÍNIO DO EDF SALOMAO KELNER',
    comercial: 'HELMO',
    tipo: 'externo'
  },
  'CONDOMINIO DO EDIFICIO BOULEVARD RESIDENCIAL JOSE NORONHA': {
    nome: 'CONDOMINIO DO EDIFICIO BOULEVARD RESIDENCIAL JOSE NORONHA',
    comercial: 'IRANILDO',
    tipo: 'externo'
  },
  'CONDOMINIO DO EDIFICIO LITORAL': {
    nome: 'CONDOMINIO DO EDIFICIO LITORAL',
    comercial: 'IRANILDO',
    tipo: 'externo'
  },
  'CONDOMINIO DO EDIFICIO MARIA DO CARMO ALVES': {
    nome: 'CONDOMINIO DO EDIFICIO MARIA DO CARMO ALVES',
    comercial: 'JOÃO MATHEUS',
    tipo: 'externo'
  },
  'CONDOMÍNIO DO EDIFÍCIO ALBUQUERQUE MOREIRA': {
    nome: 'CONDOMÍNIO DO EDIFÍCIO ALBUQUERQUE MOREIRA',
    comercial: 'JOSÉ CARLOS (JULIO)',
    tipo: 'externo'
  },
  'CONDOMINIO DOS EDIFICIOS AVA GARDNER E SOPHIE LOREN': {
    nome: 'CONDOMINIO DOS EDIFICIOS AVA GARDNER E SOPHIE LOREN',
    comercial: 'JULIO',
    tipo: 'interno'
  },
  'CONDOMINIO EDF. PALMVILLAGE': {
    nome: 'CONDOMINIO EDF. PALMVILLAGE',
    comercial: 'JULIO PARIZIO',
    tipo: 'interno'
  },
  'CONDOMINIO EDF OPERA CLASSIC': {
    nome: 'CONDOMINIO EDF OPERA CLASSIC',
    comercial: 'JULIO PARIZIO',
    tipo: 'interno'
  },
  'CONDOMINIO EDF RIO BRANCO': {
    nome: 'CONDOMINIO EDF RIO BRANCO',
    comercial: 'JULIO PARIZIO',
    tipo: 'interno'
  },
  'CONDOMINIO EDF ILHA DO RETIRO': {
    nome: 'CONDOMINIO EDF ILHA DO RETIRO',
    comercial: 'LUIS GENIS',
    tipo: 'interno'
  },
  'CONDOMINIO EDF. JARDIM BELA VISTA': {
    nome: 'CONDOMINIO EDF. JARDIM BELA VISTA',
    comercial: 'LUIS GENIS',
    tipo: 'interno'
  },
  'CONDOMINIO DO EDIFICIO PRAIA DE ITAOCA': {
    nome: 'CONDOMINIO DO EDIFICIO PRAIA DE ITAOCA',
    comercial: 'LUIS GENIS',
    tipo: 'interno'
  },
  'CONDOMINIO DO EDIFÍCIO MUNIQUE': {
    nome: 'CONDOMINIO DO EDIFÍCIO MUNIQUE',
    comercial: 'MARKETING KROMA',
    tipo: 'externo'
  },
  'CONDOMINO EDF THAIS DIAS': {
    nome: 'CONDOMINO EDF THAIS DIAS',
    comercial: 'OSCAR SETTA',
    tipo: 'externo'
  },
  'CONDOMINIO EDF MARIA DIVA': {
    nome: 'CONDOMINIO EDF MARIA DIVA',
    comercial: 'PAULO LUCATELLI',
    tipo: 'externo'
  },
  'CONDOMINIO EDF DOMINGOS DE CASTRO': {
    nome: 'CONDOMINIO EDF DOMINGOS DE CASTRO',
    comercial: 'PAULO LUCATELLI',
    tipo: 'externo'
  },
  'CONDOMINIO EDF. COND CONDADO COLONIAL': {
    nome: 'CONDOMINIO EDF. COND CONDADO COLONIAL',
    comercial: 'PAULO LUCATELLI',
    tipo: 'externo'
  },
  'CONDOMINIO EDF ALDEIA COLONIAL': {
    nome: 'CONDOMINIO EDF ALDEIA COLONIAL',
    comercial: 'PAULO LUCATELLI',
    tipo: 'externo'
  },
  'CONDOMINIO EDF. ALIANÇA COLONIAL': {
    nome: 'CONDOMINIO EDF. ALIANÇA COLONIAL',
    comercial: 'PAULO LUCATELLI',
    tipo: 'externo'
  },
  'CONDOMINIO EDIF PARQUE DAS ACACIAS': {
    nome: 'CONDOMINIO EDIF PARQUE DAS ACACIAS',
    comercial: 'PAULO LUCATELLI',
    tipo: 'externo'
  },
  'CONDOMINIO DO EDIFICIO MAIRIPORA VILLAGE': {
    nome: 'CONDOMINIO DO EDIFICIO MAIRIPORA VILLAGE',
    comercial: 'RAFAEL GOUVEIA',
    tipo: 'externo'
  },
  'CONDOMINIO DO EDIFICIO DOM MOURA': {
    nome: 'CONDOMINIO DO EDIFICIO DOM MOURA',
    comercial: 'RODRIGO',
    tipo: 'externo'
  },
  'CONDOMINIO DO EDIFICIO COSTA REGO': {
    nome: 'CONDOMINIO DO EDIFICIO COSTA REGO',
    comercial: 'SILMAR',
    tipo: 'externo'
  },
  'CONDOMINIO DO EDIFICIO ARACOYARA VILLAGE': {
    nome: 'CONDOMINIO DO EDIFICIO ARACOYARA VILLAGE',
    comercial: 'SR ANTONIO',
    tipo: 'externo'
  },
  'CONDOMINIO DO EDIFICIO ARQUIPELAGO DOS ACORES': {
    nome: 'CONDOMINIO DO EDIFICIO ARQUIPELAGO DOS ACORES',
    comercial: 'TR DIRETORIA',
    tipo: 'interno'
  },
  'CONDOMINIO DO EDIFICIO JARDIM BEIRA RIO': {
    nome: 'CONDOMINIO DO EDIFICIO JARDIM BEIRA RIO',
    comercial: 'TR DIRETORIA',
    tipo: 'interno'
  }
};

// Lista de condomínios para o select
const condominios = Object.keys(condominiosInfo);

const formSchema = z.object({
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
  condominio: z.string()
    .min(1, { message: "Por favor, selecione um condomínio" })
});

interface FormValues {
  name: string;
  email: string;
  phone: string;
  consumo: string;
  condominio: string;
}

export function LeadForm() {
  console.log('Ambiente:', import.meta.env.MODE);
  console.log('Webhook URL:', import.meta.env.VITE_WEBHOOK_URL);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState<string>(uuidv4());
  const isMobile = useIsMobile();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
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

  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      setError(null);

      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (value) {
          formData.append(key, value);
        }
      });

      // Adicionando as informações do condomínio
      const condominioSelecionado = condominiosInfo[data.condominio];
      if (condominioSelecionado) {
        formData.append('origem', condominioSelecionado.nome);
        formData.append('comercial', condominioSelecionado.comercial);
        formData.append('tipo', condominioSelecionado.tipo);
      }

      formData.append('data_cadastro', new Date().toISOString());
      formData.append('submissionId', submissionId);
      formData.append('timestamp', new Date().toISOString());

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const webhookUrl = import.meta.env.VITE_WEBHOOK_URL;
      console.log('Webhook URL:', webhookUrl);

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
      // Apenas valida o campo atual sem submeter o formulário
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
          <div className="space-y-1 md:space-y-2">
            <Label htmlFor="condominio" className="flex items-center text-sm md:text-base">
              <Building className="w-4 h-4 mr-2 text-trenergia-blue" />
              Condomínio
            </Label>
            <div className="relative">
              <Input
                type="text"
                id="condominio"
                placeholder="Digite o nome do condomínio..."
                className="w-full h-9 md:h-10"
                {...form.register("condominio")}
                onKeyDown={handleKeyDown}
                list="condominios-list"
                autoComplete="off"
              />
              <datalist id="condominios-list">
                {condominios.map((condominio) => (
                  <option key={condominio} value={condominio} />
                ))}
              </datalist>
            </div>
            {form.formState.errors.condominio && (
              <p className="text-xs md:text-sm text-red-500 animate-slide-up">
                {form.formState.errors.condominio.message}
              </p>
            )}
            <p className="text-xs text-gray-500">
              Digite o nome do condomínio para filtrar a lista.
            </p>
          </div>

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
