// @flow
import React, {Component} from "react"; 
import Header from '../../library/header';
import Footer from  "../../library/footer"; 
import InputText from "../../library/inputtext";
import Button from "../../library/button";
import Utils from "../../../utils/utilityScript";
import User from "../../../models/user";
import AuthenticationService from "../../../services/authenticatoinservice";

// Images

// Style sheet
import './style.scss';
 

type Props = {};

let _objForm = null;
class Login  extends Component<Props> {
 	constructor(props: Object) {
		super(props);
		this.state = {}	 
        _objForm = new User();
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.navigateTo = Utils.navigateTo.bind(this);
    }

	componentWillUnmount() {
		_objForm = null;
	}

	componentWillMount(){
		 _objForm = new User(); 
	}

	componentDidUpdate(prevProps, prevState) {
	}
	refresh(){
		this.setState({refresh:!this.state.refresh})
	}
    inputTextChangeHandler(type, event){
		_objForm[type] = event.target.value;
		/*console.log(type, event.target.value, _objForm);*/
	}
 	async handleFormSubmit()
	{
           const objSend =  _objForm;		
            const result = await AuthenticationService.instance.login(objSend);
            console.log(result);
			if(result && result.error== false   ){             
                this.navigateTo('/dashboard')  ;                
			}
			return;
     }
  
 render() {	 
 
		return (
			<div className="home-wrapper">
				 <Header baseTheme={'#f18eb1'} backToHome={()=>this.navigateTo('/home')}/>
                 <div className="">
                 <div className="login-page">
                            <div className="form">
                                <form className="login-form">
                                        <InputText type="text" placeholder="User Name" name="" onChange={(e) => this.inputTextChangeHandler("username", e)} />
                                        <InputText type="password" placeholder="Password" name="" onChange={(e) => this.inputTextChangeHandler("password", e)} />
                                       
                                        <Button name=""  value="LOGIN" bgColor={'#26e1b3'} onClick={this.handleFormSubmit} />
                                <p className="message">  </p>
                                </form>
                            </div>
                            </div>
                 
                 </div>


				

			</div>
		)
	}
}

export default Login;