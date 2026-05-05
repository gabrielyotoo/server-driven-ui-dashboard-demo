import { useQuery } from '@tanstack/react-query';
import { useHttp } from './use-http';
import type { Screen } from '../types';

export const useServerScreens = () => {
  const http = useHttp();

  const query = useQuery({
    queryFn: () => http.get<Screen[]>('/screens'),
    queryKey: ['screens'],
  });

  return query;
};
