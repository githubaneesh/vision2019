// @flow
import React, {Component} from "react"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Images

// Style sheet
import './style.scss';

type Props = {}
 
class FormHeader  extends Component<Props> {
	constructor(props: Object) {
		super(props);
		this.backToHome = this.props.backToHome.bind(this)
    }
 
	render() {
		return (		 	 
				 <div className="form-header-con">
				 		  <div className="title-con" style={{'backgroundColor':this.props.baseTheme}}>
						   <div className="homeIcon" onClick={this.backToHome}><FontAwesomeIcon icon="home" size="2x" color="#ffffff" /></div>							 									
								 <h3>{this.props.title}</h3> 
						  </div>
						  <div className="subtitle-con">
						 		 <h4>{this.props.subtitle}</h4> 
						  </div>
					
				  
				 </div>			 
		)
	}
}

export default FormHeader;