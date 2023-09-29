import { LightningElement,wire } from 'lwc';
import getPendingApprovalRequest from '@salesforce/apex/ListOfPendingRequestController.getPendingApprovalRequest';
import { NavigationMixin } from 'lightning/navigation';

const actions = [
    { label: 'Show details', name: 'show_details' },
   // { label: 'Delete', name: 'delete' }
];
const columns = [
 
    { label: 'Name', fieldName: 'Name' },
   
    { label: 'Supplier ID Number', fieldName: 'Supplier_ID_Number__c'},
    { label: 'Email', fieldName: 'Supplier_Email__c'},
    { label: 'Requested  Date', fieldName: 'Requested_Date__c' },
    { label: 'Status', fieldName: 'Status__c'},
    //{ type: 'action', typeAttributes: { rowActions: actions, menuAlignment: 'left' } },

    {
        label: 'Action',
        type: 'button',
        initialWidth: 120, // Adjust the width as needed
        typeAttributes: {
        label: 'View',
        name: 'viewbutton', // Identify the button
        title: 'Click to perform an action',
        //url: '/approverpage',
        //target: '_blank', 
        variant: 'brand', // You can use other variants like 'brand' or 'destructive'
    }}
];



export default class ListOfPendingRequest extends NavigationMixin(LightningElement) {

    records;
    columns = columns;
    @wire(getPendingApprovalRequest)
    wiredRecords({ error, data }) {
        if (data) {
            this.records = data;
        } else if (error) {
            console.error(error);
        }
    }

    handleRowAction(event) {
        console.log(event.detail);
        console.log(event.detail.row);
        const action = event.detail.action;
        const row = event.detail.row;
       
               if (action.name === 'viewbutton') {

          
             this[NavigationMixin.Navigate]({
                    type: 'standard__webPage',
                    attributes: {
                       url: '/pending-requests/?recordId='+row.Id,
                    }
             });    

        }

}}