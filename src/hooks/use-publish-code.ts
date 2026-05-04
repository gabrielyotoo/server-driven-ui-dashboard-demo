import { useMutation } from '@tanstack/react-query';
import type { Screen } from '../types';
import { cssToReactNative } from '../utils/styles';
import { useHttp } from './use-http';

export const usePublishCode = () => {
  const http = useHttp();

  const mutation = useMutation<void, Error, Screen | null>({
    mutationFn: async (variables) => {
      if (variables) {
        await http.put(`http://localhost:3000/api/screens/${variables.id}`, {
          wide: {},
          compact: variables.components.map((component) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { style, ...props } = component.props ?? {};

            return {
              props,
              children: component.children,
              sectionComponentType: component.type,
              id: component.id,
              styles: cssToReactNative(component.props?.style),
              order: component.order,
            };
          }),
        });
      }
    },
    mutationKey: ['publish-screen'],
  });

  return mutation;
};
