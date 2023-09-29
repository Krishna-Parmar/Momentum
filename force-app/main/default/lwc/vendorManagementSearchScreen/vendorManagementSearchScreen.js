import { LightningElement,api, track } from 'lwc';
import getsupplierDetails from '@salesforce/apex/vendorscreen.getsupplierDetails';
import { NavigationMixin } from 'lightning/navigation';

const columns = [
    { label: 'Id', fieldName: 'Id' },
	{ label: 'Supplier Name', fieldName: 'SupplierName' ,type:"text"},
	{ label: 'Supplier Email', fieldName: 'SupplierEmail', type:"text" },
	{ label: 'Registerd Business Name', fieldName: 'RegisterdBusinessName', type:"text" },
];

export default class vendorManagementSearchScreen extends NavigationMixin(LightningElement)  {
    columns=columns;    
    @api mysearchvalue;
    @api searchKey;
    tabledata;
    tabledata1;
    @track supplier__c;
    @track shouldDisplayData=false;
    @track showDiv= false;
    @track count=0;
    
    handelSearchKey(event){
        this.mysearchvalue = event.target.value;
        console.log("This is handlesearchkey with value " +this.mysearchvalue );
        this.handleRecordSearch();
    }
    
    handleRecordSearch(){
            if (this.mysearchvalue !== '') {
            
            getsupplierDetails({                
                searchkey: this.mysearchvalue
            })
                .then(result => {
                    if(result != ''){
                        this.shouldDisplayData=true;
                    }
                    else{
                        this.shouldDisplayData=false;
                    }
                    console.log(result);
                   this.count=result.length;
                   console.log('result ' +result.length)
                    this.tabledata= result.map(item=>{
                        console.log("item = "+item);
                       // this.count++;
                       let showbutton=item.Draft_Status__c == "InDraft"?true:false;
                        return { Id: item.Id,
                            SupplierName:item.Name,
                            SupplierEmail :item.Supplier_Email__c, 
                            RegisterdBusinessName  : item.Registered_Business_Name__c,
                            DraftStatus : item.Draft_Status__c,
                            showRequestCorrectionButton: showbutton                         
                        }
                    });                                    
                    console.log(JSON.stringify(this.tabledata));
                                        
                })
                .catch(error => {
                    this.Supplier__c = null;
                });
        }   
    }
    handleAddSupplier() {
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: '/add-supplier'
            }
        });
    }

    handleRequestCorrection(event){
        console.log(this);
        console.log(event.target.getAttribute('btnrecordid'));
        console.log(event.detail);
        console.log(event);
        const btnrecordid=event.target.getAttribute('btnrecordid');
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: '/add-supplier?recordId='+btnrecordid
            }
        });
    }

    handleViewSupplierDetails(event){
        const btnrecordid=event.target.getAttribute('btnrecordid');
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: '/view-details-page?recordId='+btnrecordid
            }
        });
    }

}