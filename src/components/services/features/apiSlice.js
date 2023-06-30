import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "../../../utils/api";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  tagTypes: ["todos"],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: async () => {
        const { data, error } = await supabase.from("todos").select("*");
        if (error) throw error;
        console.log(data);
        return data;
      },
      providesTags: ["todos"],
    }),
    createTodo: builder.mutation({
      query: async ({ todo }) => {
        const { data, error } = await supabase
          .from("todos")
          .insert({ todo: todo });
        if (error) throw error;
        return data;
      },
      invalidatesTags: ["todos"],
    }),
  }),
});

export const { useGetTodosQuery, useCreateTodoMutation } = apiSlice;
