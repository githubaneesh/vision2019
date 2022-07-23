
import {React} from 'react';
import EventDispatcher from "../lib/events/eventdispatcher";
import CookieService from "./cookieservice";
import $ from 'jquery';

let _singleton: boolean = true;
let _instance: HttpService;
const _version = '1'
//const _urlBase = `https://api-oneness.ksywb.in`;
//const _urlBase = `http://localhost:8080`;
//const _urlBase = 'http://api.vision2019.in';
const _urlBase = 'https://api-reels2021.ksywb.in';
const _url = `${_urlBase}/v/${_version}`;
class HttpService extends EventDispatcher{
    

    constructor(){
        super();
        if(_singleton){
            throw new SyntaxError('This is a singleton class. Please use StudyService.instance instead!');
        }        
    }

    static get instance(): HttpService{
        if (!_instance) {
            _singleton = false;
            _instance = new HttpService();
            _singleton = true;
        }
        return _instance;
    }
    
    async get(path: string, needToken:boolean = false) {
        
        let options = {
            url: `${_urlBase}/${path}`,
            type: "GET"
          }
          if(needToken){
            options.beforeSend= function( xhr ) {
                const user = CookieService.instance.user;
                xhr.setRequestHeader("authorization","Bearer "+user.token);
            }
          }
        return await $.ajax(options);
    }

    async post(path: string, data:any = {}, needToken:boolean = false) {
        let options = {
            url: `${_urlBase}/${path}`,
            type: "POST",
            data:data
          }
          if(needToken){
            options.beforeSend= function( xhr ) {
                const user = CookieService.instance.user;
                xhr.setRequestHeader("authorization","Bearer "+user.token);
            }
          }
        return await $.ajax(options)
    }
    async put(path: string, data:any = {},cb:Function, needToken:boolean = false,) {
        
        let options = {
            url: `${path}`,
            type: "PUT",
            data:data,
            processData: false,
            xhr: function(){
                // get the native XmlHttpRequest object
                var xhr = $.ajaxSettings.xhr() ;
                // set the onprogress event handler
                xhr.upload.onprogress = function(evt){  cb((evt.loaded/evt.total*100) ); } ;
                // set the onload event handler
                xhr.upload.onload = function(){ console.log('DONE!') } ;
                // return the customized object
                return xhr ;
            }
          }
          if(needToken){
            options.beforeSend= function( xhr ) {
                const user = CookieService.instance.user;
                xhr.setRequestHeader("authorization","Bearer "+user.token);
            }
          }
        return await $.ajax(options)
    }

    async auth(data:any = {})
    {
        let options = {
            url: `${_urlBase}/auth/login`,
            type: "POST",
            data:data
          }
        return await $.ajax(options)
    }




    async delete(path: string, id:any , needToken:boolean = false) {
        let options = {
            url: `${_urlBase}/${path}/${id}`,
            type: "DELETE"
          }
          if(needToken){
            options.beforeSend= function( xhr ) {
                const user = CookieService.instance.user;
                xhr.setRequestHeader("authorization","Bearer "+user.token);
            }
          }
        return await $.ajax(options)
    }

    async upload(file, filename, progressCb = null, needToken = false) {
        const formData = new FormData();
        formData.append("file", file, filename);
        formData.append("filename", filename);
        formData.append("upload_file", true);
        let options = {
            url: `${_url}/file/upload`,
            type: "POST",
            headers: {
                contentType: 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            xhr: function () {
                const myXhr = $.ajaxSettings.xhr();
                console.log(myXhr);
                if (myXhr.upload) {
                    myXhr.upload.addEventListener('progress', function(event){
                        var percent = 0;
                        var position = event.loaded || event.position;
                        var total = event.total;
                        if (event.lengthComputable) {
                            percent = Math.ceil(position / total * 100);
                        }
                        if(progressCb){
                            progressCb(percent);
                        }
                        console.log(percent);
                    }, false);
                }
                return myXhr;
            },
            async: true,
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            timeout: 600000
          }
          if(needToken){
            options.beforeSend= function( xhr ) {
                const user = CookieService.instance.user;
                xhr.setRequestHeader("authorization","Bearer "+user.token);
            }
          }
        return await $.ajax(options)
    }
    base_url() { return _urlBase;}

}

export default HttpService;