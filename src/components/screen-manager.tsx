import { useState } from 'react';
import type { Screen } from '../types';

interface ScreenManagerProps {
  onChangeScreen: (newScreen: Screen | null) => void;
  screen: Screen | null;
}

export const ScreenManager = (props: ScreenManagerProps) => {
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
    props.onChangeScreen(newScreen);
  };

  const handleDeleteScreen = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    { name }: Screen,
  ) => {
    e.stopPropagation();
    setScreens((prev) => prev.filter((s) => s.name !== name));
    props.onChangeScreen(null);
  };

  return (
    <div>
      <button onClick={handleCreateScreen}>CRIAR NOVA TELA</button>
      <header className="flex flex-row gap-4 overflow-auto p-3">
        {screens.map((screen) => (
          <div
            className="whitespace-nowrap cursor-pointer"
            onClick={() => props.onChangeScreen(screen)}
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
            {screen.name === props.screen?.name ? (
              <div className="h-1 bg-cyan-700" />
            ) : null}
          </div>
        ))}
      </header>
    </div>
  );
};
