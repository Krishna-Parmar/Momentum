import { LightningElement,wire } from 'lwc';
import getDetails from '@salesforce/apex/GetUserDetails.getDetails';

export default class AddApprovalHeader extends LightningElement {

    _userFirstName
    @wire(getDetails) userDetails;
    
    get userName(){
        console.log(this.userDetails);
        if(this.userDetails!=null && this.userDetails.data!=null){
            return this.userDetails.data.Name;
        }
        else{
            return 'Bernard!';
        }
    }
}