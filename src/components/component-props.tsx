import { useMemo } from 'react';
import { useComponent } from '../hooks/use-component';
import { TextPropsForm } from './forms/text-props-form';
import { FormField } from './form-field';
import type { Component } from '../types';
import { ViewPropsForm } from './forms/view-props-form';

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
      return (
        <TextPropsForm
          key={component.id}
          onChange={(values) => {
            onChange({
              ...values,
              children: values.textValue,
            });
          }}
        />
      );
    }

    if (component.type === 'View') {
      return (
        <ViewPropsForm
          key={component.id}
          onChange={(values) => {
            onChange({
              ...values,
              children: [],
            });
          }}
        />
      );
    }
  }, [component, onChange]);

  return (
    <div className="flex flex-col gap-y-2">
      <FormField label="Id" disabled value={component?.id ?? ''} />
      <FormField label="Order" disabled value={component?.order ?? ''} />
      {form}
    </div>
  );
};
