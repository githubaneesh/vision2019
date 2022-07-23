import HttpService from "./httpservice";

let _singleton: boolean = true;
let _instance: ParticipantService;
export class ParticipantService {
    
    CREATE = "api/v1/participant/create";    
    GET_DISTRICTS = "api/v1/districts/get";
    GET_PARTICIPANTS = "api/v1/participant/get";
    GET_PARTICIPANTS_BY_FILTER="api/v1/participant/";
    DELETE_PARTICIPANT = "v/1/participant"
     

    constructor(){
        if(_singleton){
            throw new SyntaxError('This is a singleton class. Please use ParticipantService.instance instead!');
        }        
    }

    static get instance(): ParticipantService{
        if (!_instance) {
            _singleton = false;
            _instance = new ParticipantService();
            _singleton = true;
        }
        return _instance;
    }

    async create(participant){
        return await HttpService.instance.post(this.CREATE, participant);
    }
    async delete(participant){
        return await HttpService.instance.delete(this.DELETE, participant);
    }
    async getDistricts()
    {
        return await HttpService.instance.get(this.GET_DISTRICTS);
    }
    async getParticipants(token)
    {
        return await HttpService.instance.get(this.GET_PARTICIPANTS+'?token='+token);
    }
    async getParticipantsByFilter(distId,category,token){
        return await HttpService.instance.get(this.GET_PARTICIPANTS_BY_FILTER + distId+ '/'+ category  +'?token='+token);
    }

    
    async deleteParticipant(participantId,token){
        return await HttpService.instance.delete(this.DELETE_PARTICIPANT, participantId  );
    }
   
   /*  async getParticipantsByDist(distId,token)
    {
        return await HttpService.instance.get(this.GET_PARTICIPANTS_DISTRICT+ distId+'?token='+token);
    }
    async getParticipantsByCat(category,token)
    {
        return await HttpService.instance.get(this.GET_PARTICIPANTS_CATEGORY+category+'?token='+token);
    }*/

}
export default ParticipantService;