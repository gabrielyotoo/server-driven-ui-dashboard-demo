import { createContext } from 'react';
import { AxiosClient } from '../services/axios';

const axios = new AxiosClient();
export const HttpContext = createContext(axios);
