import { useState } from 'react';
import { ComponentContext } from '../context/component';
import { useScreen } from '../hooks/use-screen';
import type { Component } from '../types';
import { ComponentSelector } from './component-selector';
import { ScreenRenderer } from './screen-renderer';
import { ComponentProps } from './component-props';
import { createNewComponent } from '../utils/component';
import { useScreens } from '../hooks/use-screens';
import { useRenameScreen } from '../hooks/use-rename-screen';

export const ScreenEditor = () => {
  const [screen, dispatch] = useScreen();
  const [, dispatchScreens] = useScreens();
  const { mutateAsync } = useRenameScreen();
  const [component, setComponent] = useState<null | Omit<Component, 'order'>>(
    null,
  );

  if (screen === null) {
    return (
      <div>
        <p>Selecione uma tela para editar</p>
      </div>
    );
  }

  const handleAddComponent = (componentType: Component['type']) => {
    const newComponent = createNewComponent(componentType);
    setComponent(newComponent);
    dispatch({
      type: 'ADD_COMPONENT',
      payload: newComponent,
    });
  };

  const handlePropsChange = (props: Component['props']) => {
    setComponent((prev) => (prev ? ({ ...prev, props } as Component) : null));
    const currentComponent = screen.components.find(
      ({ id }) => id === component?.id,
    );
    if (currentComponent) {
      dispatch({
        type: 'UPDATE_COMPONENTS',
        payload: {
          componentId: currentComponent.id,
          component: {
            props,
          } as Component,
        },
      });
    }
  };

  const handleRename = async () => {
    const newName = prompt('novo nome');
    dispatchScreens({
      type: 'UPDATE_SCREENS',
      payload: {
        id: screen.id,
        screen: {
          name: newName ?? screen.name,
        },
      },
    });
    dispatch({
      type: 'SET_SCREEN',
      payload: { ...screen, name: newName ?? screen.name },
    });
    await mutateAsync({ id: screen.id, name: newName ?? screen.name });
  };

  return (
    <main>
      <header className="flex gap-x-4 w-full justify-center items-center">
        <h1>{screen.name}</h1>
        <button
          className="bg-orange-600 cursor-pointer text-white px-4 py-1"
          onClick={handleRename}
        >
          Renomear
        </button>
      </header>
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
          <ScreenRenderer onComponentClick={setComponent} />
          <aside className="flex flex-col items-start gap-y-6">
            <ComponentSelector onAdd={handleAddComponent} />
            <ComponentProps onChange={handlePropsChange} />
          </aside>
        </span>
      </ComponentContext.Provider>
    </main>
  );
};
