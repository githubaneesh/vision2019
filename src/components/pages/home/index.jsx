// @flow
import React, {Component} from "react";
import bgImage from '../../../assets/images/home/tile_bg_home.png';
import logo from '../../../assets/images/home/vision.png'
//import botomImage from '../../../assets/images/home/bottom_image.png';
// Images

// Style sheet
import './style.scss';
import Utils from "../../../utils/utilityScript";

type Props = {}
 
class Home  extends Component<Props> {
	
	constructor(props: Object) {
		super(props);
		this.navigateTo = Utils.navigateTo.bind(this);
    }
 
	render() {
		var bgImage=require('../../../assets/images/home/tile_bg_home.png');
		let bgstyle = {
			backgroundImage:"url(" + bgImage + ")"			 
		}
	 
		  /*<p  >Short film submission date is in between July 1st to July 31st 2019</p>*/
		return (
			<div className="page-con"  >
				<div className="container1">
					 <div>						 
						   <a  >
							   <button className="btn"  onClick={() => this.navigateTo('instruction')}>
									SUBMIT  YOUR   SHORT   FILM
							   </button>
							   
							</a>
				 	</div>  
				</div>

			</div>

		)
	}
}

export default Home;