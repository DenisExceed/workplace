/* eslint-disable default-case */
import React from 'react';
import './App.css';
import TodoList from "./app/Containers/TodoList/TodoList";
import Header from "./app/Components/Header/Header"
import TodoInput from "./app/Components/TodoInput/TodoInput"
import Card from '@material-ui/core/Card';
import Footer from './app/Components/Footer/Footer';



class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      todos: [],
      filter: 'All'
    };
  }

  createTodoItem = (text) => {
    const todo = {
     checked: false,
     id: (Math.random()).toFixed(2), 
  }

  this.setState ({
    todos: [{...todo, text}, ...this.state.todos]
  });
}

completeTodo = (id) => {
  const todoIndex = this.state.todos.findIndex(item => item.id === id)
  const todo = this.state.todos;
  
  todo[todoIndex].checked = !todo[todoIndex].checked;

  this.setState({
    todos: [...this.state.todos]
  });
}

completeAllTodos = () => {
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

deleteTodo = (id) => {
  const newTodos =  this.state.todos.filter(item => item.id !== id);

  this.setState({
    todos: newTodos
  });
}


deleteCompletedTodos = () => {
  const completed = this.state.todos.filter(item => !item.checked);

  this.setState({
    todos: completed
  });
}

numOfCompleeted = () => {
  const completed = this.state.todos.filter(item => item.checked);
  return completed.length;
}

numOfNotCompleeted = () => {
  const notCompleted = this.state.todos.filter(item => item.checked === false);
  return notCompleted.length;
}

setFilter = (filter) => {
  this.setState({filter})
}

setCaseFilter = (item) => {
  switch(this.state.filter) {

    case 'All':
      return true;

    case 'ToDo':
      return !item.checked;
      
    case 'Completed':
      return item.checked;  
  }
}

render() {

  return (
    <div className="App">
      <header className="App-header">
        {/*todo place your todo header here */}
        <Header />
      </header>
      <section>
      <Card className="allTodo">
        <TodoInput 
         create = {this.createTodoItem}
        />
        <TodoList 
         complete = {this.completeTodo} 
         todos = {this.state.todos.filter(this.setCaseFilter)}
         delete = {this.deleteTodo}
        />
        <Footer 
         todos = {this.state.todos.length}
         numOfNotCompleted = {this.numOfNotCompleeted}
         numOfCompleted = {this.numOfCompleeted}
         deleteCompletedTodos = {this.deleteCompletedTodos}
         filter = {this.setFilter}
         completeAll = {this.completeAllTodos}
        />
      </Card>
      </section>
    </div>
  );
 }
}

export default App;
