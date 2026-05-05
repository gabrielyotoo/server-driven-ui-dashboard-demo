import { DragDropProvider, useDroppable } from '@dnd-kit/react';
import { useScreen } from '../hooks/use-screen';
import type { Component } from '../types';
import { ComponentRenderer } from './component-renderer';
import { isSortable } from '@dnd-kit/react/sortable';
import { useRef } from 'react';

interface ScreenRendererProps {
  onComponentClick: (component: Component) => void;
}

const layout = 'compact';

export const ScreenRenderer = ({ onComponentClick }: ScreenRendererProps) => {
  const [screen, dispatch] = useScreen();
  const { ref } = useDroppable({
    id: 'screen',
  });
  const overDroppable = useRef<Element | null>(null);

  if (!screen) {
    return null;
  }

  return (
    <DragDropProvider
      onDragEnd={(event) => {
        if (event.canceled) {
          return;
        }

        const { source } = event.operation;

        if (isSortable(source)) {
          const { initialIndex, index, id } = source;

          if (initialIndex !== index) {
            dispatch({
              type: 'UPDATE_COMPONENT_ORDER',
              payload: {
                componentId: id.toString(),
                order: index + 1,
              },
            });
          }
        }
      }}
    >
      <div
        className="w-compact-w h-compact-h bg-white flex flex-col"
        ref={ref}
        id="screen"
      >
        {screen[layout]
          .sort((a, b) => a.order - b.order)
          .map((component, index) => (
            <ComponentRenderer
              key={component.id}
              index={index}
              component={component}
              onClick={onComponentClick}
            />
          ))}
      </div>
    </DragDropProvider>
  );
};
