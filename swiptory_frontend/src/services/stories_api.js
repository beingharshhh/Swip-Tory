import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseURL = 'https://localhost:443/v1/api/';
let token = localStorage.getItem('token')


export const storyApi = createApi({
    reducerPath: '/storyApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
    }),
    tagTypes: ["Story", "Bookmark"],
    endpoints: (builder) => ({
        getStoriesByCategory: builder.query({
            query: ({ category, limit }) => ({ url: `/stories?category=${category}&limit=${limit}` }),
            providesTags: ["Story"],
        }),
        getBookmarkedStories: builder.query({
            query: () => ({
                url: `/stories/bookmarked_stories`,
                headers: {
                    authorization: `Bearer ${token}`
                }
            }),
            providesTags: ["Story", "Bookmark"],
        }),
        getUserStories: builder.query({
            query: () => ({
                url: `/stories/your_stories`,
                headers: {
                    authorization: `Bearer ${token}`
                }
            }),
            providesTags: ["Story"],
        }),
    })
})

export const {
    useGetStoriesByCategoryQuery,
    useGetBookmarkedStoriesQuery,
    useGetUserStoriesQuery,
} = storyApi;