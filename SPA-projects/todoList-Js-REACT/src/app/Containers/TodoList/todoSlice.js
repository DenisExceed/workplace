import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  tasks: [],  // task should have a format {id: unique_value, text: taks_text, checked: flag_show_if_task_completed (false by default) }
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    add: (state, {payload}) => {  // todo implement function for add new todo into list
    },
    remove: (state, {payload}) => {  // todo implement function for remove todo from the list
    },
    markAsChecked: (state, {payload}) => {  // todo implement function for mark task checked by id
    },
    clearCompleted: state => {  //todo implement funciton for remove all completed (checked ) tasks
    },
    checkAll: state => {
    }
  },
});


export const actions = todoSlice.actions;


export default todoSlice.reducer;
