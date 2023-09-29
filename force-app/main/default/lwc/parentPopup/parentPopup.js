import { LightningElement, track } from 'lwc';

export default class ParentPopup extends LightningElement {
    @track showsuccessfulPopup=false;

    submitDetailsButtonClick() {
        // Show "ComponentB" when the button is clicked
        this.showsuccessfulPopup = true;
    }

    
}