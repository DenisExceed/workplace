import React from 'react';
import '../TodoItem/TodoItem.scss';
import { Checkbox } from '@material-ui/core';


/**
 * todo implement functional component which receive form parent
 * bages - array with names
 * onChange - callback function which should be called with the badge name
 * checked - name of the checked badge
 *
 * you can use more props if needed
 *
 * NOTE: this is component which show the ALL, TODO, Completed bages at the control panel
 *
 */
const RadioBadge = (props) => {
  return (
    <Checkbox 
    onChange = {() => props.complete(props.id)} 
    completeAll = {props.completeAll}
    checked = {props.checked}
    />
  );
};

export default RadioBadge;
