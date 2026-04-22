import { useContext } from 'react';
import { ComponentContext } from '../context/component';

export const useComponent = () => useContext(ComponentContext);
