import { createSlice } from "@reduxjs/toolkit";
import { apiSlice as supabaseApi } from "./apiSlice";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
  },
  reducers: {
    // addTodo: (state, action) => {
    //   state.todoItems.push({
    //     id: crypto.randomUUID(),
    //     todo: action.payload,
    //     completed: false,
    //   });
    // },
    // updateTodo: (state, action) => {
    //   const { id, todo } = action.payload;
    //   let index = state.todoItems.findIndex((e) => e.id === id);
    //   if (index !== -1) {
    //     state.todoItems[index].todo = todo;
    //   }
    // },
    // deleteTodo: (state, action) => {
    //   state.todoItems = state.todoItems.filter(
    //     (item) => item.id !== action.payload.id
    //   );
    // },
  },
  extraReducers: (builder) => {
    // Handle the getTodos query
    builder.addMatcher(
      supabaseApi.endpoints.getTodos.matchFulfilled,
      (state, action) => {
        // Update the todos state with the data from the API
        state.todos = action.payload;
      }
    );
    // Handle the getTodo query (single todo item)
    builder.addMatcher(
      supabaseApi.endpoints.getTodo.matchPending,
      (state, action) => {
        // Update the todos state with the data from the API
        state.todos = action.payload;
      }
    );
    // Handle the addTodo mutation
    builder.addMatcher(
      supabaseApi.endpoints.createTodo.matchPending,
      (state, action) => {
        // Optimistically add the todo item to the state
        state.todos.push(action.meta.arg.originalArgs);
      }
    );
    builder.addMatcher(
      supabaseApi.endpoints.createTodo.matchRejected,
      (state, action) => {
        // If the API call fails, revert back to the previous state
        state.todos.pop();
      }
    );
    // Handle the updateTodo mutation
    builder.addMatcher(
      supabaseApi.endpoints.updateTodo.matchPending,
      (state, action) => {
        // Optimistically update the todo item in the state
        const { id, todo } = action.meta.arg.originalArgs;
        const index = state.todos.findIndex((todoItem) => todoItem.id === id);
        if (index > -1) {
          state.todos[index] = { ...state.todos[index], ...todo };
        }
      }
    );
    builder.addMatcher(
      supabaseApi.endpoints.updateTodo.matchRejected,
      (state, action) => {
        // If the API call fails, revert back to the previous state
        const { id, todo } = action.meta.arg.originalArgs;
        const index = state.todos.findIndex((todoItem) => todoItem.id === id);
        if (index > -1) {
          state.todos[index] = { ...state.todos[index], ...todo };
        }
      }
    );
    // Handle the deleteTodo mutation
    builder.addMatcher(
      supabaseApi.endpoints.deleteTodo.matchPending,
      (state, action) => {
        // Optimistically remove the todo item from the state
        const id = action.meta.arg.originalArgs;
        const index = state.todos.findIndex((todoItem) => todoItem.id === id);
        if (index > -1) {
          state.todos.splice(index, 1);
        }
      }
    );
    builder.addMatcher(
      supabaseApi.endpoints.deleteTodo.matchRejected,
      (state, action) => {
        // If the API call fails, revert back to the previous state
        const id = action.meta.arg.originalArgs;
        const index = state.todos.findIndex((todoItem) => todoItem.id === id);
        if (index > -1) {
          state.todos.splice(index, 0, action.meta.arg.originalArgs);
        }
      }
    );
  },
});

// export const { addTodo, updateTodo, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
