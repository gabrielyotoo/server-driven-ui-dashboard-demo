import { useDroppable } from '@dnd-kit/react';
import { useScreen } from '../hooks/use-screen';
import type { Component } from '../types';
import { ComponentRenderer } from './component-renderer';

interface ScreenRendererProps {
  onComponentClick: (component: Component) => void;
}

export const ScreenRenderer = ({ onComponentClick }: ScreenRendererProps) => {
  const [screen] = useScreen();
  const { ref } = useDroppable({
    id: 'root',
  });

  if (!screen) {
    return null;
  }

  return (
    <div className="w-compact-w h-compact-h bg-white flex flex-col" ref={ref}>
      {screen.components
        .sort((a, b) => a.order - b.order)
        .map((component, index) => (
          <ComponentRenderer
            key={component.id}
            index={index}
            component={component}
            onClick={onComponentClick}
          />
        ))}
    </div>
  );
};
