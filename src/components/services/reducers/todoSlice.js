import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todoItems: [],
  },
  reducers: {
    addTodo: (state, action) => {
      console.log(action.payload);
      state.todoItems.push({
        id: crypto.randomUUID(),
        todo: action.payload,
        completed: false,
      });
    },
    deleteTodo: (state, action) => {
      console.log(action.payload);
      state.todoItems = state.todoItems.filter((item) => {
        console.log(item, item.id === action.payload.id);
        return item.id !== action.payload.id;
      });
    },
  },
});

export const { addTodo, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
