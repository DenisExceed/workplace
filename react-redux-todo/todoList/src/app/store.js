import { configureStore } from '@reduxjs/toolkit';
import todoSliceReducer from './Containers/TodoList/todoSlice'



export default configureStore({
  reducer: {
    // todo: //todo link here todo reducer from the slice
    todoSliceReducer
  },
});
