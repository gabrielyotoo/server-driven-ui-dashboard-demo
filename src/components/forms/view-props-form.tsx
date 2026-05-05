import { Controller, useForm, useWatch } from 'react-hook-form';
import { useEffect } from 'react';
// TODO: tipar essa lib
// @ts-expect-error Library does not have types
import StyleEditor from 'react-style-editor';
import type { ViewComponent } from '../../types';
import { useComponent } from '../../hooks/use-component';
import { FormCheckbox } from '../form-checkbox';
import { cssBlockToStyle, styleToCssBlock } from '../../utils/styles';

type ViewPropsFormValues = Omit<
  NonNullable<ViewComponent['props']>,
  'children' | 'style'
> & { css: string };

interface ViewPropsFormProps {
  onChange: (form: NonNullable<ViewComponent['props']>) => void;
}

export const ViewPropsForm = ({ onChange }: ViewPropsFormProps) => {
  const component = useComponent<ViewComponent>();
  const { control } = useForm<ViewPropsFormValues>({
    defaultValues: component?.props
      ? {
          ...component.props,
          css: `#${component?.id ?? 'view'} {
            ${styleToCssBlock(component.props.style)}
          }`,
        }
      : {
          scrollable: true,
          css: `#${component?.id ?? 'view'} {
            display: flex;
            flex: 1;
          }`,
          horizontal: false,
        },
  });
  const values = useWatch({ control });

  useEffect(() => {
    const { css, ...rest } = values;
    onChange({
      ...rest,
      style: cssBlockToStyle(css ?? ''),
    } as NonNullable<ViewComponent['props']>);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  return (
    <form className="flex flex-col gap-y-2">
      <Controller
        name="scrollable"
        control={control}
        render={({ field }) => <FormCheckbox label="Rolavel" {...field} />}
      />
      {values.scrollable ? (
        <Controller
          name="horizontal"
          control={control}
          render={({ field }) => <FormCheckbox label="Horizontal" {...field} />}
        />
      ) : null}
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
