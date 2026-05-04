import { useMutation } from '@tanstack/react-query';
import type { Screen } from '../types';
import { useHttp } from './use-http';

export const useRenameScreen = () => {
  const http = useHttp();

  const mutation = useMutation<void, Error, Pick<Screen, 'id' | 'name'>>({
    mutationFn: async (variables) => {
      await http.put(`http://localhost:3000/api/screens/${variables.id}`, {
        name: variables.name,
      });
    },
    mutationKey: ['publish-screen'],
  });

  return mutation;
};
