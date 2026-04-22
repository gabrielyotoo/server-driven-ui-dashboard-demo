import { createContext } from 'react';
import type { Component } from '../types';

export const ComponentContext = createContext<Component | null>(null);
