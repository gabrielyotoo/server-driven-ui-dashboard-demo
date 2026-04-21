import { useState } from 'react';
import { ScreenManager } from './components/screen-manager';
import { ScreenContext } from './context/screen';
import type { Screen } from './types';
import { ScreenEditor } from './components/screen-editor';

function App() {
  const [screen, setScreen] = useState<Screen | null>(null);

  return (
    <ScreenContext.Provider value={screen}>
      <div>
        <ScreenManager onChangeScreen={setScreen} />
        <ScreenEditor />
      </div>
    </ScreenContext.Provider>
  );
}

export default App;
