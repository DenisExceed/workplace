import React from 'react';
import Trash from '../Trash/Trash';
import RadioBadge from '../RadioBadge/RadioBadge';

import './TodoItem.scss';

const TodoItem = ({ todo }) => (
  <li>
    <div className="itemsEl">
      <RadioBadge
        id={todo.id}
        checked={todo.checked}
      />
      <span id="itemText" className={todo.checked ? 'checked' : ''}>{todo.value}</span>
      <Trash id={todo.id} />
    </div>
  </li>
);

export default TodoItem;
