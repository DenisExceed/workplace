/* eslint-disable default-case */
// import { Subscriptions } from '@material-ui/icons';
import { createSlice } from '@reduxjs/toolkit';


export const initialState = {
  // tasks: [],  // task should have a format {id: unique_value, text: taks_text, checked: flag_show_if_task_completed (false by default) }
  todos: JSON.parse(localStorage.getItem('todos') || []),
  item: '',
  id: 0,
  value: '',
  status: 'All',
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

      if (!state.value.length || state.value === '' || state.value.trim() === '') { return state }

         const todo = {
         id: (Math.random()).toFixed(3),
         checked: false 
        }
        let text = state.value;

        const newTodos = [{...todo, text}, ...state.todos];

        localStorage.setItem('todos', JSON.stringify(newTodos));

      return {
        ...state,
        todos: newTodos,
      };
    },

    remove: (state = initialState, {payload}) => {  // todo implement function for remove todo from the list

      const id = payload;
      const newTodos =  state.todos.filter(item => item.id !== id);

      localStorage.setItem('todos', JSON.stringify(newTodos));
      
        return {
          ...state,
          todos: newTodos,
        };
    },

    markAsChecked: (state = initialState, {payload}) => {  // todo implement function for mark task checked by id

      const id = payload;
      const todos = [...state.todos].map(({...item}) => {
        if (item.id === id) {
          item.checked = !item.checked;
        }

        return item
      });

      localStorage.setItem('todos', JSON.stringify(todos));

      return {
        ...state,
        todos: todos,
      }

    },

    clearCompleted: (state) => {  //todo implement funciton for remove all completed (checked ) tasks
       const completed = state.todos.filter(item => !item.checked);

       localStorage.setItem('todos', JSON.stringify(completed));
      
        return {
          ...state,
          todos: completed,
        };    
    },

    checkAll: (state) => {

        const status = state.todos.some(item => item.checked);
          
        const mapAllTodos = (checkStatus) => {

          return [...state.todos].map(({...item}) => { 
            item.checked = checkStatus;
            return item;
          });
        }

        const todos = mapAllTodos(!status);

        localStorage.setItem('todos', JSON.stringify(todos));

        return {
          ...state,
          todos: todos,
        };  
    },

    All: (state) => {
      return {
        ...state,
        status: 'All',
      };
    },
    
    ToDo: (state) => {
      return {
        ...state,
        status: 'Todo',
      }; 
    },

    Completed: (state) => {
      return {
        ...state,
        status: 'Completed',
      };
    }

  }  
});


export const actions = todoSlice.actions;

export default todoSlice.reducer;
