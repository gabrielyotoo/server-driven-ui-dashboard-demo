import { DragDropProvider, useDroppable } from '@dnd-kit/react';
import { useScreen } from '../hooks/use-screen';
import type { Component } from '../types';
import { ComponentRenderer } from './component-renderer';
import { isSortable } from '@dnd-kit/react/sortable';
import { useRef } from 'react';

interface ScreenRendererProps {
  onComponentClick: (component: Component) => void;
}

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
        if (overDroppable.current && source) {
          dispatch({
            type: 'ADD_CHILDREN_TO_COMPONENT',
            payload: {
              componentId: overDroppable.current.id,
              children: {
                id: source.id.toString(),
                order: 1,
                type: 'Text',
                children: '',
              },
            },
          });
        }

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
      onDragOver={(event) => {
        const { target, source } = event.operation;
        if (target?.element?.tagName === 'DIV')
          overDroppable.current = target?.element ?? null;
        if (
          source?.element?.tagName === 'DIV' &&
          target?.element?.tagName === 'DIV'
        )
          event.preventDefault();
      }}
      // onDragMove={(event) => {
      //   if (overDroppable.current?.id !== 'screen') {
      //     event.preventDefault();
      //   }
      // }}
    >
      <div
        className="w-compact-w h-compact-h bg-white flex flex-col"
        ref={ref}
        id="screen"
      >
        {screen.components
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
