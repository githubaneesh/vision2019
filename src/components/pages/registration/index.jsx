import React, {Component} from "react"
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Header from '../../library/header';
import {InputText} from '../../library/inputtext';
import {DropdownMenu} from '../../library/dropdown';
import {TextArea} from '../../library/textarea';
import Dropzone from 'react-dropzone';
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";
import SwipeableViews from 'react-swipeable-views';
import {Result} from  '../../library/result_popup';
import {Utils} from '../../../utils/utilityScript';
import LinearProgress from '@material-ui/core/LinearProgress';

import Participant from "../../../models/participant";
import {ParticipantService} from '../../../services/participantservice';
import {UploadService} from '../../../services/uploadService';
import LocalStorageService from "../../../services/localstorageservice";

import './style.scss';

const styles = theme => ({
  root: {
    width: "90%"
  },
  button: {
    marginRight: theme.spacing.unit
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  }
});

 const getSteps = function () {
  return ["Director Details", "Short Film Details"];
}

 const getStepContent = function(step) {
  switch (step) {
    case 0:
      return "Director Details";
    case 1:
      return "Short Film Details";    
    default:
      return "Unknown step";
  }
}
let _objForm = null;
const initialState = {
    activeStep: 0,
			skipped: new Set(),
			showbiodataUploadBtn:false,
			showShortDescBtn:false,
			showShortFilmBtn:false,
			distictLoaded:false,
			dateChanged:false,
			formSubmitted:false,
			showResult:false,
			showError:false,
			validationError:false,
			biodataProgress:null,
			descProgress:null,
			filmProgress:null,
			changed:false
};
export  class Registration extends Component<props> {
	genders= [{id:1,label:'Select',value:'Select'},{id:2,label:'Male',value:'m'},{id:3,label:'Female',value:'f'},{id:4,label:'Transgender',value:'t'}];
	districts = [];
	categories = [{id:1,label:'Select',value:'Select'},{id:2,label:'Freedom ( സ്വാതന്ത്ര്യം )',value:'women_empower'},{id:3,label:'Fear ( ഭയം )',value:'social'},{id:4,label:'Hope ( പ്രതീക്ഷ )',value:'others'}]
	maxPDFSize = 1048576;
	// maxVideoSize = 52428800;
	maxVideoSize = 1073741824;
	biodataPath='';
	objBioData:any =null;
	objDescription:any = null;
	objShortFilm:any = null;
	isBioDataUploaded = false;
	selectedDate:Date;
	
	constructor(props: Object) {
		super(props);
		this.state = initialState;			
		_objForm = new Participant();
		//this.selectedDate = new Date();
		this.popupClose = this.popupClose.bind(this);
		this.inputTextChangeHandler = this.inputTextChangeHandler.bind(this); 
		this.dropDownChangeHandler = this.dropDownChangeHandler.bind(this);
		this.handleDescriptionUpload = this.handleDescriptionUpload.bind(this);
		this.handleFilmUpload = this.handleFilmUpload.bind(this);
		this.biodataChangehandler =this.biodataChangehandler.bind(this);
		this.uploadBiodata = this.uploadBiodata.bind(this);
		this.handleDateChange = this.handleDateChange.bind(this);	
		this.handleChangeIndex = this.handleChangeIndex.bind(this);
		this.callBack = this.callBack.bind(this);
		this.setupBeforeUnloadListener = this.setupBeforeUnloadListener.bind(this);
		this.getDataFromLocalStorage();
		this.getDistricts(); 
			
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
				 this.setState({distictLoaded:true});	 
				console.log('getDistricts response   ',this.districts);
		}
		getDataFromLocalStorage()
		{
			const localData = LocalStorageService.instance.getItem('registration');
			if(localData){
				_objForm = JSON.parse(localData);
				this.biodataPath = (_objForm && _objForm.biodata.key)?_objForm.biodata.key:'';
				this.selectedDate = (_objForm && _objForm.dob)?_objForm.dob:null;				
				const { activeStep } = this.state;
				if(_objForm && _objForm.fistTabCompleted== true ) {
					initialState.activeStep =1;
					this.setState({activeStep:activeStep+1});
				}		
				console.log('_objForm', _objForm );
			}			
		}

  isStepOptional = step => {
    return step === 1;
  };

  isStepSkipped(step) {
    return this.state.skipped.has(step);
  }

  handleNext = () => {
    const { activeStep } = this.state;
	let { skipped } = this.state;  
		this.setState({
			formSubmitted: true		 
		}); 
	 	if(activeStep==0 && !this.isValidFirstPage(_objForm)) {				 
				return;
		}
		else if(activeStep==0 && this.isValidFirstPage(_objForm))
		{
			_objForm.fistTabCompleted = true;
			LocalStorageService.instance.setItem('registration', JSON.stringify(_objForm));				
			this.setState({
				activeStep: activeStep + 1,
				formSubmitted: false,
				skipped
			});
		}
		else {
         this.submit();
		}
  };
  handleBack = () => {
	LocalStorageService.instance.setItem('registration', JSON.stringify(_objForm));	
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1
    });
  };  
  handleReset = () => {
    this.setState({
      activeStep: 0
    });
	};

	getUploadObj=(path,mime,type)=>{
		return {
			key:path ,
			mimeType:mime
		}
	}
	isValidEmail(val){
		return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val);
	}
	isValidMobile(mobNumber)
	{
		return (mobNumber && mobNumber.length== 10)
	}
	isValidFirstPage(obj){
		let booValid = false;	 
		booValid = 	obj &&	obj.name && obj.gender &&  
								obj.age && obj.age < 41 &&
								obj.mobile && obj.mobile.length == 10 && 
								obj.email && this.isValidEmail(obj.email) &&
								obj.address && 
								obj.district && 
								obj.biodata.key 
					return booValid ;		 
	}
	isValidSeconedPage(obj){
		let booValid = false;	 
		booValid = 	obj &&	obj.category  &&
							obj.shortfilm_synopsis && obj.shortfilm_synopsis.key  &&
							obj.shortfilm && obj.shortfilm.key
							&& obj.i_agree
								  
		return booValid ;		 
	}
	isImgSize50MB(size) {
		const imgsize = (size / 1048576);
		if (imgsize > 1000 ) {return true; }
		return false;
	}
	handleDateChange(event){
		console.log('handleDateChange  :',event);
		this.selectedDate  = new Date(event);
		let year = this.selectedDate.getFullYear();
		console.log('year  ',year);
		let _dateNow = new Date();
		let curyear = _dateNow.getFullYear();
		_objForm.age =  curyear-year ;
		_objForm.dob =  this.selectedDate ;
		console.log(' age  ',_objForm.age);
		this.setState({dateChanged:true})
	}
	inputTextChangeHandler(type, event){
		_objForm[type] = event.target.value;
		console.log(type, event.target.value, _objForm);
		this.setState({changed:true});
	}
	dropDownChangeHandler(type, event)
	{
		_objForm[type] = event.target.value == "Select"? undefined:event.target.value;
		this.setState({
			changed:true
		});
		console.log('dropDownChangeHandler ',	_objForm[type]);
 	}
	onDropDescription = (acceptedFiles) => {
		console.log('onDropDescription  ',acceptedFiles);
		this.objDescription = acceptedFiles[0] ;		
		this.setState({
			showShortDescBtn:true
		});

	}
	onDropFilm = (acceptedFiles)=>{
		console.log('onDropFilm  ',acceptedFiles);
		this.objShortFilm = acceptedFiles[0] ;
		if(this.isImgSize50MB(acceptedFiles[0].size)){	
		/*	setTimeout(function(){
				this.setState({
					validationError:true
				});
			},100);	*/		
			return false ;
		}		
		this.setState({
			showShortFilmBtn:true
		});
	}
	async handleDescriptionUpload (event){
	 
		if(this.objDescription){
			console.log('handleDescriptionUpload ');
			const filename = 'synopsis/'+Utils.searchReplaceSpace(Utils.addTimeStatp(this.objDescription.name));
			const objSend = this.getUploadObj(filename ,'application/pdf');		 
			const response = await UploadService.instance.getSignedUrl(objSend);
			console.log('response   ',response);
			const uploadResponse = await UploadService.instance.upload(response,this.objDescription,(event)=>{ 
				this.setState({descProgress:event})
			});
			console.log('uploadResponse   ',uploadResponse);		 
			_objForm.shortfilm_synopsis = {
				key: filename,
				mimetype: "application/pdf"
			}
			console.log(response);
			this.setState({
				showShortDescBtn: false
			});			
			return;
		}	
	}
	async handleFilmUpload(event){
		console.log(event);
		if(this.objShortFilm){
			console.log('handleDescriptionUpload ');
			const filename = 'shortfilm/'+Utils.searchReplaceSpace(Utils.addTimeStatp(this.objShortFilm.name) );;
			const objSend = this.getUploadObj(filename ,"video/mp4");		 
			const response = await UploadService.instance.getSignedUrl(objSend);
			console.log('response   ',response);
			const uploadResponse = await UploadService.instance.upload(response,this.objShortFilm,(event)=>{ 
				this.setState({filmProgress:event})
			});
			console.log('uploadResponse   ',uploadResponse);		 
			_objForm.shortfilm = {
				key: filename,
				mimetype: "video/mp4"
			}
			console.log(response);
			this.setState({
				showShortFilmBtn: false
			});			
			return;
		}	
	}
	biodataChangehandler=(type,event)=>{	 
		console.log('biodataChangehandler ', event, event.target.value);
		this.objBioData = event.target.files[0];
		this.biodataPath = this.objBioData.name ;
	  this.setState({
      showbiodataUploadBtn: true
    });
	}  
	async uploadBiodata(event)
	{
  	if(this.biodataPath !='' && this.objBioData){
			console.log('uploadBiodata 2');
			const filename = 'biodata/'+Utils.searchReplaceSpace(Utils.addTimeStatp(this.biodataPath));
			const objSend = this.getUploadObj(filename,'application/pdf');		 
			const response = await UploadService.instance.getSignedUrl(objSend);
			console.log('response   ',response);
			const uploadResponse = await UploadService.instance.upload(response,this.objBioData,(event)=>{ 
				this.setState({biodataProgress:event})
			});
			console.log('uploadResponse   ',uploadResponse);
			this.isBioDataUploaded = true ;
			_objForm.biodata = {
				key: filename,
				mimetype: "application/pdf"
			}
			console.log(response);
			this.setState({
				showbiodataUploadBtn: false
			});			
			return;
		}
	}
	callBack(count:any)
	{
		console.log('count   : ',count);
	}
	async submit(){
		if(!this.isValidSeconedPage(_objForm)){
			this.setState({formSubmitted:true})
			return;
		}
		delete _objForm.fistTabCompleted;
		delete _objForm.dob ;
		LocalStorageService.instance.setItem('registration', JSON.stringify(_objForm));	
		try{
			const response = await ParticipantService.instance.create(_objForm);
			if(response &&  response._id){
				this.setState({showResult:true,showError:false})			 
			}
			console.log('submit response   ',response);
		}
		catch(error){
			this.setState({showError:true})		
			console.log('submit error   ',error);
		}
 	}
	toggleIagree(event)
	{
	 _objForm.i_agree = !_objForm.i_agree;
	 console.log('_objForm.i_agree   ',_objForm.i_agree);
	}
	handleChangeIndex(event){

	}
	popupClose(event){
		 LocalStorageService.instance.deleteItem('registration');	
		 _objForm = null;
		 _objForm = new Participant();
		 this.selectedDate = null;
		 this.biodataPath='';
		 this.setState(initialState);		 
	}
	setupBeforeUnloadListener = () => {
        window.addEventListener("beforeunload", (ev) => {
            ev.preventDefault();
			LocalStorageService.instance.setItem('registration', JSON.stringify(_objForm));	
        });
	};
	componentDidMount() {
        
        this.setupBeforeUnloadListener();
    }

  render() {
    const  classes  =  {root: {width: "90%"	},
			button: {	marginRight: '0px'},
			instructions: {	marginTop: '0px',	marginBottom: '0px'
			}
		} ;
    const steps = getSteps();
		const { activeStep,formSubmitted,regCompleted,showResult,validationError,biodataProgress,descProgress,filmProgress,showError } = this.state;		 
    return (
			<div className="registration-con">
				{
					formSubmitted && showResult && <Result open={showResult} onClose={(event)=>{this.popupClose(event)}}  ></Result>
				}			

				<Header baseTheme={'#f18eb1'} backToHome={()=>this.navigateTo('/home')}/>
				<div className="row">
							<div className="flash_title">
															<marquee><span className="marqueeClass">18 നും 40 വയസ്സിനും  മദ്ധ്യേ പ്രായമുള്ള യുവജനങ്ങള്‍ക്കാണ്  മത്സരത്തില്‍ പങ്കടുക്കുവാന്‍ അവസരം ലഭിക്കുന്നത്. സ്യഷ്ടികളുടെ ദൈര്‍ഘ്യം : ചുരുങ്ങിയത് 1 മിനിട്ടും പരമാവധി 5 മിനിട്ടും. ജൂലൈ 1 മുതല്‍ 31 വരെയാണ്  അപേക്ഷ സ്വീകരിക്കുന്നത്.</span></marquee>
							</div>                         
				</div>
				<div className="row form-coloumn1">
								<div className="col-md-3"></div>   
								<div className="col-md-6 instn"   >  
								{
									(!showResult &&       
									<div className="form-wrapper">   
									<div styles={classes.root}>			
															<Stepper activeStep={activeStep}>
																{ steps.map((label, index) => {
																	const props = {};
																	const labelProps = {};															 
																	if (this.isStepSkipped(index)) {
																		props.completed = false;
																	}
																	return (
																		<Step key={'steps'+index} {...props}>
																			<StepLabel {...labelProps}>{label}</StepLabel>
																		</Step>
																	);
																})}
															</Stepper>
															<div>
																{  
																	  <div>																	 
																		<div>
																		<div className="content-con">
																			{
																				<SwipeableViews index={activeStep} onChangeIndex={this.handleChangeIndex}>
																					<div>
																					<form>
																							<div className="field_item">
																									<label className="field_label">Name 
																									<span className={( (formSubmitted && !_objForm.name) ? 'error' : '')}><sup>*</sup></span>
																									</label>
																							 		<InputText  value={_objForm.name} type="text" name=""   onChange={(e) => this.inputTextChangeHandler("name", e)} />																									 
																							</div>
																							
																							<div className="field_item">
																									<label className="field_label">Gender
																									<span className={( (formSubmitted && !_objForm.gender) ? 'error' : '')}><sup>*</sup></span></label>
																									<DropdownMenu value={_objForm.gender} items={this.genders}  handleChange={(e) => this.dropDownChangeHandler("gender", e)}/>																									 
																							</div>
																							<div className="field_item_dob">
																									<label className="field_label_dob">Date of Birth  (Age must be below 40 ) 
																									<span className={( (formSubmitted && !_objForm.age) ? 'error' : '')}><sup>*</sup></span>
																									</label>
																						 		<div className="dob_picker">
																						 			<DatePicker
																									 placeholderText="Click to select a date"
																									selected={this.selectedDate}
																									onChange={this.handleDateChange}
																									peekNextMonth
																									showMonthDropdown
																									showYearDropdown
																									dropdownMode="select"
																							  		 />																									    
																								</div>
																								{
																								(formSubmitted && _objForm.age &&  _objForm.age>40  ) && <label className="errorMessage" >Age must be less than 40</label>
																								}
																							</div>
																							<h4>Contact Details </h4>
																							<div className="field_item">
																									<label className="field_label">Mobile Number
																									<span className={( (formSubmitted && !_objForm.mobile) ? 'error' : '')}><sup>*</sup></span>
																									</label>
																							 		<InputText value={_objForm.mobile} type="number" name="" min="10" max="10"   onChange={(e) => this.inputTextChangeHandler("mobile", e)} />
																									 {
																									 (formSubmitted && _objForm.mobile && !this.isValidMobile(_objForm.mobile) ) && <label className="errorMessage" >Enter valid mobile number</label>
																									}
																								   
																							</div>
																							<div className="field_item">
																									<label className="field_label">Email
																									<span className={( (formSubmitted && !_objForm.email) ? 'error' : '')}><sup>*</sup></span>																									
																									</label>
																							   		<InputText value={_objForm.email} type="email" name="" onChange={(e) => this.inputTextChangeHandler("email", e)} />
																								    {
																									 (formSubmitted && _objForm.email && !this.isValidEmail(_objForm.email) ) && <label className="errorMessage" >Enter valid Email</label>
																									}
																								   
																							</div>
																							<div className="field_item">
																									<label className="field_label">Address
																									<span className={( (formSubmitted && !_objForm.address) ? 'error' : '')}><sup>*</sup></span>
																									</label>
																									<TextArea value={_objForm.address} rows={5} cols={50} onChange={(e) => this.inputTextChangeHandler("address", e)}/>
																								 
																							</div>
																							<div className="field_item">
																									<label className="field_label">District  
																									<span className={( (formSubmitted && !_objForm.district) ? 'error' : '')}><sup>*</sup></span>
																									</label>
																									<DropdownMenu  value={_objForm.district} items={this.districts}  handleChange={(e) => this.dropDownChangeHandler("district", e)}/>																									 
																							</div>																					 
																							<div className="field_item">
																									<label className="field_label">Upload Biodata With Affidavit & Photo in pdf/word format
																									<span className={( (formSubmitted &&  !_objForm.biodata.key ) ? 'error' : '')}><sup>*</sup></span>
																									</label>
																									<div className="upload_file">
																									<input className="upload_input"  placeholder="" name="text" value={this.biodataPath} required  readonly/>									 
																								   {
																										(this.state.showbiodataUploadBtn== false )?(
																											<div className="inputWrapper">
																												<input className="fileInput" onChange={(e) => this.biodataChangehandler("biodata", e)}
																													type="file" name="file1" accept=".doc, .docx, .pdf"/>
																											  </div>
																									  ):
																										(
																											<button type="button" className="button_fileupload" onClick={(e) =>this.uploadBiodata(event)} >Upload</button>
																										)
																									}</div>
																									{
																										biodataProgress &&  <LinearProgress variant="determinate" value={biodataProgress } />
																									}

																								 	 {
																									 (formSubmitted && !_objForm.biodata.key ) && <label className="errorMessage" >Please upload biodata</label>
																									}

																							</div>
																						</form>
																					</div>
																					<div> 	
																					<div className="field_item" key="1">
																									<label className="field_label">Short Film Category
																										<span className={( (formSubmitted && !_objForm.category  ) ? 'error' : '')}><sup>*</sup></span>
																									</label>
																									<DropdownMenu value={_objForm.category} items={this.categories}  handleChange={(e) => this.dropDownChangeHandler("category", e)}/>
																							</div>
																							
																								
																							<div className="field_item dragdropUpload">
																									<label className="field_label">Upload short description of Short film in pdf/word format
																										<span className={( (formSubmitted && !_objForm.shortfilm_synopsis.key  ) ? 'error' : '')}><sup>*</sup></span>
																									</label>
																									<div className="drop-con">																								
																												<Dropzone
																												onDrop={this.onDropDescription}
																												accept=".doc, .docx, .pdf"
																												minSize={0}
																												maxSize={this.maxPDFSize}
																												>
																												{({getRootProps, getInputProps, isDragActive, isDragReject,acceptedFiles,  rejectedFiles}) => {
																													const isFileTooLarge = rejectedFiles.length > 0 && rejectedFiles[0].size > this.maxSize;
																													return (
																														<div className="upload_text_con" {...getRootProps()}>
																															<input {...getInputProps()} />
																															 {!isDragActive&& acceptedFiles.length == 0 && 'Click here or drop a file to upload!'}
																															{isDragActive && !isDragReject && "Drop it like it's hot!"}
																															{isDragReject && "File type not accepted, sorry!"}
																															{isFileTooLarge && (
																																<div className="text-danger mt-2">
																																	File is too large.
																																</div>
																															)}
																															{acceptedFiles.length > 0 && acceptedFiles.map( (acceptedFile,index) => (
																																<li className="list-group-item list-group-item-success upload_file_con" key="index">
																																	{acceptedFile.name}																																
																																</li>
																															))}
																															<labeL className="label_in">
																															{( acceptedFiles.length == 0   && _objForm && _objForm.shortfilm_synopsis&& _objForm.shortfilm_synopsis.key)? _objForm.shortfilm_synopsis.key:'' }
																															</labeL>
																														</div>
																													)}
																												}
																											</Dropzone>
																										 	     {
																													 (this.state.showShortDescBtn) && <div className="uploadbtn-con"> <button   className="uploadbtn-con-side"	onClick={(event)=>{this.handleDescriptionUpload(event)}}>Upload</button></div>
																												 }	
																												 {
																													descProgress &&  <LinearProgress variant="determinate" value={descProgress } />
																												}
																								 	</div>
																								
																									 
																								{
																								(formSubmitted && !_objForm.shortfilm_synopsis.key ) && <label className="errorMessage" >Please upload short description.</label>
																								}

																							</div>																		
																							<div className="field_item dragdropUpload">
																									<label className="field_label">Upload Short film (format:mp4, max duration :5 minutes, max size: 1GB) 
																										<span className={( (formSubmitted && !_objForm.shortfilm.key ) ? 'error' : '')}><sup>*</sup></span>
																									</label>
																									<div className="drop-con">																								
																												<Dropzone
																												onDrop={this.onDropFilm}
																												accept="video/mp4"
																												minSize={0}
																												maxSize ={this.maxVideoSize} 
																												>
																												{({getRootProps, getInputProps, isDragActive, isDragReject,acceptedFiles,  rejectedFiles}) => {
																													const isFileTooLarge = rejectedFiles.length > 0 && rejectedFiles[0].size > this.maxVideoSize;
																													return (
																														<div className="upload_text_con" {...getRootProps()}>
																															<input {...getInputProps()} />																															 
																															{!isDragActive&& acceptedFiles.length == 0 && 'Click here or drop a file to upload!'}
																															{isDragActive && !isDragReject && "Drop it like it's hot!"}
																															{isDragReject && "File type not accepted, sorry!"}
																															{isFileTooLarge && (
																																<div className="text-danger mt-2">
																																	File size upto 1 GB is only allowed.
																																</div>
																															)}
																															{acceptedFiles.length > 0 && acceptedFiles.map( (acceptedFile,index) => (
																																<li className="list-group-item list-group-item-success upload_file_con" key="index">
																																	{acceptedFile.name}																																
																																</li>
																															))}
																															<labeL className="label_in">
																															{  ( acceptedFiles.length == 0   && _objForm && _objForm.shortfilm&& _objForm.shortfilm.key)? _objForm.shortfilm.key:'' }
																															</labeL>
																														</div>
																													)}
																												}
																											</Dropzone>																							 
																											     {
																													 (this.state.showShortFilmBtn &&  !this.isImgSize50MB(this.objShortFilm.size)) && <div className="uploadbtn-con"> <button className="uploadbtn-con-side" onClick={(event)=>{this.handleFilmUpload(event)}}>Upload</button></div>
																												 }	
																											{
																												filmProgress &&  <LinearProgress variant="determinate" value={filmProgress } />
																												
																											}
																											</div>
																											
																											{
																												(formSubmitted && this.objShortFilm && validationError)  &&  <label className="errorMessage" > Video size must be upto 50 MB</label>
																											}
																											{
																												(formSubmitted && !_objForm.shortfilm_synopsis.key ) && <label className="errorMessage" >Please upload video</label>
																											}

																							</div>
																							<div className="field_item">																			  
																									<label>
																										<input type="checkbox" className="checkbox-con"	
																										defaultChecked={_objForm.i_agree}																									 																								 
																										onChange={(event)=>{this.toggleIagree(event)} }
																										/>
																										I have read and agree to these terms and conditions.
																										<span className={( (formSubmitted && !_objForm.i_agree ) ? 'error' : '')}><sup>*</sup></span>
																									</label>
																							</div>		
																					</div>																		 			


																				</SwipeableViews>

																			}
																		</div>	
																		{
																		  showError &&	<div className="error">Form submit failed</div>
																		}
																		 <div className="nav-con">
																					<Button
																						disabled={activeStep === 0}
																						onClick={this.handleBack}
																						styles={classes.button}
																					>Back
																					</Button>																		 
																					<Button																						 
																						variant="raised"
																						color="primary"
																						onClick={(event)=>this.handleNext(event)}
																						styles={classes.button}>
																						{activeStep === steps.length - 1 ? "Save" : "Next"}
																					</Button>
																			</div>
																		</div>
																	</div>
																}
															</div>				
														</div>
											
									</div>
									)
								}
								</div>
								<div className="col-md-3"></div>   
				</div>	
		</div>
    );
  }
}

export default  Registration;
