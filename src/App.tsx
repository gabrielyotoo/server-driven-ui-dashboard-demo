import { useReducer } from 'react';
import { ScreenManager } from './components/screen-manager';
import {
  ScreenContext,
  ScreenDispatchContext,
  screenReducer,
} from './context/screen';
import { ScreenEditor } from './components/screen-editor';

function App() {
  const [screen, dispatch] = useReducer(screenReducer, null);

  return (
    <ScreenContext.Provider value={screen}>
      <ScreenDispatchContext.Provider value={dispatch}>
        <div>
          <ScreenManager
            onChangeScreen={(newScreen) =>
              dispatch({ type: 'SET_SCREEN', payload: newScreen })
            }
          />
          <ScreenEditor />
        </div>
      </ScreenDispatchContext.Provider>
    </ScreenContext.Provider>
  );
}

export default App;
