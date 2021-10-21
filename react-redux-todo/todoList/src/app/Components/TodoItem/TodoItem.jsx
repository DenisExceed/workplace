import React from 'react';
import Trash from "../../Components/Trash/Trash";
import RadioBadge from "../../Components/RadioBadge/RadioBadge";

import './TodoItem.scss';

const TodoItem = ({ todo }) => {

  return (
    <li id={todo.id}>
      <div className="itemsEl">
        <RadioBadge
          id={todo._id}
          checked={todo.checked}
        />
        <span id="itemText" className={todo.checked ? 'checked' : ''}>{todo.value}</span>
        <Trash id={todo._id}/>
      </div>
    </li>
  );
}

export default TodoItem