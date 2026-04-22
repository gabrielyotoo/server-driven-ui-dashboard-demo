import type { Screen } from '../types';

export const usePublishCode = () => (screen: Screen | null) => {
  if (!screen) {
    return '';
  }

  return JSON.stringify({
    id: screen.name,
    wide: {},
    compact: {
      base: {
        sections: screen.components.map((component) => ({
          props: component.props,
          children: component.props?.children,
          sectionComponentType: component.type,
          id: component.id,
        })),
        order: 1,
      },
    },
  });
};
