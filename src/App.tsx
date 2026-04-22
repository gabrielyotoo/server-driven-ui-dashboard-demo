import { useReducer, useState } from 'react';
import { ScreenManager } from './components/screen-manager';
import {
  ScreenContext,
  ScreenDispatchContext,
  screenReducer,
} from './context/screen';
import { ScreenEditor } from './components/screen-editor';
import { usePublishCode } from './hooks/use-publish-code';

function App() {
  const [screen, dispatch] = useReducer(screenReducer, null);
  const publishCode = usePublishCode();

  const [code, setCode] = useState('');

  const handlePublish = () => {
    setCode(publishCode(screen));
  };

  return (
    <ScreenContext.Provider value={screen}>
      <ScreenDispatchContext.Provider value={dispatch}>
        <div className="flex flex-col">
          <ScreenManager
            onChangeScreen={(newScreen) =>
              dispatch({ type: 'SET_SCREEN', payload: newScreen })
            }
          />
          <ScreenEditor />
          <span className="flex flex-col gap-y-6 w-[80%] items-center my-10 self-center items-stretch">
            {screen ? (
              <button
                className="bg-orange-600 text-white py-8 text-center rounded-lg cursor-pointer"
                onClick={handlePublish}
              >
                Publicar alterações
              </button>
            ) : null}
            {code ? <code className="px-4 text-start">{code}</code> : null}
          </span>
        </div>
      </ScreenDispatchContext.Provider>
    </ScreenContext.Provider>
  );
}

export default App;
