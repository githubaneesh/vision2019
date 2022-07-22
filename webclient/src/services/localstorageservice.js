let _singleton: boolean = true;
let _instance: LocalStorageService;

class LocalStorageService {

    APP_KEY: string = "vision-2019";
    constructor(){
        if(_singleton){
            throw new SyntaxError('This is a singleton class. Please use LocalStorageService.instance instead!');
        }      
    }

    static get instance(): LocalStorageService{
        if (!_instance) {
            _singleton = false;
            _instance = new LocalStorageService();
            _singleton = true;
        }
        return _instance;
    }

    setItem(key,value){
        console.log('setItem  key',this.APP_KEY+key);
        console.log('setItem  value',value);
        localStorage.setItem(this.APP_KEY+key,value);
    }
    
    setItemBoolean(key,value){
        this.setItem(key,value?"true":"false");
    }
    

    getItemBoolean(key){
        return this.getItem(key)==="true";
    }

    getItem(key){
        console.log('getItem key',key);
        console.log('getItem value',localStorage.getItem(this.APP_KEY+key));
        return localStorage.getItem(this.APP_KEY+key);
    }
    deleteItem(key){
        
       return localStorage.removeItem(this.APP_KEY+key);
    }

    clear(){
        localStorage.clear();
    }
}

export default LocalStorageService;