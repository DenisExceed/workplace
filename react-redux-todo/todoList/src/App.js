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

const mapStateToProps = (state) => {
  return {
   ...state
  }
}

const mapDispatchToProps = (dispatch) => {
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

class App extends React.Component {

 
render() {

  return (
    <div className="App">


      <header className="App-header">
        {/*todo place your todo header here */}
        <Header />
      </header>
      <section>
      <Card className="allTodo">
        <TodoInput />
        <TodoList />
        <Footer />
      </Card>
      </section>
    </div>
  );
 }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
