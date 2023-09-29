import { LightningElement,track ,api} from 'lwc';
export default class successfulPopupLWC extends LightningElement {
    //Boolean tracked variable to indicate if modal is open or not default value is false as modal is closed when page is loaded 
    @track isModalOpen = false;

    @api
    openModal() {
        // to open modal set isModalOpen tarck value as true
        this.isModalOpen = true;
    }

    @api
    closeModal() {
        // to close modal set isModalOpen tarck value as false
        this.isModalOpen = false;
    }

    @api
    submitDetails() {
        // to close modal set isModalOpen tarck value as false
        //Add your code to call apex method or do some processing
         // Trigger an event to signal that "ComponentB" should be displayed
         const event = new CustomEvent('yesbuttonclick1');
         this.dispatchEvent(event);
        this.isModalOpen = false;
    }

    
}