// @flow
import React, {Component} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
// Style sheet
import './style.scss';

type Props = {}
 
class Button  extends Component<Props> {
	render() {
		const {btn, loader, small, value, bgColor, onClick, disabled, invert} = this.props;
		const style = invert?{color :bgColor,border: `2px solid ${bgColor}`, backgroundColor: "#ffffff"} :{backgroundColor :bgColor};
		if(btn){
			return (
				<button className={small? "button small" : "button"}  style={style} onClick={onClick} disabled={disabled}>
				 <div className="flex">
					<span>{value}</span>
					{
						loader && <div className="rotation-animation"><FontAwesomeIcon icon={faSpinner} size="1x" /></div>
					}
				 </div>
				 
				</button>
			)
		}
		return (
			<input className={small? "button small" : "button"} type="button" value={value}  style={style}  onClick={onClick} disabled={disabled} />
		)
	}
}

export default Button;