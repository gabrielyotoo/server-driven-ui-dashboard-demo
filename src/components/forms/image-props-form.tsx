import { Controller, useForm, useWatch } from 'react-hook-form';
import { useCallback, useEffect, useRef } from 'react';
// TODO: tipar essa lib
// @ts-expect-error Library does not have types
import StyleEditor from 'react-style-editor';
import type { ImageComponent } from '../../types';
import { useComponent } from '../../hooks/use-component';
import { FormField } from '../form-field';
import { FormSelector } from '../form-selector';
import { cssBlockToStyle, styleToCssBlock } from '../../utils/styles';

type ImagePropsFormValues = Omit<
  NonNullable<ImageComponent['props']>,
  'style'
> & { css: string };

interface ImagePropsFormProps {
  onChange: (form: NonNullable<ImageComponent['props']>) => void;
}

export const ImagePropsForm = ({ onChange }: ImagePropsFormProps) => {
  const component = useComponent<ImageComponent>();
  const originalSrc = useRef('');
  const { control, setValue } = useForm<ImagePropsFormValues>({
    defaultValues: component?.props
      ? {
          ...component.props,
          css: `#${component?.id ?? 'image'} {
            ${styleToCssBlock(component.props.style)}
          }`,
        }
      : {
          alt: '',
          resizeMode: 'contain',
          source: {
            uri: 'https://s3-alpha.figma.com/hub/file/4093188630/resized/800x480/561dfe3e-e5f8-415c-9b26-fbdf94897722-cover.png',
          },
          css: `#${component?.id ?? 'image'} {
            display: flex;
            flex: 1;
          }`,
        },
  });
  const values = useWatch({ control });

  useEffect(() => {
    const { css, ...rest } = values;

    onChange({
      ...rest,
      style: cssBlockToStyle(css ?? ''),
    } as NonNullable<ImageComponent['props']>);
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
