// @flow
import React, {Component} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

// Style sheet
import './style.scss';
import Confirmation from "../confirmation";

type Props = {}
 
class ParticipantAvatar  extends Component<Props> {
 


	constructor(props: Object) {
        super(props);
        this.state = {
            isDeleteClicked:false
        }
        this.deleteClick = this.deleteClick.bind(this);
        this.deleteConfirm = this.deleteConfirm.bind(this);
        this.deleteCancel = this.deleteCancel.bind(this);
    }
    deleteClick() {
        this.setState({
            isDeleteClicked:true
        })
    }
    deleteConfirm() {
        console.log("deleteConfirm", this.props.item)
        this.props.deleteClick(this.props.item);
        this.setState({
            isDeleteClicked:false
        })
    }
    deleteCancel(){
        this.setState({
            isDeleteClicked:false
        }) 
    }
	render() {
        const {item} = this.props;
		return (
			<div className="avatar-container">
                <div className="avatar-con" >
                    <div className="avatar-innercon">
                        {
                            item && item.photo && <img src={item.photo} />
                        }
                    </div>
                </div>
                <div className="delete" onClick={this.deleteClick}><FontAwesomeIcon icon={faTrash} size="1x" color="#ff0000" /></div>
                {this.state.isDeleteClicked && <Confirmation open={this.state.isDeleteClicked}
                    baseTheme={this.props.baseTheme}
                    title={this.props.title}
                    onClose={this.deleteCancel} 
                    onConfirm={this.deleteConfirm}   />}
            </div>
		)
	}
}

export default ParticipantAvatar;