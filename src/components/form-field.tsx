import { useId, useMemo } from 'react';
import { twJoin } from 'tailwind-merge';

interface FormFieldProps extends React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> {
  label: string;
  helperText?: string;
}

export const FormField = ({ label, helperText, ...props }: FormFieldProps) => {
  const id = useId();

  const inputClasses = useMemo(
    () =>
      twJoin(
        'border-b focus:border-0 focus:border-b-2 focus:border-orange-600',
        props.disabled ? 'text-gray-400/35' : '',
      ),
    [props.disabled],
  );

  return (
    <span className="flex flex-col items-start">
      <span className="flex flex-row gap-x-4">
        <label className="font-medium" htmlFor={id}>
          {label}
        </label>
        <input className={inputClasses} {...props} id={id} name={id} />
      </span>
      {helperText ? (
        <p className="text-sm text-white/30">{helperText}</p>
      ) : null}
    </span>
  );
};
