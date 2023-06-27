import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "../../../utils/api";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: async () => {
        const { data, error } = await supabase.from("todos").select("*");
        if (error) throw error;
        return data;
      },
    }),
    createTodo: builder.mutation({
      query: async ({ todo }) => {
        const { data, error } = await supabase
          .from("todos")
          .insert({ todo: todo });
        if (error) throw error;
        return data;
      },
    }),
  }),
});

export const { useGetTodosQuery, useCreateTodoMutation } = apiSlice;
