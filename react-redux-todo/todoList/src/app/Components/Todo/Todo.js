import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { authActions } from '../Auth/AuthReducer';
import TodoList from "../../Containers/TodoList/TodoList";
import TodoInput from "../TodoInput/TodoInput";
import Card from '@material-ui/core/Card';
import Footer from '../Footer/Footer';
import { Stack, Button } from '@mui/material';

import '../../../App.css';

const mapStateToProps = (state) => {
  return {
    ...state
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteTempUserData: () => dispatch(authActions.deleteUserId())
  }
};


const Todo = (props) => {

const history = useHistory();

const logOutButton = () => {
  localStorage.removeItem('token');
  props.deleteTempUserData();
  history.push('/login');
}

  return (

    <div className="App">
      <header className="App-header">
       <h4>ToDo List</h4>
      </header>
      <section>
      <Card className="allTodo">
        <TodoInput />
        <TodoList />
        <Footer />
      </Card>
      <Stack sx={{ 
          width: '100%', 
          padding: '35px 15px 0', 
          display: 'flex',  
          alignItems: 'center', 
          justifyContent: 'center'}} spacing={2} direction="row">
          <Button 
           onClick={logOutButton}
           variant="contained">Log Out</Button>
        </Stack>
      </section>
    </div>

  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Todo);