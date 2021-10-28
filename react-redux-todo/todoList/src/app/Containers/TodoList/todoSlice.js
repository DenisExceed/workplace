import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const initialState = {
  todos: [],
  item: '',
  value: '',
  id: 0,
  status: 'All',
};

export const createItem = createAsyncThunk(

  'Add:',
  async (data) => {
    const newTodo = await axios

      .post('http://localhost:5000', { value: data.text, checked: false, userId: data.userId })
      .then((res) => {
        const item = {
          id: res.data.id,
          value: res.data.value,
          checked: false,
        };

        return item;
      })
      .catch((error) => { throw new Error('Ошибка', error); });

    return newTodo;
  },
);

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {

    handleChange: (state = initialState, { payload }) => ({
      ...state,
      value: payload,
    }),

    get: (state = initialState, { payload }) => ({
      ...state,
      todos: payload,
    }),

    remove: (state = initialState, { payload }) => {
      const id = payload;
      const newTodos = state.todos.filter((item) => item.id !== id);

      axios
        .delete(`http://localhost:5000/${id}/`);

      return {
        ...state,
        todos: newTodos,
      };
    },

    markAsChecked: (state = initialState, { payload }) => {
      const id = payload;

      const todos = [...state.todos].map(({ ...item }) => {
        if (item.id === id) {
          item.checked = !item.checked;

          axios
            .put(`http://localhost:5000/${id}/`, { checked: true });
        }

        if (item.id === id && !item.checked) {
          axios
            .put(`http://localhost:5000/${id}/`, { checked: false });
        }

        return item;
      });

      return {
        ...state,
        todos,
      };
    },

    clearCompleted: (state) => {
      const notCompleted = state.todos.filter((item) => !item.checked);
      const completed = state.todos.filter((item) => item.checked);

      axios
        .post('http://localhost:5000/deleteChecked', { itemId: completed.map((item) => item.id) });

      return {
        ...state,
        todos: notCompleted,
      };
    },

    checkAll: (state) => {
      const status = state.todos.some((item) => item.checked);

      const mapAllTodos = (checkStatus) => [...state.todos].map(({ ...item }) => {
        item.checked = checkStatus;

        if (item.checked) {
          axios
            .put('http://localhost:5000/', { checked: true });
        }

        if (!item.checked) {
          axios
            .put('http://localhost:5000/', { checked: false });
        }

        return item;
      });

      const todos = mapAllTodos(!status);

      return {
        ...state,
        todos,
      };
    },

    All: (state) => ({
      ...state,
      status: 'All',
    }),

    ToDo: (state) => ({
      ...state,
      status: 'Todo',
    }),

    Completed: (state) => ({
      ...state,
      status: 'Completed',
    }),

  },
  extraReducers: (builder) => {
    builder.addCase(

      createItem.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      },

    );
  },
});

export const { actions } = todoSlice;

export default todoSlice.reducer;
