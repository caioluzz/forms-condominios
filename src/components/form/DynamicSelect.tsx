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
      <Label htmlFor={name} className="flex items-center text-sm md:text-base font-medium text-gray-700">
        <Building className="w-4 h-4 mr-2 text-trenergia-blue" />
        {label}
      </Label>
      <Select
        onValueChange={(value) => setValue(name, value)}
        value={watch(name)}
      >
        <SelectTrigger className="w-full h-11 md:h-12">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {errors[name] && (
        <p className="text-sm text-red-500 animate-slide-up">
          {errors[name]?.message?.toString()}
        </p>
      )}
    </div>
  );
}; 