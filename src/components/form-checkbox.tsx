import { useId } from 'react';

interface FormCheckboxProps extends Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  'value'
> {
  label: string;
  value: boolean;
  helperText?: string;
}

export const FormCheckbox = ({
  label,
  helperText,
  value,
  ...props
}: FormCheckboxProps) => {
  const id = useId();

  return (
    <span className="flex flex-col items-start">
      <span className="flex flex-row gap-x-4">
        <label className="font-medium" htmlFor={id}>
          {label}
        </label>
        <input
          className={props.disabled ? 'text-gray-400/35' : ''}
          type="checkbox"
          {...props}
          checked={value}
          id={id}
          name={id}
        />
      </span>
      {helperText ? (
        <p className="text-sm text-white/30">{helperText}</p>
      ) : null}
    </span>
  );
};
