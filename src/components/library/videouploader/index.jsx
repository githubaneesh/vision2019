// @flow
import React, {Component} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
   
// Style sheet
import './style.scss';
import Button from "../button";
import HttpService from "../../../services/httpservice";

type Props = {}
 
class VideoUploader  extends Component<Props> {
 

    video: any
	constructor(props: Object) {
        super(props);
        this.state = {
            videoSelected:false,
            title:"Upload",
            isUploading:false,
            message:"",
            progress:0,
            haveVideo:false
        }
        this.videoSelectHandler = this.videoSelectHandler.bind(this);
        this.resetSelection = this.resetSelection.bind(this);
        this.uploadClickHandler = this.uploadClickHandler.bind(this);
        this.uploadProgressHandler = this.uploadProgressHandler.bind(this);
    }
    uploadProgressHandler(percent = 0){
        this.setState({
            progress:percent
        })
    }
    async uploadClickHandler(){
        const file = this.files[0];
        if(file){
            this.setState({isUploading:true, progress:0, haveVideo:false}, async()=>{
                let message = "";
                try{
                    const response = await HttpService.instance.upload(file,file["name"], this.uploadProgressHandler);
                    if(response.error){
                        console.log(response.message)
                        message = response.message;
                    }else {
                        this.props.onUpload(response.path);
                        this.setState({haveVideo:true});
                    }
                } catch (e) {
                    message = e.message
                }
                this.video.value = null;
                this.setState({message,isUploading:false,videoSelected:false});
            })
        } else {
            this.setState({
                message: "Please select valid file"
            })
        }
        
        
    }
    videoSelectHandler(event){
        this.files = event.target.files
        if (this.files && this.files.length !== 0 && this.files[0]) {
            const file = this.files[0];
            this.setState({videoSelected:true});
          } 
    }
    resetSelection(event){
        event.target.value = null;
        this.setState({
            videoSelected:false,
            message:"",
            isUploading:false
        })
    }
	render() {

		return (
			<div className="video-upload-con"  >
                <div>
                    <label className="field_label">Event Presentation (Upload a Presentation video. Video duration should be below 5 minutes.)</label>
                    {
                        this.state.message != "" && <span className="error">{this.state.message}</span>
                    }
                </div>
                <div className="file-choose">
                    <input ref={elem=>this.video = elem} type="file" accept="video/mp4,video/x-m4v,video/*"
                            onInput={this.videoSelectHandler}
                            onClick={this.resetSelection}
                            title="Choose a video please" 
                        />
                    {
                        this.state.videoSelected && <Button name="" btn={true} loader={this.state.isUploading} small={true} disabled={this.state.isUploading}  value={this.state.isUploading ? 'Uploading':'Upload'} bgColor={this.props.baseTheme} onClick={this.uploadClickHandler} />
                    }

                </div>
                <div>
                    {
                        this.state.haveVideo && <span style={{color: this.props.baseTheme}}><sup>*</sup>Video uploaded successfully! Choose another file if you wish to update.</span>
                    }
                    <p>(Upload limit 60MB)</p>
                </div>
			</div>
		)
	}
}

export default VideoUploader;