import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "../../../utils/api";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SUPABASE_APP_URL + "/rest/v1",
    prepareHeaders: async (headers) => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      const user = session.user;
      if (error) throw Error("headers error", error);
      if (user) {
        headers.set("Authorization", `Bearer ${user.token}`);
      } else {
        headers.set(
          "Authorization",
          `Bearer ${process.env.REACT_APP_SUPABASE_KEY}`
        );
      }
      return headers;
    },
    // baseUrl: "",
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
        if (error) throw error;
        return { data };
      },
      providesTags: (result = [], error, arg) => {
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
        if (error) throw Error(error);
        return { data };
      },
      providesTags: (result = [], error, arg) => [{ type: "todos", id: arg }],
    }),
    createTodo: builder.mutation({
      query: async ({ todo, description, category, completed, due_date }) => {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        const { data, error } = await supabase.from("todos").insert({
          todo,
          description,
          category,
          completed,
          due_date,
          user_email: user.email,
        });
        if (error) console.log(error);
        return data?.[0] ?? null;
      },
      invalidatesTags: ["todos"],
    }),
    updateTodo: builder.mutation({
      query: async ({
        id,
        todo,
        category,
        description,
        completed,
        due_date,
      }) => {
        const { data, error } = await supabase
          .from("todos")
          .update({ todo, category, description, completed, due_date })
          .eq("id", id);
        if (error) {
          throw Error(error);
        }
        return { data };
      },
      invalidatesTags: (result = [], error, arg) => [
        { type: "todos", id: arg.id },
      ],
      // optimistic update
      async onQueryStarted({ id, todo }, { dispatch, queryFulfilled }) {
        // Update the cache data for getTodo with the new todo
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getTodo", id, (draft) => {
            draft = todo;
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    deleteTodo: builder.mutation({
      query: async (id) => {
        const { error } = await supabase.from("todos").delete().eq("id", id);
        if (error) {
          throw Error(error);
        }
      },
      invalidatesTags: (result = [], error, arg) => {
        return [{ type: "todos", id: arg }];
      },
      // optimistic update
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        // Delete the cache data for the todo with the id
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getTodo", id, (draft) => {
            draft = undefined;
          })
        );
        try {
          await queryFulfilled;
          console.log("deleted successfully");
        } catch (error) {
          patchResult.undo();
          console.error("failed to delete: ", error);
        }
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
