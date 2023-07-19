import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseURL = 'https://localhost:443/v1/api/';


export const userAPI = createApi({
    reducerPath: '/userAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
    }),
    tagTypes: ["User"],
    endpoints: (builder) => ({
        createUser: builder.mutation({
            query: (user) => ({
                url: 'users/create_user',
                method: "POST",
                body: user,
            }),
            invalidatesTags: ["User"],
        }),
        login: builder.mutation({
            query: (user) => ({
                url: "users/login",
                method: "POST",
                body: user,
            }),
            invalidatesTags: ["User"],
        })
    })
})

export const { useCreateUserMutation, useLoginMutation } = userAPI;