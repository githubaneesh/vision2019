import React, { Component } from "react";
import { Link } from "react-router-dom";
import Modal from 'react-responsive-modal';
import classNames from 'classnames'
import Dropzone from 'react-dropzone'

import "./style.scss";
type Props = {
  
}
type State = {
  
}
 const thumbsContainer={ display:'flex',flexDirection:'row' ,flexwrap:'wrap'   };
 const thumb = {  display: 'inline-flex',  borderRadius: 2,  border: '1px solid #eaeaea',  marginBottom: 8,  marginRight: 8,  width: 100,  height: 100,  padding: 4,  boxSizing: 'border-box'};
 const thumbInner = { display: 'flex',  minWidth: 0,  overflow: 'hidden'}
 const img = {display: 'block',  width: 'auto',  height: '100%'};


class ImageUploader extends Component<Props,State> {
  constructor(props,state) {
    super(props,state);
    this.state = {
      files: []
    };

  }
  onDrop(files)
   {
      if(files.length > this.props.maxFiles)
      {
        files.splice(this.props.maxFiles,files.length)
      }
     this.setState({
      files: files.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      }))
    });
    console.log('on Drop this.state.files',this.state.files);
   }
   componentWillMount()
   {
    this.state.files.forEach(file=> URL.revokeObjectURL(file.preview))
   }
   render(){
    const {files} = this.state;

    const thumbs = files.map(file => (
      <div style={thumb} key={file.name}>
        <div style={thumbInner}>
          <img
            src={file.preview}
            style={img}
          />
        </div>
      </div>
    ));
     
    return(
      <div className="dropzone">
      <Dropzone accept="image/*" onDrop={this.onDrop.bind(this)} multiple={this.props.allowMultiple}>
        {({getRootProps, getInputProps}) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p >Drop files here</p>
          </div>
        )}
      </Dropzone>
      <aside style={thumbsContainer}>
        {thumbs}
      </aside>
    </div>

    )


   }

 
}

export default ImageUploader;