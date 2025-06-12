import { condominiosInfo, associacoesInfo, circulosMilitaresInfo } from '../data/entities';

export type FormType = 'instagram' | 'condominio' | 'associacao' | 'circulomilitar';

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
      items: Object.keys(condominiosInfo).map(key => ({ value: key, label: condominiosInfo[key].nome })),
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
      items: Object.keys(associacoesInfo).map(key => ({ value: key, label: associacoesInfo[key].nome })),
    },
  },
  circulomilitar: {
    title: "Cliente TR Energia tem até 20% de desconto na conta de energia!",
    description: "Preencha o formulário abaixo para receber sua proposta personalizada e descobrir como aproveitar esse benefício exclusivo.",
    submitText: "Enviar Formulário",
    successMessage: "Obrigado! Em breve entraremos em contato.",
    options: {
      label: "Círculo Militar",
      placeholder: "Selecione um círculo militar...",
      items: Object.keys(circulosMilitaresInfo).map(key => ({ value: key, label: circulosMilitaresInfo[key].nome })),
    },
  }
}; 