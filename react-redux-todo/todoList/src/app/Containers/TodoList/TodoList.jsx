import React from 'react';
import {connect} from 'react-redux';
import TodoItem from '../../Components/TodoItem/TodoItem';

/**
 * todo implement component called ToDoInput
 * which should receive onSubmit function which will be called on the press enter key
 * should receive placeholder value which should show as placeholder for the input
 * this input changes should be managed by local state inside ToDoInput component
 * Use this component for enter tasks name
 */
//import ToDoInput from "../../Components/TodoInput/ToDoInput";
import {bindActionCreators} from "../../utils/store";

import './TodoList.scss';


/**
 * todo use this list of the control badges to show them at the control panel
 */

// import { controlBadges } from '../../constants/todo';


/**
 * todo implement HOC for display the list of the todos and control panel and input for add new todos
 */

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

class TodoList extends React.Component {

render() {

  const todoItems = this.props.todoSlice.todos
  .filter(i => this.props.todoSlice.status === 'Completed' ? i.checked : this.props.todoSlice.status === 'Todo' ? !i.checked : true)
  .map(item => {
      return <TodoItem 
      key = {item.id} 
      todo = {item}
      checked = {this.props.checked}
      />
    });

    return (
      <div className="my-todo">
        <ul>
          {todoItems}
        </ul>
      </div>
    );

  }
}


export default connect(mapStateToProps)(TodoList);