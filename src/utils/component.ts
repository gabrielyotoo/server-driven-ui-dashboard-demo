import {
  PressableActionType,
  type Component,
  type GradientComponent,
  type ImageComponent,
  type PressableComponent,
} from '../types';
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
  if (type === 'View') {
    return {
      sectionComponentType: type,
      id: generateId(),
      children: [],
    };
  }
  if (type === 'Pressable') {
    return {
      sectionComponentType: type,
      id: generateId(),
      children: [],
      action: { type: PressableActionType.NavigateTo, to: '' },
    } as Omit<PressableComponent, 'order'>;
  }

  return {
    sectionComponentType: type,
    id: generateId(),
  } as Omit<GradientComponent, 'order'> | Omit<ImageComponent, 'order'>;
};
