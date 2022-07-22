// @flow
import React, {Component} from "react";
import topImage from '../../../assets/images/home/header.png'; 
//import logo from '../../../assets/images/header/oneness.png'; 
// Images

// Style sheet
import './style.scss';
import Button from "../button";

type Props = {}
 
class Header  extends Component<Props> {
	constructor(props: Object) {
		super(props);
		this.backToHome = this.props.backToHome.bind(this)
	}
 
	render() {
		const {totalTeam}=this.props;
		return (
		  		 <div className="topImg-container">		
				 	<img src={topImage}/>
					<div className="row logo-container">
					{
						totalTeam &&  
						<div className="row">
							<div className="col-md-1"></div>
							<div className="col-md-10"><h2 className="title-header">Total {totalTeam } Participants</h2></div>
							<div className="col-md-1"></div>
						 </div>
				    }		
				  </div>			 	
				</div>	 
		)
	}
}

export default Header;