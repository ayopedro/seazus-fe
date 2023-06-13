import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './axios-base';

export const apiSlice = createApi({
  baseQuery: axiosBaseQuery({ baseUrl: import.meta.env.BASE_URL }),
  endpoints: (build) => ({}),
});
