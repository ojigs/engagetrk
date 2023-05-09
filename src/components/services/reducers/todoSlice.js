import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todoItems: [],
  },
  reducers: {
    addTodo: (state, action) => {
      state.todoItems.push({
        id: crypto.randomUUID(),
        todo: action.payload,
        completed: false,
      });
    },
    updateTodo: (state, action) => {
      const { id, todo } = action.payload;
      let index = state.todoItems.findIndex((e) => e.id === id);
      if (index !== -1) {
        state.todoItems[index].todo = todo;
      }
    },
    deleteTodo: (state, action) => {
      state.todoItems = state.todoItems.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

export const { addTodo, updateTodo, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
