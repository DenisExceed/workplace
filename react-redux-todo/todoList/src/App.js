import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Todo from './app/Components/Todo/Todo';
import LoginForm from './app/Components/Auth/LoginForm/LoginForm';
import RegistrationForm from './app/Components/Auth/RegistrationForm/RegistrationForm';

import './App.css';

const mapStateToProps = (state) => {
  return {
    ...state
  };
}

export class App extends React.Component {
 
render() {

  const isAuth = (component, redirectPath) => {

    const token = JSON.parse(localStorage.getItem('token'));
    
      if (token) {
        return component
      }
        return <Redirect to={redirectPath} />;
  };


  return (
  <Router>
    <div className="App">
      <section>
      <Switch>
       <Route exact path='/' component={LoginForm} />
       <Route path='/registration' component={RegistrationForm} />
       <Route path="/todo">{isAuth(<Todo />, '/')}</Route> 
       </Switch>
      </section>
    </div>
  </Router>
  );
 }
}

export default connect(mapStateToProps)(App);
