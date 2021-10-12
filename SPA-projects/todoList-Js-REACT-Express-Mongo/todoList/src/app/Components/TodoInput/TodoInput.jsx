import React from 'react';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/icons/AddBox';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { createItem } from '../../Containers/TodoList/todoSlice';
import InputAdornment from '@material-ui/core/InputAdornment';
import { connect } from 'react-redux';


//import { getElementError } from '@testing-library/dom';
import { actions } from '../../Containers/TodoList/todoSlice';
import axios from 'axios';

const mapStateToProps = (state) => {
  return {
   ...state
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeInput: (value) => dispatch(actions.handleChange(value)),
    submitInput: (res) => dispatch(createItem(res)),
    getTodos: (res) => dispatch(actions.get(res.data)),
  }
};

export class TodoInput extends React.Component {



  handleChange = (event) => {
    this.props.changeInput(event.target.value)
  }

  handleSubmit = (event) => {
  
    if (event.key === 'Enter' || event.type === 'click') {
      this.props.submitInput(this.props.todoSlice.value);
      this.props.changeInput('');
    }

}

async componentDidMount() {

  await axios
  .get(`http://localhost:5000`)
  .then((res) => {
    res = JSON.parse(JSON.stringify(res))
    this.props.getTodos(res);
   })
  .catch((error) => console.log('Ошибка', error));

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