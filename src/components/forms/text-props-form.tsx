import { Controller, useForm, useWatch } from 'react-hook-form';
import { FormField } from '../form-field';
import { useEffect } from 'react';
import type { TextComponent } from '../../types';
import { useComponent } from '../../hooks/use-component';

interface TextPropsFormValues extends Omit<
  NonNullable<TextComponent['props']>,
  'children'
> {
  textValue: string;
}

interface TextPropsFormProps {
  onChange: (form: TextPropsFormValues) => void;
}

export const TextPropsForm = ({ onChange }: TextPropsFormProps) => {
  const component = useComponent<TextComponent>();
  const { control } = useForm<TextPropsFormValues>({
    defaultValues: component?.props
      ? {
          textValue: component.props.children,
          numberOfLines: component.props.numberOfLines,
        }
      : {
          textValue: '',
          numberOfLines: 1,
        },
  });
  const values = useWatch({ control });

  useEffect(() => {
    onChange(values as TextPropsFormValues);
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
