import React, { useEffect } from 'react';
import axios from 'axios';
import { authActions } from './app/Components/Auth/AuthReducer';
import { actions } from './app/Containers/TodoList/todoSlice';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Redirect, useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import Todo from './app/Components/Todo/Todo';
import LoginForm from './app/Components/Auth/LoginForm/LoginForm';
import RegistrationForm from './app/Components/Auth/RegistrationForm/RegistrationForm';

import './App.css';

const mapStateToProps = (state) => {
  return {
    ...state
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setToken: (token) => dispatch(authActions.createToken(token))
  }
};

export const App = (props) => {

  const history = useHistory();
  const dispatch = useDispatch(); 

  useEffect(() => {

   const isToken = async () => {

    try {
      const token = JSON.parse(localStorage.getItem('token'));
      
       if (token) {
          
          const resData = await  axios.post(`http://localhost:5000/auth/token`, '', { headers: { token } })
             
          const userIdData = resData.data.userId
           dispatch(authActions.createUserId(userIdData))

          if (!resData.data.isUser) {
            localStorage.removeItem('token')
            history && history.push('/login')
          }

          const userId = props.AuthReducer.userId;
          const resDataId = await axios.get(`http://localhost:5000`, { headers: { userId } })
           dispatch(actions.get(resDataId.data))
       }

    } catch (error) {
         console.log('Возникла ошибка');
      }
    };

    isToken();
  }, [history, props.AuthReducer.userId, dispatch]);


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
       <Route exact path='/login' component={LoginForm} />
       <Route path='/registration' component={RegistrationForm} />
       <Route path="/">{isAuth(<Todo />, '/login')}</Route> 
       </Switch>
      </section>
    </div>
  </Router>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
