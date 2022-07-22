import React, { Component } from "react";
import { Link } from "react-router-dom";
import Modal from 'react-responsive-modal';
import classNames from 'classnames' 
import Button from "../../library/button";
 
import "./style.scss";
type Props = {
  
};

 
const _defaultTitle = "Upload";
class Confirmation extends Component<Props> {
  constructor(props: Object) {
    super(props);
  }
  render(){
    const {open, onClose, title, onConfirm, baseTheme} = this.props
	  return(
      <Modal open={open} onClose={onClose} center closeOnEsc={true} closeOnOverlayClick={true}>
            <div className="confirmation">
                <h1>Are you sure?</h1>
                <div>
                    <h4>This is permanent and can't be undone! { title } created for this team will be permanently lost.</h4>
                </div>
                 <div>												
                        <Button key="confirm" name="confirm"  value="Confirm" bgColor={baseTheme} onClick={onConfirm}  />
                        <Button key="cancel" invert={true} name="cancel"  value="Cancel" bgColor={baseTheme} onClick={onClose}  />
                </div>

            </div>
      </Modal>  
    );
  }
}

export default Confirmation;