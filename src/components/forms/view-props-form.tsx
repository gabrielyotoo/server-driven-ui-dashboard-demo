import { Controller, useForm, useWatch } from 'react-hook-form';
import { useEffect } from 'react';
// TODO: tipar essa lib
// @ts-expect-error Library does not have types
import StyleEditor from 'react-style-editor';
import type { ViewComponent } from '../../types';
import { useComponent } from '../../hooks/use-component';
import { FormCheckbox } from '../form-checkbox';

type ViewPropsFormValues = Omit<
  NonNullable<ViewComponent['props']>,
  'children'
>;

interface ViewPropsFormProps {
  onChange: (form: ViewPropsFormValues) => void;
}

export const ViewPropsForm = ({ onChange }: ViewPropsFormProps) => {
  const component = useComponent<ViewComponent>();
  const { control } = useForm<ViewPropsFormValues>({
    defaultValues: component?.props
      ? component.props
      : {
          scrollable: true,
          style: `#${component.id} {
            display: flex;
            flex: 1;
          }`,
          horizontal: false,
        },
  });
  const values = useWatch({ control });

  useEffect(() => {
    onChange(values as ViewPropsFormValues);
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
        name="style"
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
