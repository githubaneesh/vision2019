import cookie from 'react-cookies';

const USER_COOKIE_PATH: string = "/";
let _singleton: boolean = true;
let _instance: CookieService;

class CookieService {

    constructor(){
        if(_singleton){
            throw new SyntaxError('This is a singleton class. Please use CookieService.instance instead!');
        }
        // console.log(cookie.loadAll());       
    }

    static get instance(): CookieService{
        if (!_instance) {
            _singleton = false;
            _instance = new CookieService();
            _singleton = true;
        }
        return _instance;
    }

    saveUser(user: any) {
        for (let key of Object.keys(user)) {
            cookie.save(key, user[key], { path: USER_COOKIE_PATH});
        }
    }

    clearUser(user: any) {
        for (let key of Object.keys(user)) {
            cookie.remove(key, user[key], { path: USER_COOKIE_PATH});
        }
    }
    clearAll() {
        const allCookies = cookie.loadAll();
        for (let key of Object.keys(allCookies)) {
            cookie.remove(key, { path: USER_COOKIE_PATH});
        }
    }
    toggleTaskColumnVisibility(status) {
        cookie.save('TaskColumnVisibility', status, { path: USER_COOKIE_PATH });
    }
    getTaskColumnStatus() {
        const cookie_data: any = cookie.load('TaskColumnVisibility');
        return cookie_data === "true" || cookie_data === undefined;
    }

    get user(): any {
        const user = new Object();
        for (let key of Object.keys(user)) {
            const cookie_data: any = cookie.load(key);
            if (cookie_data) {
                user[key] = cookie_data;
            }
        }
        return user;
    }
}

export default CookieService;