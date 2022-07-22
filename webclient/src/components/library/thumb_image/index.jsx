import React, { Component } from "react";
import { Link } from "react-router-dom";
import Modal from 'react-responsive-modal';
import classNames from 'classnames'
import Dropzone from 'react-dropzone';
import ImageUploader from "../../library/image_browse";
import InputText from "../../library/inputtext";
import Button from "../../library/button";
import ImageAddButton from "../../library/imageaddbutton";
import ImageUploadWindow from "../../library/image_upload_window"
import "./style.scss";
type Props = {
  
}

 

class ThumbImage extends Component<Props> {

 

  constructor(props: Object) {
    super(props);
    
   }
  handleSubmit= ()=> {

  }
  handleChange= ()=> {
    
  } 
  
  render(){
	  return(
       <div className="thumbimage">
             <img src={this.props.file}/>
        </div>    
    );
  }
}

export default ThumbImage;