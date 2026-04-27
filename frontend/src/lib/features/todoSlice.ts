import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { TodoCategory, Todo } from "@/app/types/todo";

export const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [] as Todo[],
    categories: [] as TodoCategory[],
  },
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
  },
  selectors: {
    getTodoById: (state, id: number) => {
      return state.todos.find((todo: Todo) => todo.id === id);
    },
  },
});

// Export the generated action creators for use in components
export const { addTodo } = todoSlice.actions

// Export the slice reducer for use in the store configuration
export default todoSlice.reducer;