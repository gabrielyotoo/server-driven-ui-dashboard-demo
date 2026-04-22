import type { Component } from '../types';

interface ComponentRendererProps {
  component: Component;
}

export const ComponentRenderer = ({ component }: ComponentRendererProps) => {
  return <div>{component.type}</div>;
};
