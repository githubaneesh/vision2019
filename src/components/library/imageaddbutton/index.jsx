// @flow
import React, {Component} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Style sheet
import './style.scss';

type Props = {}
 
class ImageAddButton  extends Component<Props> {
 


	constructor(props: Object) {
		super(props);
    }
	render() {
		return (
			<div className="imgaddButton-con"  >
                <div className="addButton-innercon">
						 <input type="file" name="pic" accept="image/*" onChange={this.props.changeHandler} onClick={(event)=> { 
               event.target.value = null
          }}/>
				         <FontAwesomeIcon icon="plus" size="2x" color="#9e9e9e" />
 			    </div>


			</div>
		)
	}
}

export default ImageAddButton;