import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_APP_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const { data: todos, error } = await supabase
    .from("todos")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    throw error;
  }

  return todos;
});

export const addTodo = createAsyncThunk("todos/addTodo", async (todo) => {
  const { data, error } = await supabase
    .from("todos")
    .insert({ todo: todo.todo, completed: false })
    .single();

  if (error) {
    throw error;
  }

  return data;
});

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async ({ id, todo }) => {
    const { data, error } = await supabase
      .from("todos")
      .update({ todo })
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }

    return data;
  }
);

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  const { error } = await supabase.from("todos").delete().eq("id", id);

  if (error) {
    throw error;
  }

  return id;
});

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todoItems: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todoItems = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todoItems.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.todoItems.findIndex(
          (e) => e.id === action.payload.id
        );
        if (index !== -1) {
          state.todoItems[index].todo = action.payload.todo;
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todoItems = state.todoItems.filter(
          (item) => item.id !== action.payload
        );
      });
  },
});

export default todoSlice.reducer;
