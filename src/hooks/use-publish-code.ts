import type { Screen } from '../types';
import { cssToReactNative } from '../utils/styles';

export const usePublishCode = () => (screen: Screen | null) => {
  if (!screen) {
    return '';
  }

  return JSON.stringify(
    {
      id: screen.name,
      wide: {},
      compact: {
        base: {
          sections: screen.components.map((component) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { style, ...props } = component.props ?? {};

            return {
              props,
              children: component.children,
              sectionComponentType: component.type,
              id: component.id,
              styles: cssToReactNative(component.props?.style),
            };
          }),
          order: 1,
        },
      },
    },
    null,
    2,
  );
};
