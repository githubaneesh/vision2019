// @flow
import React, {Component} from "react";

import Header from "../../library/header";
import Footer from "../../library/footer"; 
import ParticipantService from "../../../services/participantservice";
import HttpService from '../../../services/httpservice';
import {DropdownMenu} from '../../library/dropdown';
// import AddParticipant from "../../forms/addparticipant";
 
 
// Images

// Style sheet
import './style.scss';
 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PrintWindow from "../../library/printwindow";
import LocalStorageService from "../../../services/localstorageservice";
import AuthenticationService from "../../../services/authenticatoinservice";
import Utils from "../../../utils/utilityScript";
import {DeletePopup} from "../../library/delete_popup"
type Props = {}

type State = {  
 
}
let objTeams = null;
class Dashboard extends Component<Props,State> {

	teams:Array=[];
	totalTeams:Number=0;
	totalTeamsinSelectedCat:Number= 0;
	participants=[];
	baseUrl:string='';
	districts:Array=[];
	categories = [{id:1,label:'Select',value:'Select'},{id:2,label:'Freedom ( സ്വാതന്ത്ര്യം )',value:'women_empower'},{id:3,label:'Fear ( ഭയം )',value:'social'},{id:4,label:'Hope ( പ്രതീക്ഷ )',value:'others'}]
 	selectedDist ='null';
	selectedCat ='null';
	selectedItemID:string=null;
	constructor(props: Object) {
		super(props);
		this.state = {loaded:false,showPrint:false,showDeletePopup:false};
		this.baseUrl = HttpService.instance.base_url();
		console.log('this.baseUrl  ',this.baseUrl);
		//objTeams ={international:[],national:[],state:[]}
		//this.openTab = this.openTab.bind(this);
		//this.getCategory = this.getCategory.bind(this);	 
		this.printBtnClickhandler = this.printBtnClickhandler.bind(this);
		this.logoutHandler = this.logoutHandler.bind(this);
		this.navigateTo = Utils.navigateTo.bind(this);
		this.dropDownChangeHandler = this.dropDownChangeHandler.bind(this);
		this.deleteItem = this.deleteItem.bind(this);
		this.popupClose = this.popupClose.bind(this);
	}

	async componentDidMount() {
		 if(AuthenticationService.instance.TOKEN =='')
		 {
			this.logoutHandler();
			return ;
		 }
		 this.getDistricts();	
		 console.log('AuthenticationService.instance.TOKEN ',AuthenticationService.instance.TOKEN);	
	 	 const participants =  await ParticipantService.instance.getParticipants(AuthenticationService.instance.TOKEN);
		 this.totalTeams = participants.length;
		 this.participants =  this.mapCategory(participants);
		 console.log('teams ',this.participants);
		 this.setState({loaded: true});
		 /* 
		 this.participant = objTeams[this.CAT_INTERNATIONAL];
		 this.totalTeamsinSelectedCat = this.participant.length;
 		 this.setState({selectedCategory: this.CAT_INTERNATIONAL});*/
	}
	componentWillUnmount() {
	}

	componentWillMount(){
	}

	componentDidUpdate(prevProps, prevState) {

	}
	 
	navigateTo(url){
		const { history } = this.props;
        history.push(url);
	}
	async dropDownChangeHandler( type, event){
		console.log(type , event.target.value);
		let participants = null;
		switch(type)
		{
			case 'district':
			this.selectedDist = (event.target.value != 'Select')? event.target.value:null ;			
			participants =  await ParticipantService.instance.getParticipantsByFilter(this.selectedDist,this.selectedCat ,AuthenticationService.instance.TOKEN);
		    break;
			case 'category':
			this.selectedCat = (event.target.value != 'Select')? event.target.value:null ;	
			participants =  await ParticipantService.instance.getParticipantsByFilter(this.selectedDist,this.selectedCat   ,AuthenticationService.instance.TOKEN);
		    break;
		}
		console.log('participants by filter ',participants);
		this.totalTeams = participants.length;
		this.participants = this.mapCategory(participants) ;
		this.setState({loaded: true});
	}
	mapCategory(participants){
		  participants.forEach((participant)=> { 
			switch(participant.category){
				case 'women_empower':
					participant.category = 'Freedom';
				break;
				case 'social':
					participant.category = 'Fear';
				break;
				case 'others':
					participant.category = 'Hope';
				break;
 			}
			 return participant;
         }) ;
		return participants;
	}
	async getDistricts(){
		const response = await ParticipantService.instance.getDistricts();
		response.forEach((district,index)=>{
			this.districts[index]={
									id:district._id,
									label: district.name,
									value: district._id
			}
		});	
		this.districts.unshift({id:'select',
			label: 'Select',
			value: 'Select'} );		 	 
		console.log('getDistricts response   ',this.districts);
	}
     printBtnClickhandler()
	 {
	  this.setState({showPrint:true})
	 }
	 PrintWindowClosed()
	 {
		this.setState({showPrint:false}) 
	 }
	 logoutHandler()
	 {
		LocalStorageService.instance.deleteItem('token');
		this.navigateTo('/login')  ;
	 }
	 showDeletePopup(id:string){
		this.selectedItemID = id;
		this.setState({showDeletePopup: true});
	 }
	 async deleteItem(event)
	 {
		if(this.selectedItemID != null){
			try{
				const deleteresponse: any  = await ParticipantService.instance.deleteParticipant(this.selectedItemID,AuthenticationService.instance.TOKEN);
				let participants: any =  await ParticipantService.instance.getParticipantsByFilter(this.selectedDist,this.selectedCat ,AuthenticationService.instance.TOKEN);
				this.totalTeams = participants.length;
				this.participants = this.mapCategory(participants) ;
				this.selectedItemID = null;
				this.setState({showDeletePopup: false});
			}catch(error){
				console.log('deleteItem   ', error);
			}
		}	

	}
	popupClose(event){
		this.selectedItemID = null;
	    this.setState({showDeletePopup: false});		 
   }
	render() {		
		const _owner = this; 
		const {selectedCategory} = this.state;	 
		const {showPrint,showDeletePopup} = this.state;
		 
		return (
			<div className="dashboard-wrapper">
				 <Header baseTheme={'#f18eb1'} totalTeam={this.totalTeams}   backToHome={()=>this.navigateTo('/home')}/>				 
				{
					showDeletePopup && <DeletePopup open={showDeletePopup} onClose={(event)=>{this.popupClose(event)}} 
					deleteClick={(event)=>{this.deleteItem(event)}}
					></DeletePopup>
				}
				 <div className="logout-con"><a href="" onClick={()=>{this.logoutHandler()}}>Logout</a></div>
                 <div className="row  dashboard-con">
							<div className="col-md-1"></div>
							<div className="col-md-10">										 
										<div className="">

															<div className="panel panel-default panel-table" style={{marginTop: '10px'}}>
																	<div className="panel-heading">
																		<div className="row">
																				<div className="col col-md-5 col-xs-5">
																						{
																						this.districts && <DropdownMenu selected={1} items={this.districts}  handleChange={(e) => this.dropDownChangeHandler("district", e)}/>	
																						}																				 		
																				</div>
																				<div className="col col-md-5 col-xs-5">																				 
																						{
																						this.categories && <DropdownMenu selected={1} items={this.categories}  handleChange={(e) => this.dropDownChangeHandler("category", e)}/>	
																						}		
																				</div>
																				<div className="col col-md-2 col-xs-2 text-right"><div> <a className="print-btn" onClick={()=>{this.printBtnClickhandler()}}  > <FontAwesomeIcon icon="print" size="2x" color="#000000" ></FontAwesomeIcon></a> </div></div>
																		</div>
																	</div>
																	<div className="panel-body table-wrapper table-responsive">
																	  	<table className="table table-striped table-bordered table-list">
																					<thead>
																						<tr>
																							<th>Index</th>																							 
																						 	<th>Name</th>
																							<th>Gender</th>									 
																						 	<th>Age</th>
																							<th>Mobile No</th>
																							<th>Email</th>
																							<th>Address</th>
																							<th>District</th>
																							<th>Category</th>
																							<th>Biodata</th>
																							<th>Synopsis</th>
																							<th>Short film</th>	
																							<th>
																							<FontAwesomeIcon icon="cog" size="2x" color="#53B0A6" >Download</FontAwesomeIcon>
																							</th>																				
																						</tr> 
																					</thead>
																					 <tbody>
																							 {

																								this.participants && this.participants.length> 0 && this.participants.map(function(team, index){
																									return  <tr key={index}>
																												<td>{(index+1)}</td>																			
																												
																												<td>{team.name}</td>
																												<td>{team.gender}</td>
																												<td>{team.age}</td>
																												<td>{team.mobile}</td>
																												<td>{team.email}</td>
																												<td>{team.address}</td>
																												<td>{(team.district  !== null )?team.district.name:''  }</td>
																												<td>{team.category}</td>
																												<td> 
																													<a href={`${_owner.baseUrl}/api/v1/s3/download/${team.biodata.key}`}  download>																											 
																														<FontAwesomeIcon icon="download" size="2x" color="#53B0A6" >Download</FontAwesomeIcon>
																													</a>
																												</td>
																												<td>
																													<a href={`${_owner.baseUrl}/api/v1/s3/download/${team.shortfilm_synopsis.key}`} download>																											 
																														<FontAwesomeIcon icon="file-pdf" size="2x" color="#53B0A6" >Download</FontAwesomeIcon>
																													</a>
																												</td>																												 
																												<td>
																												<a href={`${_owner.baseUrl}/api/v1/s3/download/${team.shortfilm.key}`}  download>																											 
																												<FontAwesomeIcon icon="film" size="2x" color="#53B0A6" >Download</FontAwesomeIcon>
																												</a>
																												</td>	
																												<td>																												 																											 
																													<FontAwesomeIcon onClick={()=>{_owner.showDeletePopup(team._id)}} icon="trash" size="2x" color="#53B0A6" >Download</FontAwesomeIcon>																												 
																												</td>																					 
																											</tr>;
																								})

																							 }																				
 																				    </tbody>
																		</table>
																	 

																	</div>
															
															</div>
										
										</div>
							
							</div>
							<div className="col-md-1"></div>
 				 </div>		
				  {	
					showPrint &&  <PrintWindow show={showPrint}  participants = {this.participants}    onClose={()=>{this.PrintWindowClosed()}}/>
				  }		  
				     
			</div>
			 
		)
	}
}

export default Dashboard;