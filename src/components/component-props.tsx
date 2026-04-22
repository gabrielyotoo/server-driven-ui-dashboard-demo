import { useComponent } from '../hooks/use-component';
import { TextPropsForm } from './forms/text-props-form';

export const ComponentProps = () => {
  const component = useComponent();

  if (!component) {
    return null;
  }

  if (component.type === 'Text') {
    return <TextPropsForm />;
  }
};
