import { configureStore } from '@reduxjs/toolkit';
import todoSlice from './Containers/TodoList/todoSlice';
import AuthReducer from './Components/Auth/AuthReducer';

export default configureStore({
  reducer: {
    todoSlice,
    AuthReducer,
  },
});
