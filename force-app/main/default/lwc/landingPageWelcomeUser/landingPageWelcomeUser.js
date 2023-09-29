import { LightningElement,wire } from 'lwc';
import getDetails from '@salesforce/apex/GetUserDetails.getDetails';

export default class LandingPageWelcomeUser extends LightningElement {

    _userFirstName
    @wire(getDetails) userDetails;
    
    get userFirstName(){
        console.log(this.userDetails);
        if(this.userDetails!=null && this.userDetails.data!=null){
            return this.userDetails.data.FirstName;
        }
        else{
            return 'Bernard!';
        }
    }
}
