import { Controller, useForm, useWatch } from 'react-hook-form';
import { useEffect } from 'react';
// TODO: tipar essa lib
// @ts-expect-error Library does not have types
import StyleEditor from 'react-style-editor';
import {
  PressableActionType,
  type PressableComponent,
  type Rect,
} from '../../types';
import { useComponent } from '../../hooks/use-component';
import { FormCheckbox } from '../form-checkbox';
import { cssBlockToStyle, styleToCssBlock } from '../../utils/styles';
import { FormField } from '../form-field';
import { FormSelector } from '../form-selector';
import { useScreens } from '../../hooks/use-screens';

type PressablePropsFormValues = Omit<
  NonNullable<PressableComponent['props']>,
  'children' | 'style'
> & { css: string; actionType: PressableActionType; to: string };

interface PressablePropsFormProps {
  onChange: (form: NonNullable<PressableComponent['props']>) => void;
  onChangeValues: (values: PressableComponent['action']) => void;
}

const isRect = (value: number | Rect): value is Rect =>
  typeof value !== 'number';

export const PressablePropsForm = ({
  onChange,
  onChangeValues,
}: PressablePropsFormProps) => {
  const [screens] = useScreens();
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
          actionType: component.action.type,
          to:
            component.action.type === PressableActionType.NavigateTo
              ? component.action.to
              : '',
        }
      : {
          css: `#${component?.id ?? 'pressable'} {
            display: flex;
            flex: 1;
          }`,
          delayLongPress: 500,
          disabled: false,
          pressRetentionOffset: { bottom: 30, left: 20, right: 20, top: 20 },
          actionType: PressableActionType.NavigateTo,
          to: '',
        },
  });
  const values = useWatch({ control });

  useEffect(() => {
    const { css, actionType, to, ...rest } = values;
    onChange({
      ...rest,
      style: cssBlockToStyle(css ?? ''),
    } as NonNullable<PressableComponent['props']>);
    if (actionType === PressableActionType.NavigateTo) {
      onChangeValues({
        type: actionType,
        to: to ?? '',
      });
    }
    if (actionType === PressableActionType.NavigateBack) {
      onChangeValues({
        type: actionType,
      });
    }
    if (actionType === PressableActionType.PostRequest) {
      onChangeValues({
        type: actionType,
        api: 'pagol',
        body: {},
        endpoint: 'register',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  return (
    <form className="flex flex-col gap-y-2">
      <Controller
        name="actionType"
        control={control}
        render={({ field }) => (
          <FormSelector
            label="Ação"
            options={[
              { text: 'Navegar para', value: PressableActionType.NavigateTo },
              { text: 'Voltar', value: PressableActionType.NavigateBack },
              {
                text: 'Fazer requisição',
                value: PressableActionType.PostRequest,
              },
            ]}
            {...field}
          />
        )}
      />
      {values.actionType === PressableActionType.NavigateTo ? (
        <Controller
          name="to"
          control={control}
          render={({ field }) => (
            <FormSelector
              label="Navegar para"
              options={screens.map(({ name }) => name)}
              {...field}
            />
          )}
        />
      ) : null}
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
