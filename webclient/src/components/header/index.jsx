import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.scss";

class Header extends Component {
	constructor(props){
		super(props);
	}
  render(){
    return(
      <div className="header">
				<div className="header-wrapper">
					<p>Header Content</p>
				</div>
      </div>
    )
  }
}

export default Header;
