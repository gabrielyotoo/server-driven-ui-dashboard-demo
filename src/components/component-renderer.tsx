import { useMemo } from 'react';
import type { Component } from '../types';
import { Text } from './component-renderers/text';

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
      return <Text props={component.props} />;
    }

    return null;
  }, [component]);

  return (
    <div className="cursor-pointer" onClick={() => onClick(component)}>
      {componentRender}
    </div>
  );
};
