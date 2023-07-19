import { configureStore } from "@reduxjs/toolkit";
import { userAPI } from "../services/auth/user_auth";
import authReducer from '../services/auth/auth_slice';
import { categoryApi } from "../services/category_api";
import { storyApi } from "../services/stories_api";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [userAPI.reducerPath]: userAPI.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [storyApi.reducerPath]: storyApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
        userAPI.middleware,
        categoryApi.middleware,
        storyApi.middleware
    ]),
});