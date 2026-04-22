import type { TextComponent } from '../../types';

export const Text = ({ props }: Pick<TextComponent, 'props'>) => {
  return <p>{!props?.children ? 'Altere o texto ao lado' : props.children}</p>;
};
