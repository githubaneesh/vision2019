import Biodata from "./biodata";
import ShortFilm from "./biodata";
import Synopsis from "./synopsis";

class Participant {
        name
        gender
        age
        mobile
        dob
        email
        district
        address
        biodata = new Biodata()
        category
        shortfilm=  new ShortFilm()
        shortfilm_synopsis= new Synopsis()
        i_agree =false;       
    
}
export default Participant;