import { LightningElement, api,wire } from 'lwc';
import getPendingApprovalSuppliers from '@salesforce/apex/SupplierApprovalController.getPendingApprovalSuppliers';
//import { CurrentPageReference } from 'lightning/navigation';
import { NavigationMixin,CurrentPageReference } from 'lightning/navigation';
export default class CustomeApprovalParent extends LightningElement {

    @api recordId;
    suppliers;


    @wire(CurrentPageReference)
    getStateParameters(currentPageReference) {
       if (currentPageReference) {  
            console.log("inside curentpagereferneceofapproval");
            console.log(currentPageReference);
            if(currentPageReference.state?.recordId!='' && currentPageReference.state?.recordId!= undefined){
                
                this.recordId = currentPageReference.state?.recordId;
                console.log("parent approver component "+this.recordId);
                }
          
         }
    }

    /*@wire(getPendingApprovalSuppliers)
    wiredSuppliers({ error, data }) {
        if (data) {
            this.suppliers = data;
            this.recordId=data[0].Id;
            console.log(data);
            console.log(this.recordId);
            console.log('****');
        } else if (error) {
            console.error('Error fetching suppliers:', error);
        }
    }*/

    
   // @wire(CurrentPageReference)
    //wiredPageReference({ data }) {
       // if (data) {
       //     this.recordId = data.page.attributes.recordId;
       // }
  //  }

}