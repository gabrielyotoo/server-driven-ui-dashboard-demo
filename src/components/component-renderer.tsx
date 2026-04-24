import { cloneElement, useMemo } from 'react';
import type { Component } from '../types';
import { Text } from './component-renderers/text';
import { View } from './component-renderers/view';
import { Image } from './component-renderers/image';
import { useSortable } from '@dnd-kit/react/sortable';

interface ComponentRendererProps {
  component: Component;
  onClick: (component: Component) => void;
  index: number;
}

export const ComponentRenderer = ({
  component,
  onClick,
  index,
}: ComponentRendererProps) => {
  const { ref } = useSortable({ id: component.id, index });

  const componentRender = useMemo(() => {
    if (component.type === 'Text') {
      return <Text component={component} />;
    }

    if (component.type === 'View') {
      return <View component={component} />;
    }

    if (component.type === 'Image') {
      return <Image component={component} />;
    }

    return <></>;
  }, [component]);

  return cloneElement(componentRender, {
    onClick: () => onClick(component),
    ref,
  });
};
