import React, { useState } from 'react';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/icons/AddBox';
import AddBoxIcon from '@material-ui/icons/AddBox';
import InputAdornment from '@material-ui/core/InputAdornment';
import { connect } from 'react-redux';

import { getElementError } from '@testing-library/dom';
import { actions } from '../../Containers/TodoList/todoSlice';

const mapStateToProps = (state) => {
  return {
    todo: state,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    add: (obj) => dispatch(actions.add(obj)),
    remove: (id) => dispatch(actions.remove(id)),
    markAsChecked: (id) => dispatch(actions.markAsChecked(id)),
    clearCompleted: (obj) => dispatch(actions.clearCompleted(obj)),
    checkAll: (obj) => dispatch(actions.checkAll(obj)),
    };
};

const TodoInput = (props) => {

  const [todo, setTodo] = useState('');

  const handleChange = (event) => {
        setTodo(event.target.value);
    }

  const handleSubmit = (event) => {
  
        if (event.target.value === '') {
            return;
        }

        if (event.key === 'Enter') {
            event.preventDefault();
            this.props.create(this.state.value)
            this.setState({
              value: ''
            });
            event.target.value = '';
        }

        if (event.type === 'click') {
            event.preventDefault();
            this.props.create(this.state.value)
            this.setState({
              value: ''
            });
            document.getElementById('input').value = '';
        }

    } 

   return (
   <div className="allTodoAdd">
    <Input id="input" 
      onKeyPress = {(event) => handleSubmit(event)}
      onChange = {(event) => handleChange(event)} 
      className ="allTodoInput" placeholder="Enter your task" 
      inputProps = {{ 'aria-label': 'description' }}
      endAdornment={
        <InputAdornment position="end">
          <IconButton onClick={() => props.add({
                        id: (Math.random()).toFixed(3),
                        checked: false,
                        item: todo,
          })}>
            <AddBoxIcon className="hand"/>
          </IconButton>
        </InputAdornment>} 
    />
   </div>);

};

export default connect(mapStateToProps, mapDispatchToProps)(TodoInput);