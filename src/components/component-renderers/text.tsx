import { useMemo } from 'react';
import { useComponent } from '../../hooks/use-component';
import type { ComponentProps, TextComponent } from '../../types';
import { cssBlockToStyle } from '../../utils/styles';
import { twJoin } from 'tailwind-merge';

export const Text = ({ component, onClick }: ComponentProps<TextComponent>) => {
  const { props, id } = component;

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
    <p
      id={id}
      className={cClasses}
      style={cssBlockToStyle(props?.style ?? '')}
      onClick={() => onClick?.(component)}
    >
      {!props?.children ? 'Altere o texto ao lado' : props.children}
    </p>
  );
};
