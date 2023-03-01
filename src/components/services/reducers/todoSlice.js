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
      let index = state.todoItems.findIndex((e) => e.id === action.payload.id);
      state.todoItems[index] = {
        ...state.todoItems[index],
        todo: action.payload.todo,
      };
      return state;
      // state.todoItems.push(newTodo);
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
