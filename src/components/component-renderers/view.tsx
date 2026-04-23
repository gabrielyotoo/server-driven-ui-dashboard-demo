import { useMemo } from 'react';
import { useComponent } from '../../hooks/use-component';
import type { ComponentProps, ViewComponent } from '../../types';
import { cssBlockToStyle } from '../../utils/styles';
import { ComponentRenderer } from '../component-renderer';
import { twJoin } from 'tailwind-merge';

export const View = ({ component, onClick }: ComponentProps<ViewComponent>) => {
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
    <div
      id={id}
      style={cssBlockToStyle(props?.style ?? '')}
      className={cClasses}
      onClick={onClick}
    >
      {props?.children.map((child) => (
        <ComponentRenderer component={child} onClick={() => {}} />
      ))}
    </div>
  );
};
