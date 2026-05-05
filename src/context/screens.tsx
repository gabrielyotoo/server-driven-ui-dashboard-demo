import { createContext } from 'react';
import type { Action, Reducer, Screen } from '../types';

type UpdateScreensAction = Action<
  'UPDATE_SCREENS',
  { id: string; screen: Partial<Screen> }
>;
type AddScreenAction = Action<'ADD_SCREEN', Screen>;
type RemoveScreenAction = Action<'REMOVE_SCREEN', string>;
type SetScreensAction = Action<'SET_SCREENS', Screen[]>;

type ScreensActions =
  | UpdateScreensAction
  | AddScreenAction
  | RemoveScreenAction
  | SetScreensAction;

export const ScreensContext = createContext<Screen[]>([]);
export const ScreensDispatchContext = createContext<
  React.Dispatch<ScreensActions>
>(() => {});

export const screensReducer: Reducer<Screen[], ScreensActions> = (
  state,
  { type, payload },
) => {
  switch (type) {
    case 'UPDATE_SCREENS': {
      return state.map((screen) =>
        screen.id === payload.id ? { ...screen, ...payload.screen } : screen,
      );
    }
    case 'ADD_SCREEN': {
      return [...state, payload];
    }
    case 'REMOVE_SCREEN': {
      return state.filter(({ id }) => id !== payload);
    }
    case 'SET_SCREENS': {
      return payload;
    }
    default:
      return state;
  }
};
