// @flow
import React, {Component} from "react"; 
//import footerImage from '../../../assets/images/footer/footer.png';
// Images

// Style sheet
import './style.scss';

type Props = {}
 
class Footer  extends Component<Props> {
	constructor(props: Object) {
		super(props);
    }

	componentDidMount() {
	}

	componentWillUnmount() {
	}

	componentWillMount(){
	}

	componentDidUpdate(prevProps, prevState) {
	}

 
 
	render() {
		return (		 	 
				 <div className="footer-container">
					 <h5>Copyright©Kerala State Youth Welfare Board</h5>
				 	{/*<img src={}/>*/}
				 </div>			 
		)
	}
}

export default Footer;