import { LightningElement, api } from 'lwc';

import supplier_Obj from '@salesforce/schema/Supplier__c';
export default class VendorRegisteredDetailsComponent extends LightningElement {
  
    ObjApiname=supplier_Obj;
    @api recordId;
    // This will hold the record ID passed to the component

    // You can add more logic here as needed
}