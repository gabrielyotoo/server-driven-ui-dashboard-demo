import { useScreen } from '../hooks/use-screen';
import { ComponentRenderer } from './component-renderer';

export const ScreenRenderer = () => {
  const screen = useScreen();

  if (!screen) {
    return null;
  }

  return (
    <div className="w-compact-w h-compact-h bg-white">
      {screen.components.map((component) => (
        <ComponentRenderer key={component.id} component={component} />
      ))}
    </div>
  );
};
