import { useContext } from 'react';
import { HttpContext } from '../context/http';

export const useHttp = () => useContext(HttpContext);
