import React from 'react';
import { Checkbox } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { actions } from '../../Containers/TodoList/todoSlice';

import '../TodoItem/TodoItem.scss';

const RadioBadge = (props) => {
  const dispatch = useDispatch();

  const onClickMark = (id) => {
    dispatch(actions.markAsChecked(id));
  };
  const { checked } = props;
  return (
    <Checkbox
      onChange={() => onClickMark(props.id)}
      checked={checked}
    />
  );
};

export default RadioBadge;
