import { useState } from 'react';
import type { Screen } from '../types';
import { useScreen } from '../hooks/use-screen';

interface ScreenManagerProps {
  onChangeScreen: (newScreen: Screen | null) => void;
}

export const ScreenManager = ({ onChangeScreen }: ScreenManagerProps) => {
  const currentScreen = useScreen();
  const [screens, setScreens] = useState<Screen[]>([]);

  const handleCreateScreen = () => {
    const baseName = 'Nova tela';
    const existingNames = new Set(screens.map((screen) => screen.name));
    let newName = baseName;
    let counter = 1;
    while (existingNames.has(newName)) {
      newName = `${baseName} (${counter})`;
      counter++;
    }
    const newScreen = { name: newName };
    setScreens((prev) => [...prev, newScreen]);
    onChangeScreen(newScreen);
  };

  const handleDeleteScreen = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    { name }: Screen,
  ) => {
    e.stopPropagation();
    setScreens((prev) => prev.filter((s) => s.name !== name));
    onChangeScreen(null);
  };

  return (
    <div>
      <button onClick={handleCreateScreen}>CRIAR NOVA TELA</button>
      <header className="flex flex-row gap-4 overflow-auto p-3">
        {screens.map((screen) => (
          <div
            className="whitespace-nowrap cursor-pointer"
            onClick={() => onChangeScreen(screen)}
            key={screen.name}
          >
            <div className="flex flex-row gap-x-2">
              <p>{screen.name}</p>
              <button
                className="cursor-pointer"
                onClick={(e) => handleDeleteScreen(e, screen)}
              >
                <p>x</p>
              </button>
            </div>
            {screen.name === currentScreen?.name ? (
              <div className="h-1 bg-cyan-700" />
            ) : null}
          </div>
        ))}
      </header>
    </div>
  );
};
