import { createContext } from 'react';
import type { Action, Component, Reducer, Screen } from '../types';

type SetScreenAction = Action<'SET_SCREEN', Screen | null>;
type SetComponentsAction = Action<'SET_COMPONENTS', Component[]>;
type UpdateComponentsAction = Action<
  'UPDATE_COMPONENTS',
  { componentId: string; component: Partial<Component> }
>;
type AddComponentAction = Action<'ADD_COMPONENT', Omit<Component, 'order'>>;

type ScreenActions =
  | SetScreenAction
  | SetComponentsAction
  | UpdateComponentsAction
  | AddComponentAction;

export const ScreenContext = createContext<Screen | null>(null);
export const ScreenDispatchContext = createContext<
  React.Dispatch<ScreenActions>
>(() => {});

export const screenReducer: Reducer<Screen | null, ScreenActions> = (
  state,
  { type, payload },
) => {
  switch (type) {
    case 'SET_SCREEN': {
      return payload;
    }
    case 'SET_COMPONENTS': {
      if (!state) {
        return state;
      }

      return {
        ...state,
        components: payload,
      };
    }
    case 'UPDATE_COMPONENTS': {
      if (!state) {
        return state;
      }

      const updatingComponent = state.components.find(
        ({ id }) => id === payload.componentId,
      );
      if (!updatingComponent) {
        return state;
      }

      const newComponents = [
        ...state.components.filter(({ id }) => id !== payload.componentId),
        { ...updatingComponent, ...payload.component } as Component,
      ];

      return {
        ...state,
        components: newComponents,
      };
    }
    case 'ADD_COMPONENT': {
      if (!state) {
        return state;
      }

      const order =
        state.components.reduce((max, item) => {
          return item.order > max ? item.order : max;
        }, 0) + 1;

      return {
        ...state,
        components: [...state.components, { ...payload, order } as Component],
      };
    }
    default:
      return state;
  }
};
