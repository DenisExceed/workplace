import React from 'react';
import {connect} from 'react-redux';
import TodoItem from '../../Components/TodoItem/TodoItem';

import {actions}  from './todoSlice';
/**
 * todo implement component called ToDoInput
 * which should receive onSubmit function which will be called on the press enter key
 * should receive placeholder value which should show as placeholder for the input
 * this input changes should be managed by local state inside ToDoInput component
 * Use this component for enter tasks name
 */
//import ToDoInput from "../../Components/TodoInput/ToDoInput";
import {bindActionCreators} from "../../utils/store";

import './TodoList.scss'


/**
 * todo use this list of the control badges to show them at the control panel
 */

// import { controlBadges } from '../../constants/todo';


/**
 * todo implement HOC for display the list of the todos and control panel and input for add new todos
 */
class TodoList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {   //todo setup local state

    };
  }
  

 render() {

    const todoItems = this.props.todos.map(item => {
      return <TodoItem 
      key={item.id} 
      todo={item}
      complete={this.props.complete}
      delete={this.props.delete}
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

const mapStateToProps = state => ({});  //todo setup this method for get info from the global state

const mapDispatchToProps = dispatch => ({});  //todo implement this function


export default connect(mapStateToProps, mapDispatchToProps)(TodoList)