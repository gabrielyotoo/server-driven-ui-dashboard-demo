import { createContext } from 'react';
import type { Screen } from '../types';

export const ScreenContext = createContext<Screen | null>(null);
