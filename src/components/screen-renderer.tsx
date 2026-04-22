import { useScreen } from '../hooks/use-screen';
import type { Component } from '../types';
import { ComponentRenderer } from './component-renderer';

interface ScreenRendererProps {
  onComponentClick: (component: Component) => void;
}

export const ScreenRenderer = ({ onComponentClick }: ScreenRendererProps) => {
  const [screen] = useScreen();

  if (!screen) {
    return null;
  }

  return (
    <div className="w-compact-w h-compact-h bg-white">
      {screen.components
        .sort((a, b) => a.order - b.order)
        .map((component) => (
          <ComponentRenderer
            key={component.id}
            component={component}
            onClick={onComponentClick}
          />
        ))}
    </div>
  );
};
