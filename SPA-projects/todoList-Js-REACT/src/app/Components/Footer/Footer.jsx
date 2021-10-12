import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import './Footer.scss'

const Footer = (props) => {
 
    let todoFooter = () => {
        if(props.todos > 0) {
            return (
              <div className="footer">
               <Button onClick={props.completeAll} className="small">{props.numOfNotCompleted()} tasks left</Button>  
               <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                <Button onClick={() => props.filter('All')}>All</Button>
                <Button onClick={() => props.filter('ToDo')}>ToDo</Button>
                <Button onClick={() => props.filter('Completed')}>Completed</Button>
               </ButtonGroup>
               {!!props.numOfCompleted() && <Button onClick={props.deleteCompletedTodos} className="small">Clear completed</Button>}
              </div>
            );
           }
    }
  
    return (
     <footer>
         {todoFooter()}
     </footer>
    );
  };
  
  export default Footer;