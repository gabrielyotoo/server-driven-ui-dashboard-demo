import type { Screen } from '../types';
import { useScreen } from '../hooks/use-screen';
import { useCreateScreen } from '../hooks/use-create-screen';
import { generateId } from '../utils/id';
import { useScreens } from '../hooks/use-screens';

interface ScreenManagerProps {
  onChangeScreen: (newScreen: Screen | null) => void;
}

export const ScreenManager = ({ onChangeScreen }: ScreenManagerProps) => {
  const [currentScreen] = useScreen();
  const [screens, dispatch] = useScreens();
  const { mutateAsync } = useCreateScreen();

  const handleCreateScreen = async () => {
    const baseName = 'Nova tela';
    const existingNames = new Set(screens.map((screen) => screen.name));
    let newName = baseName;
    let counter = 1;
    while (existingNames.has(newName)) {
      newName = `${baseName} (${counter})`;
      counter++;
    }
    const newScreen: Screen = {
      id: generateId(),
      name: newName,
      compact: [],
      wide: [],
    };
    dispatch({
      type: 'ADD_SCREEN',
      payload: newScreen,
    });
    onChangeScreen(newScreen);
    await mutateAsync(newScreen);
  };

  const handleDeleteScreen = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    { id }: Screen,
  ) => {
    e.stopPropagation();
    dispatch({
      type: 'REMOVE_SCREEN',
      payload: id,
    });
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
            key={screen.id}
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
            {screen.id === currentScreen?.id ? (
              <div className="h-1 bg-cyan-700" />
            ) : null}
          </div>
        ))}
      </header>
    </div>
  );
};
