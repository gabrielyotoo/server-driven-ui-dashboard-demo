import type { Component, GradientComponent, ImageComponent } from '../types';
import { generateId } from './id';

export const createNewComponent = (
  type: Component['type'],
): Omit<Component, 'order'> => {
  if (type === 'Text') {
    return {
      type,
      id: generateId(),
      children: '',
    };
  }
  if (type === 'Pressable' || type === 'View') {
    return {
      type,
      id: generateId(),
      children: [],
    };
  }

  return {
    type,
    id: generateId(),
  } as Omit<GradientComponent, 'order'> | Omit<ImageComponent, 'order'>;
};
