import { useEffect, useReducer } from 'react';
import { ScreenManager } from './components/screen-manager';
import {
  ScreenContext,
  ScreenDispatchContext,
  screenReducer,
} from './context/screen';
import { ScreenEditor } from './components/screen-editor';
import { usePublishCode } from './hooks/use-publish-code';
import {
  ScreensContext,
  ScreensDispatchContext,
  screensReducer,
} from './context/screens';
import { useServerScreens } from './hooks/use-server-screens';

function App() {
  const { data } = useServerScreens();
  const [screen, dispatch] = useReducer(screenReducer, null);
  const [screens, dispatchScreens] = useReducer(screensReducer, []);
  const { mutateAsync } = usePublishCode();

  useEffect(() => {
    if (data) {
      dispatchScreens({
        type: 'SET_SCREENS',
        payload: data,
      });
    }
  }, [data]);

  const handlePublish = () => {
    mutateAsync(screen);
  };

  return (
    <ScreensContext.Provider value={screens}>
      <ScreensDispatchContext.Provider value={dispatchScreens}>
        <ScreenContext.Provider value={screen}>
          <ScreenDispatchContext.Provider value={dispatch}>
            <div className="flex flex-col">
              <ScreenManager
                onChangeScreen={(newScreen) =>
                  dispatch({ type: 'SET_SCREEN', payload: newScreen })
                }
              />
              <ScreenEditor />
              <span className="flex flex-col gap-y-6 w-[80%] my-10 self-center items-stretch">
                {screen ? (
                  <button
                    className="bg-orange-600 text-white py-8 text-center rounded-lg cursor-pointer"
                    onClick={handlePublish}
                  >
                    Publicar alterações
                  </button>
                ) : null}
              </span>
            </div>
          </ScreenDispatchContext.Provider>
        </ScreenContext.Provider>
      </ScreensDispatchContext.Provider>
    </ScreensContext.Provider>
  );
}

export default App;
