import { useMemo, type DetailedHTMLProps } from 'react';
import { useComponent } from '../../hooks/use-component';
import type { ComponentProps, TextComponent } from '../../types';
import { cssBlockToStyle } from '../../utils/styles';
import { twJoin } from 'tailwind-merge';

export const Text = ({
  component,
  onClick,
  ref,
  ...props
}: ComponentProps<TextComponent> &
  DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  >) => {
  const { props: cProps, id, children } = component;

  const selectedComponent = useComponent();
  // const { ref } = useDraggable({
  //   id: 'draggable',
  // });

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
      style={cssBlockToStyle(cProps?.style ?? '')}
      onClick={onClick}
      {...props}
      ref={ref}
    >
      {!children ? 'Altere o texto ao lado' : children}
    </p>
  );
};
