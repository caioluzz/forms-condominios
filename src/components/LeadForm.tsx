import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Mail, Phone, Zap } from 'lucide-react';
import FormHeader from './FormHeader';
import { FormField } from './form/FormField';
import { Button } from './ui/button';
import { useLeadForm } from '../hooks/use-lead-form';
import { FormConfig, formConfigs } from '@/config/formTypes';
import { DynamicSelect } from './form/DynamicSelect';
import SuccessMessage from './SuccessMessage';

interface LeadFormProps {
  type: keyof typeof formConfigs;
}

const formSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  phone: z.string()
    .min(1, 'Telefone é obrigatório')
    .regex(/^\d{2}9\d{8}$/, 'Telefone inválido. Use o formato DDD + 9 + número, ex: 81900000000'),
  option: z.string().optional(),
  consumo: z.string()
    .min(1, 'Consumo é obrigatório')
    .regex(/^\d+$/, 'Digite apenas números no campo consumo'),
});

type FormValues = z.infer<typeof formSchema>;

export const LeadForm: React.FC<LeadFormProps> = ({ type }) => {
  const config = formConfigs[type];
  const { handleSubmit, isLoading } = useLeadForm();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      option: '',
      consumo: '',
    },
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = async (data: Required<FormValues>) => {
    const success = await handleSubmit(data, type);
    if (success) {
      setIsSubmitted(true);
      form.reset();
    }
  };

  if (isSubmitted) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-[#e0f2fe] to-[#bfdbfe] dark:from-gray-900 dark:to-gray-800 pt-8 pb-8 md:pt-16 md:pb-16">
        <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-4 md:p-8 animate-fade-in mx-2">
          <SuccessMessage message={config.successMessage} />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-[#e0f2fe] to-[#bfdbfe] dark:from-gray-900 dark:to-gray-800 pt-8 pb-8 md:pt-16 md:pb-16">
      <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-4 md:p-8 animate-fade-in mx-2">
        <FormHeader config={config} />
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
            <div className="space-y-3 md:space-y-4">
              {config.options && type !== 'circulomilitar' && (
                <DynamicSelect
                  label={config.options.label}
                  name="option"
                  options={config.options.items.map(item => item.value)}
                  placeholder={config.options.placeholder}
                />
              )}

              <FormField
                label="Nome Completo"
                name="name"
                placeholder="Digite seu nome completo"
                icon={<User className="w-4 h-4 mr-2 text-trenergia-blue" />}
                helperText="Por favor, insira seu nome completo para que possamos personalizar sua proposta."
              />

              <FormField
                label="E-mail"
                name="email"
                type="email"
                placeholder="seu.email@exemplo.com"
                icon={<Mail className="w-4 h-4 mr-2 text-trenergia-blue" />}
                helperText="Informe seu melhor endereço de e-mail."
              />

              <FormField
                label="Telefone com DDD"
                name="phone"
                placeholder="DDD + 9 + número"
                icon={<Phone className="w-4 h-4 mr-2 text-trenergia-blue" />}
                helperText="Forneça seu número de telefone com DDD para que possamos entrar em contato."
              />

              <FormField
                label="Valor da última fatura Neoenergia (R$)"
                name="consumo"
                placeholder="Digite apenas números"
                icon={<Zap className="w-4 h-4 mr-2 text-trenergia-blue" />}
                helperText="Informe o valor em R$ da sua ultima fatura."
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-trenergia-blue hover:bg-trenergia-lightblue text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
              disabled={isLoading}
            >
              {isLoading ? 'Enviando...' : config.submitText}
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default LeadForm;
