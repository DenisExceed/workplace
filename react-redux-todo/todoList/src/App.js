/* eslint-disable default-case */
import React from 'react';
import './App.css';
import TodoList from "./app/Containers/TodoList/TodoList";
import Header from "./app/Components/Header/Header";
import TodoInput from "./app/Components/TodoInput/TodoInput";
import Card from '@material-ui/core/Card';
import Footer from './app/Components/Footer/Footer';


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


export default App;
