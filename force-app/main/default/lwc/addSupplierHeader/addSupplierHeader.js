import { LightningElement,wire,api } from 'lwc';
import getDetails from '@salesforce/apex/GetUserDetails.getDetails';

export default class AddSupplierHeader extends LightningElement {
    _userFirstName
    @wire(getDetails) userDetails;

    buttonAction;
    
    get userName(){
        console.log(this.userDetails);
        if(this.userDetails!=null && this.userDetails.data!=null){
            return this.userDetails.data.Name;
        }
        else{
            return 'Bernard!';
        }
    }

    @api
    handleSumbit(){
        this.buttonAction="submit";
        let detailobj={buttonAction:this.buttonAction};
        this.dispatchEvent(new CustomEvent("handleheaderbtnclick",{detail:detailobj}));

    }
    @api
    handleSaveDraft(){  
        this.buttonAction="savedraft";
        let detailobj={buttonAction:this.buttonAction};
        this.dispatchEvent(new CustomEvent("handleheaderbtnclick",{detail:detailobj}));  
    }
}