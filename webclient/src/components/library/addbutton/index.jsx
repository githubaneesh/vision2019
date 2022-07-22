// @flow
import React, {Component} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Style sheet
import './style.scss';

type Props = {}
 
class AddButton  extends Component<Props> {
 


	constructor(props: Object) {
		super(props);
    }

	render() {
		return (
			<div className="addButton-con" onClick={()=>{this.props.onClick(this.props.id)}}>
                <div className="addButton-innercon">
				         <FontAwesomeIcon icon="plus" size="2x" color="#9e9e9e" />
                 </div>

			</div>
		)
	}
}

export default AddButton;