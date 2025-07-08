import { condominiosInfo, associacoesInfo, circulosMilitaresInfo } from '../data/entities';

export type FormType = 'instagram' | 'condominio' | 'associacao' | 'circulomilitar' | 'agencialean' | 'servrecife' | 'alumiaco' | 'prefeitura_floresta';

export interface FormConfig {
  title: string;
  description: string;
  submitText: string;
  successMessage: string;
  options?: {
    label: string;
    placeholder: string;
    items: Array<{
      value: string;
      label: string;
    }>;
  };
}

export const formConfigs: Record<FormType, FormConfig> = {
  instagram: {
    title: "Cliente TR Energia tem até 20% de desconto na conta de energia!",
    description: "Preencha o formulário abaixo para receber sua proposta personalizada e descobrir como aproveitar esse benefício exclusivo.",
    submitText: "Enviar Formulário",
    successMessage: "Obrigado! Em breve entraremos em contato."
  },
  condominio: {
    title: "Cliente TR Energia tem até 20% de desconto na conta de energia!",
    description: "Preencha o formulário abaixo para receber sua proposta personalizada e descobrir como aproveitar esse benefício exclusivo.",
    submitText: "Enviar Formulário",
    successMessage: "Obrigado! Em breve entraremos em contato.",
    options: {
      label: "Condomínio",
      placeholder: "Selecione um condomínio...",
      items: Object.keys(condominiosInfo)
        .map(key => ({ value: key, label: condominiosInfo[key].nome }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    },
  },
  associacao: {
    title: "Cliente TR Energia tem até 20% de desconto na conta de energia!",
    description: "Preencha o formulário abaixo para receber sua proposta personalizada e descobrir como aproveitar esse benefício exclusivo.",
    submitText: "Enviar Formulário",
    successMessage: "Obrigado! Em breve entraremos em contato.",
    options: {
      label: "Associação",
      placeholder: "Selecione uma associação...",
      items: Object.keys(associacoesInfo)
        .map(key => ({ value: key, label: associacoesInfo[key].nome }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    },
  },
  circulomilitar: {
    title: "Cliente TR Energia tem até 20% de desconto na conta de energia!",
    description: "Preencha o formulário abaixo para receber sua proposta personalizada e descobrir como aproveitar esse benefício exclusivo.",
    submitText: "Enviar Formulário",
    successMessage: "Obrigado! Em breve entraremos em contato.",
  },
  agencialean: {
    title: "Cliente TR Energia tem até 20% de desconto na conta de energia!",
    description: "Preencha o formulário abaixo para receber sua proposta personalizada e descobrir como aproveitar esse benefício exclusivo.",
    submitText: "Enviar Formulário",
    successMessage: "Obrigado! Em breve entraremos em contato.",
  }, 
  servrecife: {
    title: "Cliente TR Energia tem até 20% de desconto na conta de energia!",
    description: "Preencha o formulário abaixo para receber sua proposta personalizada e descobrir como aproveitar esse benefício exclusivo.",
    submitText: "Enviar Formulário",
    successMessage: "Obrigado! Em breve entraremos em contato.",
  }, 
  alumiaco: {
    title: "Cliente TR Energia tem até 20% de desconto na conta de energia!",
    description: "Preencha o formulário abaixo para receber sua proposta personalizada e descobrir como aproveitar esse benefício exclusivo.",
    submitText: "Enviar Formulário",
    successMessage: "Obrigado! Em breve entraremos em contato.",
  }, 
  prefeitura_floresta: {
    title: "ADERE - Servidor Floresta - PE tem 15% de desconto na conta de energia!",
    description: "Preencha o formulário abaixo para receber sua proposta personalizada e descobrir como aproveitar esse benefício exclusivo.",
    submitText: "Enviar Formulário",
    successMessage: "Obrigado! Em breve entraremos em contato.",
  },
}; 