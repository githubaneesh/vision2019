import HttpService from "./httpservice";
import { faSleigh } from "@fortawesome/free-solid-svg-icons";
import LocalStorageService from "./localstorageservice";
let _singleTon:boolean = false;
let _instance: AuthenticationService;
class AuthenticationService {

LOGIN = "auth/login";
_token ='';
constructor()
{   
    if(_singleTon)
    {
        throw new SyntaxError('This is a singleton class. Please use AccompaniesService.instance instead!');
    }
}

static get instance():AuthenticationService
{
    if(!_instance)
    {
        _singleTon =false;
        _instance  =new AuthenticationService();
        _singleTon = true;
    }
    return _instance;
}

async login(user)
{
    const result = await HttpService.instance.auth(user);
    if(result && result.body.token)
    {
        this._token = result.body.token;
        LocalStorageService.instance.setItem('token',result.body.token)
    }
    return result
}
get TOKEN ():String 
{
    console.log('TOKEN GET ITEM',LocalStorageService.instance.getItem('token'));
   return   this._token ||  LocalStorageService.instance.getItem('token');
}


}
export default AuthenticationService;