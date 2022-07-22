// @flow
import React, {Component} from "react";
 
// Images

// Style sheet
import './style.scss';

type Props = {}
 
export class DropdownMenu  extends Component<Props> {
    items:Array<any>;
	constructor(props: Object) {
        super(props);
        this.state = {value: ''};
        this.items = this.props.items;
		this.handleChange = this.handleChange.bind(this);
    }

	handleChange(e){
		//this.setState({value: e.target.value});
		this.props.handleChange(e);
	}
 	render() {
		return (
           
        <select value={this.props.value} onChange={this.handleChange}>
            { this.props.items && this.props.items.map(function(item, index){
                          if(item.id && !item.value){
                            return  <option value={item.label}  key={item.id} >{item.label.toString() }</option> ;
                           }
                           else{
                            return  <option value={item.value}  key={item.id} >{item.label.toString() }</option> ;
                           }

                        
            })} 
        </select>
		)
	}
}

export default DropdownMenu;