import { cloneElement, useMemo } from 'react';
import type { Component } from '../types';
import { Text } from './component-renderers/text';
import { View } from './component-renderers/view';

interface ComponentRendererProps {
  component: Component;
  onClick: (component: Component) => void;
}

export const ComponentRenderer = ({
  component,
  onClick,
}: ComponentRendererProps) => {
  const componentRender = useMemo(() => {
    if (component.type === 'Text') {
      return <Text component={component} />;
    }

    if (component.type === 'View') {
      return <View component={component} />;
    }

    return <></>;
  }, [component]);

  return cloneElement(componentRender, { onClick: () => onClick(component) });
};
