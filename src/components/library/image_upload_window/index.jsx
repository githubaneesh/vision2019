import React, { Component } from "react";
import { Link } from "react-router-dom";
import Modal from 'react-responsive-modal';
import classNames from 'classnames' 
import Button from "../../library/button";
 
import "./style.scss";
import HttpService from "../../../services/httpservice";
type Props = {
  
};

 
const _defaultTitle = "Upload";
class ImageUploadWindow extends Component<Props> {
  constructor(props: Object) {
    super(props);
    this.state = {
      title:_defaultTitle,
      message:''
    }
  }
  componentDidMount(){
    this.setState({
      title: _defaultTitle
    })
  }
  handleSubmit= async (e)=> {
    const {files, file, filename, uploadHandler} = this.props;
    this.setState({
      title: "Uploading",
      message:''
    }, async() =>{
      try{
        const response = await HttpService.instance.upload(files[0], filename);
        if(response.error){
          console.log(response.message);
          this.setState({
            message:response.message
          })
        }else {
          uploadHandler(e, response.path);
        }
      }catch(e){
        this.setState({
          message:e
        })
      }
    })
    
  }
  handleChange= ()=> {
    
  } 
 
  render(){
	  return(
      <Modal open={this.props.open} onClose={this.props.onClose} center closeOnEsc={false} closeOnOverlayClick={false}>
            <div className="imageUploadWindow">
                <img src={this.props.file}/>

                 <div className="field_item pull-right">												
                        <Button name="upload" btn={true} loader={this.state.title !== _defaultTitle} disabled={this.state.title !== _defaultTitle} value={this.state.title} bgColor={this.props.baseTheme} onClick={this.handleSubmit}  />
                </div>

            </div>
      </Modal>  
    );
  }
}

export default ImageUploadWindow;