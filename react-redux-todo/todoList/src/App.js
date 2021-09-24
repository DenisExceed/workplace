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

      {/* <div>{console.log(this.props.add)}</div> */}
      <button onClick={this.addTodoAlex}>Add TODO</button>

      <header className="App-header">
        {/*todo place your todo header here */}
        <Header />
      </header>
      <section>
      <Card className="allTodo">
        <TodoInput 
         create = {this.props.add}
        />
        <TodoList 
         complete = {this.props.markAsChecked} 
         todos = {this.state.todos.filter(this.setCaseFilter)}
         delete = {this.props.remove}
        />
        <Footer 
         todos = {this.state.todos.length}
         numOfNotCompleted = {this.numOfNotCompleeted}
         numOfCompleted = {this.numOfCompleeted}
         deleteCompletedTodos = {this.props.clearCompleted}
         filter = {this.setFilter}
         completeAll = {this.props.checkAll}
        />
      </Card>
      </section>
    </div>
  );
 }
}

const mstp = (state) => {
  return {
    count: state.todoSlice.count,
    add: state.todoSlice.add,
    remove: state.todoSlice.remove,
    markAsChecked: state.todoSlice.markAsChecked,
    clearCompleted: state.todoSlice.clearCompleted,
    checkAll: state.todoSlice.checkAll,
  }
}

const mdtp = (dispatch) => {
  return {
    add: (arg) => {
      dispatch(actions.add(arg));
    },
    remove: (arg) => {
      dispatch(actions.remove(arg));
    },
    markAsChecked: (arg) => {
      dispatch(actions.markAsChecked(arg));
    },
    clearCompleted: (arg) => {
      dispatch(actions.clearCompleted(arg));
    },
    checkAll: (arg) => {
      dispatch(actions.checkAll(arg));
    }
  }
}


export default connect(mstp, mdtp)(App);
