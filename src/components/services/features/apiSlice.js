import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "../../../utils/api";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: async (headers) => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const user = session.user;
      console.log("user object: ", user);
      if (user) {
        headers.set("Authorization", `Bearer ${user.token}`);
      }
      console.log("headers: ", headers);
      return headers;
    },
  }),
  tagTypes: ["todos"],
  endpoints: (builder) => ({
    // get all todos from database
    getTodos: builder.query({
      queryFn: async () => {
        const { data, error } = await supabase
          .from("todos")
          .select("*")
          .order("created_at", { ascending: false });
        console.log("supabase: ", await supabase.auth.getUser());
        if (error) throw error;
        return { data };
      },
      providesTags: (result = [], error, arg) => {
        console.log("result: ", result);
        return ["todos", ...result.map(({ id }) => ({ type: "todos", id }))];
      },
    }),
    // get single todo based on id from database
    getTodo: builder.query({
      queryFn: async (id) => {
        const { data, error } = await supabase
          .from("todos")
          .select("*")
          .eq("id", id)
          .single();
        if (error) throw error;
        console.log("single todo: ", data);
        return { data };
      },
      providesTags: (result = [], error, arg) => [{ type: "todos", id: arg }],
    }),
    createTodo: builder.mutation({
      query: async ({ todo }) => {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        const { data, error } = await supabase
          .from("todos")
          .insert({ todo: todo, user_email: user.email });
        if (error) throw error;
        return data?.[0] ?? null;
      },
      // invalidatesTags: (result = [], error, arg) => {
      //   console.log("arg: ", arg);
      //   return [{ type: "todos" }];
      // },
      invalidatesTags: ["todos"],
    }),
    updateTodo: builder.mutation({
      query: async ({ id, todo }) => {
        const { data, error } = await supabase
          .from("todos")
          .update({ todo: todo })
          .eq("id", id);
        if (error) {
          console.log(error);
          throw error;
        }
        return { data };
      },
      invalidatesTags: (result = [], error, arg) => [
        { type: "todos", id: arg.id },
      ],
    }),
    deleteTodo: builder.mutation({
      query: async (id) => {
        const { error } = await supabase.from("todos").delete().eq("id", id);
        if (error) {
          console.log(error);
          throw error;
        }
      },
      invalidatesTags: (result = [], error, arg) => {
        console.log("delete arg: ", arg);
        return [{ type: "todos", id: arg }];
      },
    }),
  }),
});

export const {
  useGetTodoQuery,
  useGetTodosQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = apiSlice;
