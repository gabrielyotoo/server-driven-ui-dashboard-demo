import { useContext } from 'react';
import { ScreensContext, ScreensDispatchContext } from '../context/screens';

export const useScreens = () => {
  const screensContext = useContext(ScreensContext);
  const dispatchContext = useContext(ScreensDispatchContext);

  return [screensContext, dispatchContext] as const;
};
