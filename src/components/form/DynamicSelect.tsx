import React from 'react';
import { Building } from 'lucide-react';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useFormContext } from 'react-hook-form';

interface DynamicSelectProps {
  label: string;
  name: string;
  options: string[];
  placeholder: string;
}

export const DynamicSelect: React.FC<DynamicSelectProps> = ({ label, name, options, placeholder }) => {
  const { formState: { errors }, setValue, watch } = useFormContext();

  return (
    <div className="space-y-2 md:space-y-3">
      <Label htmlFor={name} className="text-sm md:text-base font-medium text-gray-700 dark:text-gray-200">
        <Building className="w-4 h-4 mr-2 text-trenergia-blue" />
        {label}
      </Label>
      <Select
        onValueChange={(value) => setValue(name, value)}
        value={watch(name)}
        name={name}
      >
        <SelectTrigger className="h-9 md:h-10 text-sm md:text-base rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          {options.map((option) => (
            <SelectItem
              key={option}
              value={option}
              className="text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {errors[name] && (
        <p className="text-[11px] md:text-xs text-red-500 dark:text-red-400 animate-slide-up">
          {errors[name]?.message?.toString()}
        </p>
      )}
    </div>
  );
}; 