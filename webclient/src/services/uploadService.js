import HttpService from "./httpservice";

let _singleton: boolean = true;
let _instance: UploadService;
export class UploadService {
    
    CREATE = "api/v1/participant/create";
    DELETE = "team/participant";
    SIGNED_URL ="api/v1/s3/signed/create";

    constructor(){
        if(_singleton){
            throw new SyntaxError('This is a singleton class. Please use ParticipantService.instance instead!');
        }        
    }

    static get instance(): UploadService{
        if (!_instance) {
            _singleton = false;
            _instance = new UploadService();
            _singleton = true;
        }
        return _instance;
    }
    
    async getSignedUrl(data)
    {
        return await HttpService.instance.post(this.SIGNED_URL,data);
    }
    async upload(url,file,cb:any)
    {       
        return await HttpService.instance.put(url,file,cb);  
    }
}
export default UploadService;