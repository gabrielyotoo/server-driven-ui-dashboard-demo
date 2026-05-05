import { useMutation } from '@tanstack/react-query';
import type { Screen } from '../types';
import { useHttp } from './use-http';
import { cssToReactNative, styleToCssBlock } from '../utils/styles';

export const usePublishCode = () => {
  const http = useHttp();

  const mutation = useMutation<void, Error, Screen | null>({
    mutationFn: async (variables) => {
      if (variables) {
        await http.put(`http://localhost:3000/api/screens/${variables.id}`, {
          wide: [],
          compact: variables.compact.map((component) => ({
            props: {
              ...component.props,
              style: cssToReactNative(
                styleToCssBlock(component.props?.style ?? {}),
              ),
            },
            children: component.children,
            sectionComponentType: component.sectionComponentType,
            id: component.id,
            order: component.order,
          })),
        });
      }
    },
    mutationKey: ['publish-screen'],
  });

  return mutation;
};
