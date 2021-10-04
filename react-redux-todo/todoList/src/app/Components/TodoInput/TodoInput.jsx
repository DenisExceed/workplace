import React from 'react';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/icons/AddBox';
import AddBoxIcon from '@material-ui/icons/AddBox';
import InputAdornment from '@material-ui/core/InputAdornment';
import { connect } from 'react-redux';

//import { getElementError } from '@testing-library/dom';
import { actions } from '../../Containers/TodoList/todoSlice';

const mapStateToProps = (state) => {
  return {
   ...state
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeInput: (value) => dispatch(actions.handleChange(value)),
    submitInput: (obj) => dispatch(actions.add(obj)),
    };
};

export class TodoInput extends React.Component {



  handleChange = (event) => {
    this.props.changeInput(event.target.value)
  }

  handleSubmit = (event) => {
  
    if (event.key === 'Enter' || event.type === 'click') {
      this.props.submitInput();
      this.props.changeInput('');
    }

}

render() {
   return (
   <div className="allTodoAdd">
    <Input id ="input" 
      value = {this.props.todoSlice.value}
      onKeyPress = {this.handleSubmit}
      onChange = {this.handleChange} 
      className ="allTodoInput" 
      placeholder="Enter your task" 
      inputProps = {{ 'aria-label': 'description' }}
      endAdornment={
        <InputAdornment position="end">
          <IconButton onClick={this.handleSubmit}>
            <AddBoxIcon className="hand"/>
          </IconButton>
        </InputAdornment>} 
    />
   </div>);
  }

};

export default connect(mapStateToProps, mapDispatchToProps)(TodoInput);