import { useState } from 'react';
import './App.css';
import { ScreenManager } from './components/screen-manager';
import { ScreenContext } from './context/screen';
import type { Screen } from './types';

function App() {
  const [screen, setScreen] = useState<Screen | null>(null);

  return (
    <ScreenContext.Provider value={screen}>
      <div>
        <ScreenManager onChangeScreen={setScreen} screen={screen} />
        {/* <ScreenEditor screen={screen} /> */}
      </div>
    </ScreenContext.Provider>
  );
}

export default App;
