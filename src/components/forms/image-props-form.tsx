import { Controller, useForm, useWatch } from 'react-hook-form';
import { useCallback, useEffect, useRef } from 'react';
// TODO: tipar essa lib
// @ts-expect-error Library does not have types
import StyleEditor from 'react-style-editor';
import type { ImageComponent } from '../../types';
import { useComponent } from '../../hooks/use-component';
import { FormField } from '../form-field';
import { FormSelector } from '../form-selector';

type ImagePropsFormValues = NonNullable<ImageComponent['props']>;

interface ImagePropsFormProps {
  onChange: (form: ImagePropsFormValues) => void;
}

export const ImagePropsForm = ({ onChange }: ImagePropsFormProps) => {
  const component = useComponent<ImageComponent>();
  const originalSrc = useRef('');
  const { control, setValue } = useForm<ImagePropsFormValues>({
    defaultValues: component?.props
      ? component.props
      : {
          alt: '',
          resizeMode: 'contain',
          source: {
            uri: 'https://s3-alpha.figma.com/hub/file/4093188630/resized/800x480/561dfe3e-e5f8-415c-9b26-fbdf94897722-cover.png',
          },
          style: `#${component.id} {
            display: flex;
            flex: 1;
          }`,
        },
  });
  const values = useWatch({ control });

  useEffect(() => {
    onChange(values as ImagePropsFormValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  const tempDisableImage = useCallback(() => {
    originalSrc.current = values.source?.uri ?? '';
    setValue('source.uri', `__${originalSrc.current}`);
  }, [setValue, values.source?.uri]);

  const enableImage = useCallback(() => {
    setValue('source.uri', originalSrc.current);
  }, [setValue]);

  return (
    <form className="flex flex-col gap-y-2">
      <Controller
        name="alt"
        control={control}
        render={({ field }) => (
          <FormField
            label="Texto alternativo"
            helperText="Caso a imagem não possa ser carregada"
            {...field}
            onFocus={tempDisableImage}
            onBlur={enableImage}
          />
        )}
      />
      <Controller
        name="resizeMode"
        control={control}
        render={({ field }) => (
          <FormSelector
            options={['repeat', 'cover', 'contain', 'stretch', 'center']}
            label="Resize mode"
            {...field}
          />
        )}
      />
      <Controller
        name="source.uri"
        control={control}
        render={({ field }) => <FormField label="Imagem" {...field} />}
      />
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
