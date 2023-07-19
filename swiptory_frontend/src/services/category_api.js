import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseURL = 'https://localhost:443/v1/api/';


export const categoryApi = createApi({
    reducerPath: '/categoryApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
    }),
    tagTypes: ["Category"],
    endpoints: (builder) => ({
        getCategory: builder.query({
            query: () => ({ url: '/categories' }),
            providesTags: ["Category"],
        }),
    })
})

export const { useGetCategoryQuery } = categoryApi;