import React from 'react';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/icons/AddBox';
import AddBoxIcon from '@material-ui/icons/AddBox';
import InputAdornment from '@material-ui/core/InputAdornment';


export class TodoInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = { value: '' }
    }

 
    handleChange = (event) => {
        this.setState({ value: event.target.value })
    }

    handleSubmit = (event) => {
  
        if (event.target.value === '') {
            return;
        }

        if (event.key === 'Enter') {
            event.preventDefault();
            this.props.create(this.state.value);
            event.target.value = '';
        }

        if (event.type === 'click') {
          this.props.create(this.state.value);
          document.getElementById('input').value = '';
        }

    } 

  render() {
   return (
   <div className="allTodoAdd">
    <Input id="input" 
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

export default TodoInput;