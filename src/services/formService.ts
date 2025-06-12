import { FormValues } from '@/types/form';

export const submitForm = async (data: FormValues, webhookUrl: string) => {
  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Erro ao enviar formulário');
  }

  return response.json();
}; 