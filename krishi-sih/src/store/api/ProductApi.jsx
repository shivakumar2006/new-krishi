import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8090"
    }),
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: () => "/products"
        }),
        getAllProductsByCategory: builder.query({
            query: (category) => `/products/category?category=${category}`
        })
    })
})

export const { useGetAllProductsQuery, useGetAllProductsByCategoryQuery } = productApi;