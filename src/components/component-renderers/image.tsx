import { useMemo } from 'react';
import { useComponent } from '../../hooks/use-component';
import type { ComponentProps, ImageComponent } from '../../types';
import { cssBlockToStyle, resizeModeToObjectFit } from '../../utils/styles';
import { twJoin } from 'tailwind-merge';

export const Image = ({
  component,
  onClick,
}: ComponentProps<ImageComponent>) => {
  const { id, props } = component;
  const selectedComponent = useComponent();

  const cClasses = useMemo(
    () =>
      twJoin(
        'cursor-pointer',
        selectedComponent.id === id ? 'bg-orange-600/10' : '',
      ),
    [selectedComponent.id, id],
  );

  return (
    <img
      onClick={() => onClick?.(component)}
      src={props?.source.uri}
      alt={props?.alt}
      className={cClasses}
      style={{
        ...cssBlockToStyle(props?.style ?? ''),
        ...(props?.resizeMode
          ? { ...resizeModeToObjectFit(props?.resizeMode) }
          : {}),
      }}
    />
  );
};
