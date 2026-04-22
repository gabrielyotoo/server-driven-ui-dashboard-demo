import { Controller, useForm, useWatch } from 'react-hook-form';
import { FormField } from '../form-field';
import { useEffect } from 'react';
import type { TextComponent } from '../../types';
import { useComponent } from '../../hooks/use-component';

interface TextPropsFormProps {
  onChange: (form: TextComponent['props']) => void;
}

export const TextPropsForm = ({ onChange }: TextPropsFormProps) => {
  const component = useComponent<TextComponent>();
  const { control } = useForm<NonNullable<TextComponent['props']>>({
    defaultValues: component?.props ?? {
      textValue: '',
      numberOfLines: 1,
    },
  });
  const values = useWatch({ control });

  useEffect(() => {
    onChange(values as TextComponent['props']);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  return (
    <form className="flex flex-col gap-y-2">
      <Controller
        name="textValue"
        control={control}
        render={({ field }) => <FormField label="Valor" {...field} />}
      />
      <Controller
        name="numberOfLines"
        control={control}
        render={({ field }) => (
          <FormField
            {...field}
            label="Número de linhas"
            type="number"
            min={0}
            helperText="0 para não definir"
          />
        )}
      />
    </form>
  );
};
