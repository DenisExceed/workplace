import React from 'react';
import { connect } from 'react-redux';

import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import AddBoxIcon from '@material-ui/icons/AddBox';
import InputAdornment from '@material-ui/core/InputAdornment';
import { actions, createItem } from '../../Containers/TodoList/todoSlice';

import './Todoinput.scss';

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  changeInput: (value) => dispatch(actions.handleChange(value)),
  submitInput: (res) => dispatch(createItem(res)),
});

export class TodoInput extends React.Component {
  handleChange = (event) => {
    const { changeInput } = this.props;
    changeInput(event.target.value);
  }

  handleSubmit = (event) => {
    const {
      todoSlice,
      AuthReducer,
      submitInput,
      changeInput,
    } = this.props;
    if (todoSlice.value.trim() === ''
    || !todoSlice.value.length) return;

    if (event.key === 'Enter' || event.type === 'click') {
      submitInput(
        { text: todoSlice.value, userId: AuthReducer.userId },
      );
      changeInput('');
    }
  }

  render() {
    const { todoSlice } = this.props;
    return (
      <>
        <Input
          id="input"
          value={todoSlice.value}
          onKeyPress={this.handleSubmit}
          onChange={this.handleChange}
          className="allTodoInput"
          placeholder="Enter your task"
          endAdornment={(
            <InputAdornment position="end">
              <IconButton onClick={this.handleSubmit}>
                <AddBoxIcon className="hand" />
              </IconButton>
            </InputAdornment>
          )}
        />
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoInput);
