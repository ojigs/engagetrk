import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "../../../utils/api";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fnwlrzhnssqrpuvrxoji.supabase.co/rest/v1",
    prepareHeaders: async (headers) => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const user = session.user;
      if (user) {
        headers.set("Authorization", `Bearer ${user.token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["todos"],
  endpoints: (builder) => ({
    getTodos: builder.query({
      queryFn: async () => {
        const { data, error } = await supabase
          .from("todos")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) throw error;
        return { data };
      },
      providesTags: ["todos"],
    }),
    createTodo: builder.mutation({
      queryFn: async ({ todo }) => {
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
