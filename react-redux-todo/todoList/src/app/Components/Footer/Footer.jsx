/* eslint-disable default-case */
import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import './Footer.scss';
import { connect } from 'react-redux';
import { actions } from '../../Containers/TodoList/todoSlice';

const mapStateToProps = (state) => {
  return {
    ...state
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkAll: () => dispatch(actions.checkAll()),
    clearCompleted: () => dispatch(actions.clearCompleted()),
    };
};

const numOfCompleted = (state) => {
  const completed = state.todoSlice.todos.filter(item => item.checked);
  return completed.length;
}

const numOfNotCompleted = (state) => {
  const notCompleted = state.todoSlice.todos.filter(item => item.checked === false);
  return notCompleted.length;
}

const setCaseFilter = {

  All: (state) => {
    console.log(state, "111111");
    return {
      ...state.todos
    }
  },

  ToDo: (state) => {
    console.log('2222222');
    const notCompleted = state.todoSlice.todos.filter(item => item.checked === false);
    return notCompleted;  
  },

  Completed: (state) => {
    console.log('333333');
    const completed = state.todoSlice.todos.filter(item => item.checked);
    return completed;
  }

};






const Footer = (state) => {

    let todoFooter = () => {

        if(state.todoSlice.todos.length > 0) {

            return (
              <div className="footer">
               <Button onClick={state.checkAll} className="small">{numOfNotCompleted(state)} tasks left</Button>  
               <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
               <Button onClick={() => setCaseFilter.All(state)}>All</Button>
               <Button onClick={() => setCaseFilter.ToDo(state)}>ToDo</Button>
               <Button onClick={() => setCaseFilter.Completed(state)}>Completed</Button>
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