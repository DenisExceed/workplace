import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const Trash = (props) => {

    return (
  
        <FontAwesomeIcon onClick={() => props.delete(props.id)} icon={faTrashAlt} className="trash"/>
  
    );
  };
  
  export default Trash;