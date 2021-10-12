/* eslint-disable default-case */
// import { Subscriptions } from '@material-ui/icons';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const initialState = {
  // tasks: [],  // task should have a format {id: unique_value, text: taks_text, checked: flag_show_if_task_completed (false by default) }
  todos: [],
  item: '',
  value: '',
  id: 0,
  status: 'All',
};

export const createItem = createAsyncThunk(

'Add:',
  async (text) => {

    const newTodo = await axios
      .post(`http://localhost:5000`, { value: text, checked: false })
      .then((res) => {

        const item = {
          _id: res.data.task._id,
          value: res.data.task.value,
          checked: false,
        }
        
        return item;
      })
      .catch((error) => console.log('Ошибка', error));

    return newTodo;

  }
)


export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {

    handleChange: (state = initialState, { payload }) => {

       return {
        ...state,
        value: payload
      };
    },

    get: (state = initialState, { payload }) => {
      return {
        ...state,
        todos: payload
      }
    },


    remove: (state = initialState, {payload}) => {  // todo implement function for remove todo from the list

      const id = payload;
      const newTodos =  state.todos.filter(item => item._id !== id);

      axios
      .delete(`http://localhost:5000/${id}/`)
      
      
        return {
          ...state,
          todos: newTodos
        };
    },

    markAsChecked: (state = initialState, {payload}) => {  // todo implement function for mark task checked by id

      const id = payload;

      const todos = [...state.todos].map(({...item}) => {
        if (item._id === id) {
          item.checked = !item.checked;

          axios
            .put(`http://localhost:5000/${id}/`, { checked: true })        
        }

        if (item._id === id && !item.checked) {
          axios
            .put(`http://localhost:5000/${id}/`, { checked: false })        
        }

        return item  
      });

      return {
        ...state,
        todos: todos
      }

    },

    clearCompleted: (state) => {  //todo implement funciton for remove all completed (checked ) tasks
      

      const notCompleted = state.todos.filter(item => !item.checked);
      const completed = state.todos.filter(item => item.checked);

      axios
      .post('http://localhost:5000/deleteChecked', {itemId: completed.map(item => item._id)});

      
        return {
          ...state,
          todos: notCompleted
        };    
    },

    checkAll: (state) => {

        const status = state.todos.some(item => item.checked);
          
        const mapAllTodos = (checkStatus) => {

          return [...state.todos].map(({...item}) => {
            
            item.checked = checkStatus;

            if(item.checked) {
              axios
              .put(`http://localhost:5000/`, { checked: true })  
            }

            if(!item.checked) {
              axios
              .put(`http://localhost:5000/`, { checked: false })  
            }

            return item;
          });
        }

        const todos = mapAllTodos(!status);
   

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

  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(
      
      createItem.fulfilled, (state, action) => {
      // Add user to the state array
       state.todos.push(action.payload)
      }

    )
  },
});


export const actions = todoSlice.actions;

export default todoSlice.reducer;
