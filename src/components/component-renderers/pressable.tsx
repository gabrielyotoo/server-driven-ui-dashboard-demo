import { useMemo } from 'react';
import { useComponent } from '../../hooks/use-component';
import type { ComponentProps, PressableComponent } from '../../types';
import { ComponentRenderer } from '../component-renderer';
import { twJoin } from 'tailwind-merge';
import { useDroppable } from '@dnd-kit/react';

export const Pressable = ({
  component,
  onClick,
  ref,
}: ComponentProps<PressableComponent>) => {
  const { id, props, children } = component;
  const selectedComponent = useComponent();
  const { ref: droppableRef } = useDroppable({
    id,
  });

  const cClasses = useMemo(
    () =>
      twJoin(
        'cursor-pointer',
        selectedComponent?.id === id ? 'bg-orange-600/10' : '',
      ),
    [selectedComponent?.id, id],
  );

  return (
    <div
      ref={(el) => {
        ref?.(el);
        droppableRef(el);
      }}
      id={id}
      style={props?.style}
      className={cClasses}
      onClick={onClick}
    >
      {children.map((child, index) => (
        <ComponentRenderer
          key={child.id}
          index={index}
          component={child}
          onClick={() => {}}
        />
      ))}
    </div>
  );
};
