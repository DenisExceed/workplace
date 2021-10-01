/* eslint-disable default-case */
import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import './Footer.scss';
import { connect } from 'react-redux';
import { actions } from '../../Containers/TodoList/todoSlice';
import store from '../../store';

const mapStateToProps = (state) => {
  return {
    ...state
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkAll: () => dispatch(actions.checkAll()),
    clearCompleted: () => dispatch(actions.clearCompleted()),
    All: () => dispatch(actions.All()),
    ToDo: () => dispatch(actions.ToDo()),
    Completed: () => dispatch(actions.Completed()),
    };
};

const numOfCompleted = (state) => {
  const completed = state.todoSlice.todos.filter(item => item.checked);
  return completed.length;
}

const numOfNotCompleted = (state) => {
  const notCompleted = state.todoSlice.todos.filter(item => !item.checked);
  return notCompleted.length;
}


const Footer = (state) => {


    let todoFooter = () => {

        if(state.todoSlice.todos.length > 0) {


            return (
              <div className="footer">
               <Button onClick={state.checkAll} className="small">{numOfNotCompleted(state)} tasks left</Button>  
               <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
               <Button onClick={state.All}>All</Button>
               <Button onClick={state.ToDo}>ToDo</Button>
               <Button onClick={state.Completed}>Completed</Button>

               </ButtonGroup>
               {!!numOfCompleted(state) && <Button onClick={state.clearCompleted} className="small">Clear completed</Button>}
              </div>
            );
           }
    }
  
    return (
     <footer>
         {todoFooter()}
     </footer>
    );
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Footer);