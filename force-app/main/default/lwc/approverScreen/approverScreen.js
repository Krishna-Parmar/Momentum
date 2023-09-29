import { LightningElement, api,wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import NAME_FIELD from '@salesforce/schema/Supplier__c.Name';
import SUPPLIER_EMAIL_FIELD from '@salesforce/schema/Supplier__c.Supplier_Email__c';
import SELECT_FIELD from '@salesforce/schema/Supplier__c.Select__c';
import COMPANY_REG_NUM from "@salesforce/schema/Supplier__c.Company_Registration_Number__c";
import Holding_Company_Group_Name from "@salesforce/schema/Supplier__c.Holding_Company_Group_Name__c";
import Registered_Business_Name from "@salesforce/schema/Supplier__c.Registered_Business_Name__c";
import Select_the_Supplier_Type from "@salesforce/schema/Supplier__c.Select__c";
import IsRegistered_VAT from "@salesforce/schema/Supplier__c.Registered_for_VAT__c";
import VAT_Reg_Number from "@salesforce/schema/Supplier__c.VAT_Registration_Number__c";
import Supplier_ID_Number from "@salesforce/schema/Supplier__c.Supplier_ID_Number__c";
import Commodity_Type from "@salesforce/schema/Supplier__c.Commodity_Type__c";
import Cost_Centre from "@salesforce/schema/Supplier__c.Cost_Center__c";
import Estimate_Amount from "@salesforce/schema/Supplier__c.Estimated_Contract_Amount_ZAR__c";
import Req_Type from "@salesforce/schema/Supplier__c.Request_Type__c";
import { NavigationMixin,CurrentPageReference } from 'lightning/navigation';


export default class ApproverScreen extends LightningElement {
    @api supplier;
    @api recordId;

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

    @wire(getRecord, {
        recordId: '$recordId',
        fields: [NAME_FIELD, SUPPLIER_EMAIL_FIELD, SELECT_FIELD,COMPANY_REG_NUM,Holding_Company_Group_Name,
            Registered_Business_Name,Select_the_Supplier_Type,IsRegistered_VAT,VAT_Reg_Number,Supplier_ID_Number,
            Commodity_Type,Cost_Centre,Estimate_Amount,Req_Type]
    }) supplierRecord;

    get name() {
        return getFieldValue(this.supplierRecord.data, NAME_FIELD);
    }

    get supplierEmail() {
        return getFieldValue(this.supplierRecord.data, SUPPLIER_EMAIL_FIELD);
    }

    get companyRegNum() {
        return getFieldValue(this.supplierRecord.data, COMPANY_REG_NUM);
    }


    get companyGrpName() {
        return getFieldValue(this.supplierRecord.data, Holding_Company_Group_Name);
    }

    get regBussName() {
        return getFieldValue(this.supplierRecord.data, Registered_Business_Name);
    }

    get supplierType() {
        return getFieldValue(this.supplierRecord.data, Select_the_Supplier_Type);
    }

    get isReg() {
        return getFieldValue(this.supplierRecord.data, IsRegistered_VAT);
    }

    get vatRegNum() {
        return getFieldValue(this.supplierRecord.data, VAT_Reg_Number);
    }

    get supplierIDNum() {
        return getFieldValue(this.supplierRecord.data, Supplier_ID_Number);
    }

    get reqType() {
        return getFieldValue(this.supplierRecord.data, Req_Type);
    }

    get commoType() {
        return getFieldValue(this.supplierRecord.data, Commodity_Type);
    }

    get costCentre() {
        return getFieldValue(this.supplierRecord.data, Cost_Centre);
    }

    get estAmt() {
        return getFieldValue(this.supplierRecord.data, Estimate_Amount);
    }
   
}