import React from 'react';
import { connect } from 'react-redux';
import TodoItem from '../../Components/TodoItem/TodoItem';

import './TodoList.scss';

const mapStateToProps = (state) => ({
  ...state,
});

class TodoList extends React.Component {
  render() {
    const { todoSlice } = this.props;

    return (
      <div className="my-todo">
        <ul>
          {todoSlice.todos
            .filter((i) => {
              if (todoSlice.status === 'Completed') {
                return i.checked;
              }
              if (todoSlice.status === 'Todo') {
                return !i.checked;
              }
              return true;
            })
            .map((item) => (
              <TodoItem
                key={item.id}
                todo={item}
              />
            ))}
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps)(TodoList);
