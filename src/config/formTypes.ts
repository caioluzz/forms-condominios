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
      items: [
        { value: 'condominio1', label: 'Condomínio 1' },
        { value: 'condominio2', label: 'Condomínio 2' },
      ],
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
      items: [
        { value: 'associacao1', label: 'Associação 1' },
        { value: 'associacao2', label: 'Associação 2' },
      ],
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
      items: [
        { value: 'circulo1', label: 'Círculo Militar 1' },
        { value: 'circulo2', label: 'Círculo Militar 2' },
      ],
    },
  }
}; 