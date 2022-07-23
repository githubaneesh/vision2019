import React, { Component } from "react";
import { Link } from "react-router-dom";
import Modal from 'react-responsive-modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import "./style.scss";
type Props = {
  
};

 
 
export class DeletePopup extends Component<Props> {
 
  constructor(props: Object) {
    super(props);
    this.state = {
     }
   }
   
  render(){
    const {baseTheme, onClose, open,deleteClick} = this.props;
	  return(
      <Modal open={open} onClose={onClose} center closeOnEsc={false} closeOnOverlayClick={false}>
          <div className="form-container" style={{color:baseTheme}}>               
                <h1 className="text_con">Are you sure you ant to delete ?</h1>    
                <button className="btn-con" onClick={this.props.deleteClick} >Delete</button>                        
                     
          </div>
     </Modal>
    );
  }
}

export default DeletePopup;