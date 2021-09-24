import React from 'react';
import Trash from "../../Components/Trash/Trash";
import RadioBadge from "../../Components/RadioBadge/RadioBadge";
import './TodoItem.scss';

/**
 * todo implement here component which will show todo item
 * Component should contain checkbox text and trash icon for remove item
 *
 * This component should receive the following params
 * text -  name of task
 * id - id of task
 * checked - checked state of the task
 * onCheck - callback which should be called if the checkbox state was changed
 * onRemove - callback which should be called if the trash icon was called
 *
 * NOTE: need to pass task id into callbacks as param
 */
export default function TodoItem(props){


  return (  // todo implement component markup here
  
      <li id={props.todo.id}>
       <div className="itemsEl">
        <RadioBadge
          id={props.todo.id}
          complete={props.complete}
          checked = {props.todo.checked}
        />
        <span id="itemText" className={props.todo.checked ? 'checked' : ''}>{props.todo.text}</span>
        <Trash 
          id={props.todo.id}
          delete={props.delete}/>
       </div> 
      </li>
  
    );
  }