import { useMutation } from '@tanstack/react-query';
import type { Screen } from '../types';
import { useHttp } from './use-http';

export const useCreateScreen = () => {
  const http = useHttp();

  const mutation = useMutation<void, Error, Screen | null>({
    mutationFn: async (variables) => {
      if (variables) {
        await http.post('http://localhost:3000/api/screens', {
          id: variables.id,
          name: variables.name,
        });
      }
    },
    mutationKey: ['publish-screen'],
  });

  return mutation;
};
