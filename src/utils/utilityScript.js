import CryptoHelper from "./cryptohelper";
import path from 'path';
export class Utils {

    static twoDigit(c){
        return c>9?c:"0"+c;
    }
    static async queryParams(search){
		var obj = await this.getQueryObj(search);
		if(obj && (obj.q || obj.qt)){
			const decryptObj = CryptoHelper.decrypt(obj.q || obj.qt, process.env.NONCE);
			if (decryptObj.error) {
				return null;
			}
			return decryptObj.decryptedData[0];
		}
		return obj;

	}
	static async getQueryObj(search){
		if(!search){
			return null;
		}
		const decode = decodeURI(search)
		const query = decode.slice(1)
		var obj = {};
		var pairs = query.split('&');
		for(var i in pairs){
			var split = pairs[i].split('=');
			obj[decodeURIComponent(split[0])] = decodeURIComponent(split[1]);
		}
		return obj

	}
	static validiateRoutes(routes, path) {
		for(var i=0;i<routes.length;i++){
			const route = routes[i];
			if(path === `/${route}` || path.indexOf(route+"/") === 1){
			  return true;
			}
		  }
		return false;
	}
	static navigateTo (url: any){
			const { history } = this.props;
			history.push(url);
	}
	static addTimeStatp (name: string){
		console.log('file name', path.basename(name,path.extname(name)));
		console.log('extension name',  path.extname(name));
		return	path.basename(name,path.extname(name))+new Date().getTime()+path.extname(name);
		//	return 	name.replace('.',new Date().getTime()+'.') ;
	}
	static searchReplaceSpace(str){
		var reg = new RegExp("[ ]+","g");
		return str.replace(reg,"_");
	}


}

export default Utils;