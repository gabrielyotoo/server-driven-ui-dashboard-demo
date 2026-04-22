import { useContext } from 'react';
import { ComponentContext } from '../context/component';
import type { Component } from '../types';

export const useComponent = <T extends Component>() =>
  useContext(ComponentContext) as T;
