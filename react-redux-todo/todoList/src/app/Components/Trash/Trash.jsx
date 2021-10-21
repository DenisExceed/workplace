import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux';
import { actions }  from '../../Containers/TodoList/todoSlice';

import './Trash.scss'


 const Trash = (props) => {

  const dispatch = useDispatch()

  let onClickRemove = (id) => {
    dispatch(actions.remove(id))
  }
  
    return (
  
        <FontAwesomeIcon 
        onClick={() => onClickRemove(props.id)} 
        icon={faTrashAlt} 
        className="trash"/>
  
    );
  };

export default Trash