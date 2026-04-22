import { useMemo } from 'react';
import { useComponent } from '../hooks/use-component';
import { TextPropsForm } from './forms/text-props-form';
import { FormField } from './form-field';
import type { Component } from '../types';

interface ComponentPropsProps {
  onChange: (props: Component['props']) => void;
}

export const ComponentProps = ({ onChange }: ComponentPropsProps) => {
  const component = useComponent();

  const form = useMemo(() => {
    if (!component) {
      return null;
    }

    if (component.type === 'Text') {
      return <TextPropsForm key={component.id} onChange={onChange} />;
    }
  }, [component, onChange]);

  return (
    <div className="flex flex-col gap-y-2">
      <FormField label="Id" disabled value={component?.id ?? ''} />
      {form}
    </div>
  );
};
