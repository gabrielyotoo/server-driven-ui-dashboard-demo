import { useId, type DetailedHTMLProps } from 'react';

interface Option {
  value: string;
  text: string;
}

interface FormSelectorProps extends DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> {
  label: string;
  helperText?: string;
  options: Option[] | string[];
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
          {options.map((option) => {
            const text = typeof option === 'string' ? option : option.text;
            const value = typeof option === 'string' ? option : option.value;

            return (
              <option key={text} value={value}>
                {text}
              </option>
            );
          })}
        </select>
      </span>
      {helperText ? (
        <p className="text-sm text-white/30">{helperText}</p>
      ) : null}
    </span>
  );
};
