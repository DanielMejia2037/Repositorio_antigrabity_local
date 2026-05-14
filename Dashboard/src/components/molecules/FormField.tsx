import { useId, forwardRef, type InputHTMLAttributes } from 'react';
import { Input } from '@/components/atoms/Input';

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, helperText, ...props }, ref) => {
    const id = useId();
    return (
      <Input
        ref={ref}
        id={id}
        label={label}
        error={error}
        helperText={helperText}
        {...props}
      />
    );
  },
);

FormField.displayName = 'FormField';
