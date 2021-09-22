/* eslint-disable default-case */
import React from 'react';
import './App.css';
import TodoList from "./app/Containers/TodoList/TodoList";
import Header from "./app/Components/Header/Header";
import TodoInput from "./app/Components/TodoInput/TodoInput";
import Card from '@material-ui/core/Card';
import Footer from './app/Components/Footer/Footer';
import {actions} from './app/Containers/TodoList/todoSlice';
import { connect } from 'react-redux';



class App extends React.Component {

  constructor(props) {

    super(props);
    this.state = { 
      todos: [],
      filter: 'All'
    };

    this.addTodoAlex = this.addTodoAlex.bind(this);
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

addTodoAlex () {
  this.props.test('PAYLOAD');
}

render() {

  return (
    <div className="App">

      <div>{this.props.count}</div>
      <button onClick={this.addTodoAlex}>Add TODO</button>

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

const mstp = (state) => {
  return {
    count: state.todoSlice.count
  }
}

const mdtp = (dispatch) => {
  return {
    test: (arg) => {
      dispatch(actions.test(arg));
    }
  }
}


export default connect(mstp, mdtp)(App);
