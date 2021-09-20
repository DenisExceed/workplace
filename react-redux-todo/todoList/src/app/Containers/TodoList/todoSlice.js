import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  // tasks: [],  // task should have a format {id: unique_value, text: taks_text, checked: flag_show_if_task_completed (false by default) }
  todos: [],
  filter: 'All'
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    add: (state, {payload}) => {  // todo implement function for add new todo into list
      let createTodoItem = (text) => {
        const todo = {
         checked: false,
         id: (Math.random()).toFixed(3), 
        }
    
        this.setState ({
         todos: [{...todo, text}, ...this.state.todos]
        });
      }
    },
    remove: (state, {payload}) => {  // todo implement function for remove todo from the list
      let deleteTodo = (id) => {
        const newTodos =  this.state.todos.filter(item => item.id !== id);
      
        this.setState({
          todos: newTodos
        });
      }
    },
    markAsChecked: (state, {payload}) => {  // todo implement function for mark task checked by id
      let completeTodo = (id) => {
        const todoIndex = this.state.todos.findIndex(item => item.id === id)
        const todo = this.state.todos;
        
        todo[todoIndex].checked = !todo[todoIndex].checked;
      
        this.setState({
          todos: [...this.state.todos]
        });
      }
    },
    clearCompleted: state => {  //todo implement funciton for remove all completed (checked ) tasks
      let deleteCompletedTodos = () => {
        const completed = this.state.todos.filter(item => !item.checked);
      
        this.setState({
          todos: completed
        });
      }
    },
    checkAll: state => {
      let completeAllTodos = () => {
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
      
          this.setState({
            todos: completeTodos
          }); 
      }
    }
  },
});


export const actions = todoSlice.actions;


export default todoSlice.reducer;
