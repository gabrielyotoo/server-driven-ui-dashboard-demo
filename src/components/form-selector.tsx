import { useId, type DetailedHTMLProps } from 'react';

interface FormSelectorProps extends DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> {
  label: string;
  helperText?: string;
  options: string[];
}

export const FormSelector = ({
  label,
  helperText,
  options,
  ...props
}: FormSelectorProps) => {
  const id = useId();

  return (
    <span className="flex flex-col items-start">
      <span className="flex flex-row gap-x-4">
        <label className="font-medium" htmlFor={id}>
          {label}
        </label>
        <select id={id} name={id} {...props}>
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </span>
      {helperText ? (
        <p className="text-sm text-white/30">{helperText}</p>
      ) : null}
    </span>
  );
};
