import { configureStore } from '@reduxjs/toolkit';
import todoSlice from './Containers/TodoList/todoSlice'



export default configureStore({
  reducer: {
    todoSlice
  },
});
