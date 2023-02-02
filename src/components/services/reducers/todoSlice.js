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
      return state;
    },
  },
});

export const { addTodo } = todoSlice.actions;

export default todoSlice.reducer;
