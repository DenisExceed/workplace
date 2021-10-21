import React from 'react';
import { useHistory } from 'react-router-dom';
import TodoList from "../../Containers/TodoList/TodoList";
import TodoInput from "../TodoInput/TodoInput";
import Card from '@material-ui/core/Card';
import Footer from '../Footer/Footer';
import { Stack, Button } from '@mui/material';

import '../../../App.css';


const Todo = () => {

const history = useHistory();

const logOutButton = () => {
  localStorage.removeItem('token');
  history.push('/');
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

export default Todo;