import { LightningElement,track,api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import approveRecord from '@salesforce/apex/SupplierApprovalController.approveRecord';
import rejectRecord from '@salesforce/apex/SupplierApprovalController.rejectRecord';
import requestCorrection from '@salesforce/apex/SupplierApprovalController.requestCorrection';
import ToastContainer from 'lightning/toastContainer';
import { NavigationMixin } from 'lightning/navigation';

export default class CustomApprovalComponent extends NavigationMixin(LightningElement)   {
    @api recordId;

    @track textValue = '';

    connectedCallback() {
        const toastContainer = ToastContainer.instance();
        toastContainer.maxShown = 5;
        toastContainer.toastPosition = 'top-center';
    }
    

    handleTextChange(event) {
        this.textValue = event.target.value;
    }
    
    @track selectedOption = '';
    handleOptionChange(event) {
        this.selectedOption = event.target.value;
    }

    handleSaveSubmit(event){
        console.log('Submit Button Click ');
        console.log(this.textValue);
        console.log(this.selectedOption);
        if(this.selectedOption=="approve"){
        
            approveRecord({ recordId: this.recordId,  msg:this.textValue })
            .then(() => {
                this.showSuccessToast('Record Approved', 'The record has been approved.');
            })
            .catch(error => {
                this.showErrorToast('Error', error.body.message);
            });
        }
        else if(this.selectedOption=="reject"){
            rejectRecord({ recordId: this.recordId, msg:this.textValue })
                .then(() => {
                    this.showSuccessToast('Record Rejected', 'The record has been rejected.');
                })
                .catch(error => {
                    this.showErrorToast('Error', error.body.message);
                });
        }
        else if(this.selectedOption=="request"){
            requestCorrection({ recordId: this.recordId, msg:this.textValue })
                .then(() => {
                    this.showSuccessToast('Record requested for correction', 'The record has been sent for correction.');
                })
                .catch(error => {
                    this.showErrorToast('Error', error.body.message);
                });
        }

        console.log("inside submitdetailsbuttonclick1");

        this[NavigationMixin.Navigate]({

            type: 'standard__webPage',

            attributes: {

                url: '/'

            }

        });



    }


    handleSaveDraft(event){
        console.log('Draft Button Click ');
        console.log(this.textValue);
        console.log(this.selectedOption);
    }

    showSuccessToast(title, message) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: 'success',
        });
        this.dispatchEvent(evt);
    }

    showErrorToast(title, message) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: 'error',
        });
        this.dispatchEvent(evt);
    }

}