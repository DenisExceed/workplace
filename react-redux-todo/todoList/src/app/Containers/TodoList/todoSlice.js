import { createSlice } from '@reduxjs/toolkit';

import {
  SHOW_ALL,
  SHOW_COMPLETED,
  SHOW_ACTIVE,
  ADD,
  DELETE,
  MARK_AS_CHECKED,
  CLEAR_COMPLETED,
  CHECK_ALL
} from '../../constants/todo'

export const initialState = {
  // tasks: [],  // task should have a format {id: unique_value, text: taks_text, checked: flag_show_if_task_completed (false by default) }
  todos: [],
  filter: 'All',
};


export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {

    // test: (state, data) => {
    //   return {
    //     ...state,
    //     count: state.count + 1
    //   };
    // },
    // /**
    //  * text: string;
    //  */
    add: (state, action) => {  // todo implement function for add new todo into list
        this.state.push(action.payload)
        return {
          ...state,
          todos: [...state.todos]
        };
      }
    },

    remove: (state, action) => {  // todo implement function for remove todo from the list

        const newTodos =  this.state.todos.filter(item => item.id !== action.payload);
      
        return {
          ...state,
          todos: newTodos
        };
    },

    markAsChecked: (state, action) => {  // todo implement function for mark task checked by id

        const todoIndex = this.state.todos.findIndex(item => item.id === action.payload)
        const todo = this.state.todos;
        
        todo[todoIndex].checked = !todo[todoIndex].checked;
      
        return {
          todos: [...state.todos]
        };
    },

    clearCompleted: state => {  //todo implement funciton for remove all completed (checked ) tasks
        const completed = this.state.todos.filter(item => !item.checked);
      
        return {
          todos: completed
        };    
    },

    checkAll: state => {
        const checkAll = this.state.todos.every(item => item.checked);
        const unCheckAll = this.state.todos.every(item => !item.checked);
      
        let completeTodos;
      
        const mapAllTodos = (checkStatus) => {
          completeTodos = this.state.todos.map(item => {
            item.checked = checkStatus ? !item.checked : true;
            return item;
           });
          }
      
        if (checkAll || unCheckAll) {
           mapAllTodos(true);
         } else {
           mapAllTodos(false);
        }
      
        return {
          todos: completeTodos
        }; 
    }
});


export const actions = todoSlice.actions;


export default todoSlice.reducer;
