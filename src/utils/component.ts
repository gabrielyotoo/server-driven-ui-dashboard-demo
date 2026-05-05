import type { Component, GradientComponent, ImageComponent } from '../types';
import { generateId } from './id';

export const createNewComponent = (
  type: Component['sectionComponentType'],
): Omit<Component, 'order'> => {
  if (type === 'Text') {
    return {
      sectionComponentType: type,
      id: generateId(),
      children: '',
    };
  }
  if (type === 'Pressable' || type === 'View') {
    return {
      sectionComponentType: type,
      id: generateId(),
      children: [],
    };
  }

  return {
    sectionComponentType: type,
    id: generateId(),
  } as Omit<GradientComponent, 'order'> | Omit<ImageComponent, 'order'>;
};
