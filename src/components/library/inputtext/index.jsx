// @flow
import React, {Component} from "react";
//import topImage from '../../../assets/images/home/top_image.png';
//import botomImage from '../../../assets/images/home/bottom_image.png';
// Images

// Style sheet
import './style.scss';

type Props = {}
 
export class InputText  extends Component<Props> {
	constructor(props: Object) {
		super(props);
    }
	render() {
		return (
			<input className="ip_text" {...this.props} />
		)
	}
}

export default InputText;