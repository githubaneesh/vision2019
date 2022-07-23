import React, { Component } from "react";
import { Link } from "react-router-dom";
import Modal from 'react-responsive-modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import "./style.scss";
type Props = {
  
};

 
 
export class Result extends Component<Props> {
 
  constructor(props: Object) {
    super(props);
    this.state = {
     }
   }
   
  render(){
    const {baseTheme, onClose, open} = this.props;
	  return(
      <Modal open={open} onClose={onClose} center closeOnEsc={false} closeOnOverlayClick={false}>
          <div className="form-container" style={{color:baseTheme}}>
                <FontAwesomeIcon icon={faThumbsUp} size="3x" color={'#168e8e'} />  
                <h1 className="text_con">Registration Successfully Completed</h1>                             
                     
          </div>
     </Modal>
    );
  }
}

export default Result;