import { useScreen } from '../hooks/use-screen';

export const ScreenRenderer = () => {
  const screen = useScreen();

  if (!screen) {
    return null;
  }

  return <div className="w-compact-w h-compact-h bg-white"></div>;
};
