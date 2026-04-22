import type { Component } from '../types';

interface ComponentSelectorProps {
  onAdd: (componentType: Component['type']) => void;
}

export const ComponentSelector = ({ onAdd }: ComponentSelectorProps) => (
  <div className="flex flex-col items-start">
    <h2>Selecione o componente</h2>
    <div className="flex flex-wrap gap-3 items-center">
      <button
        className="bg-orange-600 rounded-sm text-white px-4 py-2 cursor-pointer"
        onClick={() => onAdd('View')}
      >
        View
      </button>
      <button
        className="bg-orange-600 rounded-sm text-white px-4 py-2 cursor-pointer"
        onClick={() => onAdd('Pressable')}
      >
        Pressable
      </button>
      <button
        className="bg-orange-600 rounded-sm text-white px-4 py-2 cursor-pointer"
        onClick={() => onAdd('Text')}
      >
        Texto
      </button>
      <button
        className="bg-orange-600 rounded-sm text-white px-4 py-2 cursor-pointer"
        onClick={() => onAdd('Image')}
      >
        Imagem
      </button>
      <button
        className="bg-orange-600 rounded-sm text-white px-4 py-2 cursor-pointer"
        onClick={() => onAdd('Gradient')}
      >
        Gradiente
      </button>
    </div>
  </div>
);
