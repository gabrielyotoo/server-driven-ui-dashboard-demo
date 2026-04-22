import { useState } from 'react';
import { ComponentContext } from '../context/component';
import { useScreen } from '../hooks/use-screen';
import type { Component } from '../types';
import { ComponentSelector } from './component-selector';
import { ScreenRenderer } from './screen-renderer';
import { ComponentProps } from './component-props';
import { generateId } from '../utils/id';

export const ScreenEditor = () => {
  const screen = useScreen();
  const [component, setComponent] = useState<null | Component>(null);

  if (screen === null) {
    return (
      <div>
        <p>Selecione uma tela para editar</p>
      </div>
    );
  }

  const handleAddComponent = (componentType: Component['type']) => {
    const newComponent = { type: componentType, id: generateId() };
    setComponent(newComponent);
    screen.components.push(newComponent);
  };

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
      <ComponentContext.Provider value={component}>
        <span className="flex justify-center mt-5 gap-x-10">
          <ScreenRenderer />
          <aside className="flex flex-col items-start">
            <ComponentSelector onAdd={handleAddComponent} />
            <ComponentProps />
          </aside>
        </span>
      </ComponentContext.Provider>
    </main>
  );
};
