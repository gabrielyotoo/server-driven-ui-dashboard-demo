import { useScreen } from '../hooks/use-screen';
import { ComponentSelector } from './component-selector';
import { ScreenRenderer } from './screen-renderer';

export const ScreenEditor = () => {
  const screen = useScreen();

  if (screen === null) {
    return (
      <div>
        <p>Selecione uma tela para editar</p>
      </div>
    );
  }

  return (
    <main>
      <h1>{screen.name}</h1>
      <form className="flex flex-row gap-x-2 justify-center">
        <input
          type="radio"
          name="layout"
          id="compact"
          value="compact"
          defaultChecked
        />
        <label htmlFor="compact">Compact</label>
        <input type="radio" name="layout" id="wide" disabled />
        <label htmlFor="wide">Wide</label>
      </form>
      <span className="flex flex-1 justify-center mt-5 gap-x-10">
        <ComponentSelector onAdd={console.log} />
        <ScreenRenderer />
      </span>
    </main>
  );
};
