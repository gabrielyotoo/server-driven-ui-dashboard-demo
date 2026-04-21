import { TextPropsForm } from './forms/text-props-form';

export interface Component {
  type: 'View' | 'Text' | 'Pressable' | 'Image' | 'Gradient';
}

interface ComponentPropsProps {
  type: Component['type'];
}

export const ComponentProps = ({ type }: ComponentPropsProps) => {
  if (type === 'Text') {
    return <TextPropsForm />;
  }
};
