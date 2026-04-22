import { useContext } from 'react';
import { ScreenContext, ScreenDispatchContext } from '../context/screen';

export const useScreen = () => {
  const screenContext = useContext(ScreenContext);
  const dispatchContext = useContext(ScreenDispatchContext);

  return [screenContext, dispatchContext] as const;
};
