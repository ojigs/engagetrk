import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "../../../utils/api";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  tagTypes: ["todos"],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: async () => {
        const { data, error } = await supabase.from("todos").select("*");
        if (error) throw error;
        console.log(data);
        return data ?? [];
      },
      transformResponse: (response) => {
        return response.reduce((acc, curr) => {
          acc[curr.id] = curr;
          return acc;
        }, {});
      },
      providesTags: ["todos"],
    }),
    createTodo: builder.mutation({
      query: async ({ todo }) => {
        const { data, error } = await supabase
          .from("todos")
          .insert({ todo: todo });
        if (error) throw error;
        return data?.[0] ?? null;
      },
      invalidatesTags: ["todos"],
    }),
  }),
});

export const { useGetTodosQuery, useCreateTodoMutation } = apiSlice;
