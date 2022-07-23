// @flow
import React, {Component} from "react";
import ReactDOM from 'react-dom';
import { renderToString } from 'react-dom/server'
import Modal from 'react-responsive-modal';
import Button from '../../library/button';
// Images

// Style sheet
import './style.scss';

type Props = {}
 
class PrintWindow extends  Component<Props> {
    
   externalWindow = null ;
    constructor(props) {
      super(props);
      // STEP 1: create a container <div>      
      this.externalWindow = null; }
        
      onClose()
      {

      }

    render() {
       const {show} = this.props;
       const {participants} = this.props;
       let _owner = this;
      return(
        show && 
        <Modal open={show} onClose={this.props.onClose} center closeOnEsc={false} closeOnOverlayClick={false}>
 
        <div id="printContent" className="panel-body table-wrapper table-responsive"  >
                        <h3>VISION 2019 SHORT FILM FESTIVAL PARTICIPANTS LIST</h3>                       
                         
                         

                         <div className="panel-body table-wrapper table-responsive">
                         <table className="table table-striped table-bordered table-list">
                         <tbody>
                            <tr>
                                <th>Index</th>
                                <th>Name</th> 
                                <th>Gender</th>
                                <td>Age </td>
                                <td>Mobile </td>
                                <td>Email </td> 
                                <td>Address </td>
                                <td>District  </td> 
                                <td>Category </td>
                                <td>Shortfilm </td>
                            </tr>
                            {
                                  participants && participants.length> 0 && participants.map(function(participant, index){
                                            return  <tr key={index} > 
                                                                         <td>{(index+1)}</td>
                                                                         <td> {participant.name}</td>
                                                                         <td> {participant.gender}</td> 
                                                                         <td>  {participant.age}</td>                                                                   
                                                                         <td>  {participant.mobile}</td>                                                                    
                                                                        <td>  {participant.email}</td>                                                                    
                                                                         <td>  {participant.address}</td>                                                                    
                                                                          <td>  {(participant.district !=null)?participant.district.name:'null'}</td>
                                                                        <td>  {participant.category}</td>
                                                                        <td>  {participant.shortfilm.key}</td>
                                                    </tr>      
                                             })

                            }

                            </tbody>
                         </table>                                 																				
                            
                        </div>
        </div>
        
        <Button className="printBtn" name=""  value="PRINT" bgColor={'#c841ac'} onClick={()=>{this.print()}} />
									
        </Modal >
    )
    }
   componentDidUpdate()
    {
    } 

    
    componentDidMount() {
     // STEP 3: open a new browser window and store a reference to it
    
    }
  
    componentWillUnmount() {
      // STEP 5: This will fire when this.state.showWindowPortal in the parent component becomes false
      // So we tidy up by closing the window
      if( this.externalWindow)
      {
        this.externalWindow.close();
      }
      
    }
    print()
    {
         if( document.getElementById('printContent'))
        {
           let content =  document.getElementById('printContent').innerHTML;
           this.externalWindow = window.open('', 'Print', 'height=600,width=800');
           this. externalWindow.document.write('<html><head><title>Print</title>');
           this.externalWindow.document.write( '<link   href="style.css" type="text/css" media="print"/>' );
           this.externalWindow.document.write( `<style>table{border-spacing: 0px;width:100%}td,th{border: 1px solid #000;text-align: left;padding: 5px;}.center-align{text-align: center;}
           .photo-container {position: relative;}
           .photo-con
           {
               min-width: 50px;
               max-width: 50px;
               min-height: 50px;
               max-height: 50px;
               border: 0px solid #000000;
               background-color: #e5e5e5;
               border-radius: 50px;
               margin: 5px;
               overflow: hidden;
           }
           img{ width: 100px;}          
           </style>` );
           this.externalWindow.document.write('</head><body >');
           this.externalWindow.document.write(content);
           this.externalWindow.document.write('</body></html>');
           this.externalWindow.document.close();
           this.externalWindow.focus()
            this.externalWindow.print();
           this.externalWindow.close();
        } 
    }
  }
  export default PrintWindow ;