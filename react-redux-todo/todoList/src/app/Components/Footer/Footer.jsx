import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { actions } from '../../Containers/TodoList/todoSlice';

import './Footer.scss';

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  checkAll: () => dispatch(actions.checkAll()),
  clearCompleted: () => dispatch(actions.clearCompleted()),
  All: () => dispatch(actions.All()),
  ToDo: () => dispatch(actions.ToDo()),
  Completed: () => dispatch(actions.Completed()),
});

const numOfCompleted = (state) => {
  const completed = state.todoSlice.todos.filter((item) => item.checked);
  return completed.length;
};

const numOfNotCompleted = (state) => {
  const notCompleted = state.todoSlice.todos.filter((item) => !item.checked);
  return notCompleted.length;
};

const Footer = (state) => {
  const {
    todoSlice,
    checkAll,
    All,
    ToDo,
    Completed,
    clearCompleted,
  } = state;
  return (
    <>
      {todoSlice.todos.length ? (
        <div className="footer">
          <Button onClick={checkAll} className="small">
            {numOfNotCompleted(state)}
            {' '}
            tasks left
          </Button>
          <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
            <Button onClick={All}>All</Button>
            <Button onClick={ToDo}>ToDo</Button>
            <Button onClick={Completed}>Completed</Button>
          </ButtonGroup>
          {!!numOfCompleted(state) && <Button onClick={clearCompleted} className="small">Clear completed</Button>}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
