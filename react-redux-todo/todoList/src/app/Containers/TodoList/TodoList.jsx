import React from 'react';
import { connect } from 'react-redux';
import TodoItem from '../../Components/TodoItem/TodoItem';

import './TodoList.scss';

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

class TodoList extends React.Component {
  render() {

    return (
      <div className="my-todo">
        <ul>
          {this.props.todoSlice.todos
            .filter(i => this.props.todoSlice.status === 'Completed' ? i.checked : this.props.todoSlice.status === 'Todo' ? !i.checked : true)
            .map(item => {
              return <TodoItem
                key={item._id}
                todo={item}
              />
            })}
        </ul>
      </div>
    );

  }
}

export default connect(mapStateToProps)(TodoList);