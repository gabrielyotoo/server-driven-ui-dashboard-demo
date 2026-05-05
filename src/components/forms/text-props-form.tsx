import { Controller, useForm, useWatch } from 'react-hook-form';
import { FormField } from '../form-field';
import { useEffect } from 'react';
// TODO: tipar essa lib
// @ts-expect-error Library does not have types
import StyleEditor from 'react-style-editor';
import type { TextComponent } from '../../types';
import { useComponent } from '../../hooks/use-component';
import { cssBlockToStyle, styleToCssBlock } from '../../utils/styles';

interface TextPropsFormValues extends Omit<
  NonNullable<TextComponent['props']>,
  'children' | 'style'
> {
  textValue: string;
  css: string;
}

interface TextPropsFormProps {
  onChange: (form: NonNullable<TextComponent['props']>) => void;
}

export const TextPropsForm = ({ onChange }: TextPropsFormProps) => {
  const component = useComponent<TextComponent>();
  const { control } = useForm<TextPropsFormValues>({
    defaultValues: component?.props
      ? {
          ...component.props,
          textValue: component.children,
          css: `#${component?.id ?? 'text'} {
            ${styleToCssBlock(component.props.style)}
          }`,
        }
      : {
          textValue: '',
          numberOfLines: 1,
          css: `#${component?.id ?? 'text'} {
            text-align: center;
          }`,
        },
  });
  const values = useWatch({ control });

  useEffect(() => {
    const { css, ...rest } = values;
    onChange({
      ...rest,
      style: cssBlockToStyle(css ?? ''),
    } as NonNullable<TextComponent['props']>);
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
      <Controller
        name="css"
        control={control}
        render={({ field }) => (
          <span className="bg-white">
            <StyleEditor.default {...field} />
          </span>
        )}
      />
    </form>
  );
};
