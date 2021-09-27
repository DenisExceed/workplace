/* eslint-disable default-case */
import { createSlice } from '@reduxjs/toolkit';


export const initialState = {
  // tasks: [],  // task should have a format {id: unique_value, text: taks_text, checked: flag_show_if_task_completed (false by default) }
  todos: [],
  item: '',
  id: 0,
  value: '',
};


export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {

    handleChange: (state = initialState, {payload}) => {
      
      return {
        ...state,
        value: payload
      };
    },


    add: (state = initialState, {payload}) => {  // todo implement function for add new todo into list
        const todo = {
         id: (Math.random()).toFixed(3),
         checked: false 
        }
        let text = state.value;

      return {
        ...state,
        todos: [{...todo, text}, ...state.todos]
      };
    },

    remove: (state = initialState, {payload}) => {  // todo implement function for remove todo from the list

      const id = payload;
      const newTodos =  state.todos.filter(item => item.id !== id);
      
        return {
          ...state,
          todos: newTodos
        };
    },

    markAsChecked: (state = initialState, {payload}) => {  // todo implement function for mark task checked by id

      const id = payload;
      const todoIndex = state.todos.find(item => item.id === id);

      if (todoIndex) {
        todoIndex.checked = !todoIndex.checked;
      }
    },

    clearCompleted: (state) => {  //todo implement funciton for remove all completed (checked ) tasks
       const completed = state.todos.filter(item => !item.checked);
      
        return {
          todos: completed
        };    
    },

    checkAll: (state) => {

        const checkAllItem = state.todos.every(item => item.checked);
        const unCheckAll = state.todos.every(item => !item.checked);
          
        const mapAllTodos = (checkStatus) => {
          state.todos.map(item => { 
            return ( item.checked = checkStatus ? !item.checked : true )
          });
        }
      
        if (checkAllItem || unCheckAll) {
           mapAllTodos(true);
          } else {
           mapAllTodos(false);
        }
      
    }
  }  
});


export const actions = todoSlice.actions;


export default todoSlice.reducer;
