import { useContext } from 'react';
import { ScreenContext } from '../context/screen';

export const useScreen = () => useContext(ScreenContext);
