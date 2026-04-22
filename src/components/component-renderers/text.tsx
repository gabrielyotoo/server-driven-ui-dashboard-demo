import type { TextComponent } from '../../types';

export const Text = ({ props }: Pick<TextComponent, 'props'>) => {
  return (
    <p>{!props?.textValue ? 'Altere o texto ao lado' : props.textValue}</p>
  );
};
