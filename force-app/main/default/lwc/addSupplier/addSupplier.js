import { LightningElement, track ,api } from 'lwc';
import SUPPLIER_OBJECT from "@salesforce/schema/Supplier__c"
import Supplier_Name from "@salesforce/schema/Supplier__c.Name"
import Supplier_Email from "@salesforce/schema/Supplier__c.Supplier_Email__c"
import Company_Registration_Number from "@salesforce/schema/Supplier__c.Company_Registration_Number__c"
import Holding_Company_Group_Name from "@salesforce/schema/Supplier__c.Holding_Company_Group_Name__c"
import Registered_Business_Name from "@salesforce/schema/Supplier__c.Registered_Business_Name__c"
import Select_the_Supplier_Type from "@salesforce/schema/Supplier__c.Select__c"
import addNewSupplier from '@salesforce/apex/addNewSupplier.addNewSupplier';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import Select_the_Supplier_Type__picklist from "@salesforce/schema/Supplier__c.Select__c"
 
 
export default class AddSupplier extends LightningElement {
        objectApiName=SUPPLIER_OBJECT;
        @track fields =[Supplier_Name,Supplier_Email,Company_Registration_Number];
        @track SupplierDetails={
              SupplierName:Supplier_Name,        
              SupplierEmail:Supplier_Email,
              CompanyRegistrationNumber:Company_Registration_Number,
              HoldingCompany_GroupName :Holding_Company_Group_Name,
              RegisterdBusinessName :Registered_Business_Name,
              SelectTheSupplierType:Select_the_Supplier_Type
            };
   
            Supplier_NameChangeHandler(event){          
            this.SupplierDetails.SupplierName=event.target.value;
        }
   
        Supplier_EmailChangeHandler(event){
         this.SupplierDetails.SupplierEmail=event.target.value;  
        }
   
        Company_Registration_NumberChangeHandler(event){
            this.SupplierDetails.CompanyRegistrationNumber=event.target.value;
        }
        HoldingCompany_GroupNameChangeHandler(event){
            this.SupplierDetails.HoldingCompany_GroupName=event.target.value;
        }
        RegisterdBusinessNameChangeHandler(event){
            this.SupplierDetails.RegisterdBusinessName=event.target.value;
        }
        SelectTheSupplierTypeChangeHandler(event){
            this.SupplierDetails.SelectTheSupplierType=event.target.value;
        }
   
        handleClick()
        {
                       
            addNewSupplier({
                SName:this.SupplierDetails.SupplierName,
                SEmail:this.SupplierDetails.SupplierEmail,
                SCompanyRegistrationNumber:this.SupplierDetails.CompanyRegistrationNumber,
                SHoldingCompanyGroupName:this.SupplierDetails.HoldingCompany_GroupName,
                SRegisterdBusinessName:this.SupplierDetails.RegisterdBusinessName,
                S_SelectTheSupplierType:this.SupplierDetails.SelectTheSupplierType
 
            })
            .then(result => {
                const event = new ShowToastEvent({
                    title: 'Supplier Registered',
                    message: 'New Supplier '+ this.SupplierDetails.SupplierName +' created.',
                    variant: 'success'
                });
                this.dispatchEvent(event);
            })
            .catch(error => {
                const event = new ShowToastEvent({
                    title : 'Error',
                    message : 'Error creating contact. Please Contact System Admin',
                    variant : 'error'
                });
                this.dispatchEvent(event);
            });
   
        }
   
    }
