import React from 'react';
import { connect } from 'react-redux';
import { createItem } from '../../Containers/TodoList/todoSlice';
import { actions } from '../../Containers/TodoList/todoSlice';
import axios from 'axios';

import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/icons/AddBox';
import AddBoxIcon from '@material-ui/icons/AddBox';
import InputAdornment from '@material-ui/core/InputAdornment';

import './Todoinput.scss'

const mapStateToProps = (state) => {
  return {
    ...state
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeInput: (value) => dispatch(actions.handleChange(value)),
    submitInput: (res) => dispatch(createItem(res)),
    getTodos: (res) => dispatch(actions.get(res)),
  }
};

export class TodoInput extends React.Component {

  handleChange = (event) => {
    this.props.changeInput(event.target.value)
  }

  handleSubmit = (event) => {

    if (this.props.todoSlice.value.trim() === '' ||
    !this.props.todoSlice.value.length) return;

    if (event.key === 'Enter' || event.type === 'click') {
      this.props.submitInput(this.props.todoSlice.value);
      this.props.changeInput('');
    }

  }

  async componentDidMount() {
    await axios
      .get(`http://localhost:5000`)
      .then((res) => {
        this.props.getTodos(res.data);
      })
      .catch((error) => console.log('Ошибка', error));

  }

  render() {
    return (
      <>
        <Input id="input"
          value={this.props.todoSlice.value}
          onKeyPress={this.handleSubmit}
          onChange={this.handleChange}
          className="allTodoInput"
          placeholder="Enter your task"
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={this.handleSubmit}>
                <AddBoxIcon className="hand" />
              </IconButton>
            </InputAdornment>}
        />
      </>);
  }

};

export default connect(mapStateToProps, mapDispatchToProps)(TodoInput);