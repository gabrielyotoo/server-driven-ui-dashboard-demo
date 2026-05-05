import { useMemo } from 'react';
import { useComponent } from '../hooks/use-component';
import { TextPropsForm } from './forms/text-props-form';
import { FormField } from './form-field';
import type { Component } from '../types';
import { ViewPropsForm } from './forms/view-props-form';
import { ImagePropsForm } from './forms/image-props-form';

interface ComponentPropsProps {
  onChange: (props: Component['props']) => void;
  onDelete: (id: string) => void;
}

export const ComponentProps = ({ onChange, onDelete }: ComponentPropsProps) => {
  const component = useComponent();

  const form = useMemo(() => {
    if (!component) {
      return null;
    }

    if (component.sectionComponentType === 'Text') {
      return <TextPropsForm key={component.id} onChange={onChange} />;
    }

    if (component.sectionComponentType === 'View') {
      return <ViewPropsForm key={component.id} onChange={onChange} />;
    }

    if (component.sectionComponentType === 'Image') {
      return <ImagePropsForm key={component.id} onChange={onChange} />;
    }
  }, [component, onChange]);

  if (!component) {
    return null;
  }

  return (
    <div className="flex flex-col gap-y-2">
      <FormField label="Id" disabled value={component.id} />
      <FormField label="Order" disabled value={component.order} />
      {form}
      <button
        className="bg-orange-600 rounded-md text-white py-4 cursor-pointer"
        onClick={() => onDelete(component.id)}
      >
        Apagar
      </button>
    </div>
  );
};
