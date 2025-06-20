import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  helperText?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = 'text',
  placeholder,
  icon,
  helperText,
  onChange
}) => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-2 md:space-y-3">
      <Label htmlFor={name} className="flex items-center text-sm md:text-base font-medium text-gray-700 dark:text-gray-200">
        {icon}
        {label}
      </Label>
      <div className="relative">
        <Input
          type={type}
          id={name}
          placeholder={placeholder}
          className={`${icon ? 'pl-10' : ''} h-9 md:h-10 text-sm md:text-base rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white px-3`}
          {...register(name)}
          onChange={onChange}
        />
      </div>
      {errors[name] && (
        <p className="text-[11px] md:text-xs text-red-500 dark:text-red-400 animate-slide-up">
          {errors[name]?.message?.toString()}
        </p>
      )}
      {helperText && (
        <p className="text-[11px] md:text-xs text-gray-500 dark:text-gray-400">
          {helperText}
        </p>
      )}
    </div>
  );
}; 