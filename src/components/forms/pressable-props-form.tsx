import { Controller, useForm, useWatch } from 'react-hook-form';
import { useEffect } from 'react';
// TODO: tipar essa lib
// @ts-expect-error Library does not have types
import StyleEditor from 'react-style-editor';
import type { PressableComponent, Rect } from '../../types';
import { useComponent } from '../../hooks/use-component';
import { FormCheckbox } from '../form-checkbox';
import { cssBlockToStyle, styleToCssBlock } from '../../utils/styles';
import { FormField } from '../form-field';

type PressablePropsFormValues = Omit<
  NonNullable<PressableComponent['props']>,
  'children' | 'style'
> & { css: string };

interface PressablePropsFormProps {
  onChange: (form: NonNullable<PressableComponent['props']>) => void;
}

const isRect = (value: number | Rect): value is Rect =>
  typeof value !== 'number';

export const PressablePropsForm = ({ onChange }: PressablePropsFormProps) => {
  const component = useComponent<PressableComponent>();
  const { control } = useForm<PressablePropsFormValues>({
    defaultValues: component?.props
      ? {
          ...component.props,
          pressRetentionOffset: isRect(component.props.pressRetentionOffset)
            ? component.props.pressRetentionOffset
            : {
                bottom: component.props.pressRetentionOffset,
                left: component.props.pressRetentionOffset,
                right: component.props.pressRetentionOffset,
                top: component.props.pressRetentionOffset,
              },
          css: `#${component?.id ?? 'pressable'} {
            ${styleToCssBlock(component.props.style)}
          }`,
        }
      : {
          css: `#${component?.id ?? 'pressable'} {
            display: flex;
            flex: 1;
          }`,
          delayLongPress: 500,
          disabled: false,
          pressRetentionOffset: { bottom: 30, left: 20, right: 20, top: 20 },
        },
  });
  const values = useWatch({ control });

  useEffect(() => {
    const { css, ...rest } = values;
    onChange({
      ...rest,
      style: cssBlockToStyle(css ?? ''),
    } as NonNullable<PressableComponent['props']>);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  return (
    <form className="flex flex-col gap-y-2">
      <Controller
        name="delayLongPress"
        control={control}
        render={({ field }) => (
          <FormField label="Tempo de duração para long press" {...field} />
        )}
      />
      <Controller
        name="pressRetentionOffset.top"
        control={control}
        render={({ field }) => (
          <FormField label="Distancia de toque adicional (cima)" {...field} />
        )}
      />
      <Controller
        name="pressRetentionOffset.right"
        control={control}
        render={({ field }) => (
          <FormField
            label="Distancia de toque adicional (direita)"
            {...field}
          />
        )}
      />
      <Controller
        name="pressRetentionOffset.bottom"
        control={control}
        render={({ field }) => (
          <FormField label="Distancia de toque adicional (baixo)" {...field} />
        )}
      />
      <Controller
        name="pressRetentionOffset.left"
        control={control}
        render={({ field }) => (
          <FormField
            label="Distancia de toque adicional (esquerda)"
            {...field}
          />
        )}
      />
      <Controller
        name="disabled"
        control={control}
        render={({ field }) => <FormCheckbox label="Desabilitado" {...field} />}
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
