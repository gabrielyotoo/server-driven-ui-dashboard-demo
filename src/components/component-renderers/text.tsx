import type { TextComponent } from '../../types';
import { cssBlockToStyle } from '../../utils/styles';

export const Text = ({ props }: Pick<TextComponent, 'props'>) => {
  return (
    <p style={cssBlockToStyle(props?.style ?? '')}>
      {!props?.children ? 'Altere o texto ao lado' : props.children}
    </p>
  );
};
