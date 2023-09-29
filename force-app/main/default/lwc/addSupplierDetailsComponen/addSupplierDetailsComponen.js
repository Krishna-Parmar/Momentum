import { LightningElement, track ,api,wire } from 'lwc';
import SUPPLIER_OBJECT from "@salesforce/schema/Supplier__c"
//Supplier Details
import Supplier_Name from "@salesforce/schema/Supplier__c.Name"
import Supplier_Email from "@salesforce/schema/Supplier__c.Supplier_Email__c"
import Company_Registration_Number from "@salesforce/schema/Supplier__c.Company_Registration_Number__c"
import Holding_Company_Group_Name from "@salesforce/schema/Supplier__c.Holding_Company_Group_Name__c"
import Registered_Business_Name from "@salesforce/schema/Supplier__c.Registered_Business_Name__c"
import Select_the_Supplier_Type from "@salesforce/schema/Supplier__c.Select__c"
import addNewSupplier from '@salesforce/apex/AddSupplier.addNewSupplier'
import insertAllSupplierDetails from '@salesforce/apex/AddSupplier.insertAllSupplierDetails'
//VAT Details
import IsRegistered_VAT from "@salesforce/schema/Supplier__c.Registered_for_VAT__c"
import VAT_Reg_Number from "@salesforce/schema/Supplier__c.VAT_Registration_Number__c"
import Supplier_ID_Number from "@salesforce/schema/Supplier__c.Supplier_ID_Number__c"
import addVATDetails from '@salesforce/apex/AddSupplier.addVATDetails'
//Request Overview
import Commodity_Type from "@salesforce/schema/Supplier__c.Commodity_Type__c"
import Cost_Centre from "@salesforce/schema/Supplier__c.Cost_Center__c"
import Estimate_Amount from "@salesforce/schema/Supplier__c.Estimated_Contract_Amount_ZAR__c"
import Req_Type from "@salesforce/schema/Supplier__c.Request_Type__c"
import addReqOverview from '@salesforce/apex/AddSupplier.addReqOverview';
import updateSupplierDraftStatus from '@salesforce/apex/AddSupplier.updateSupplierDraftStatus';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import Select_the_Supplier_Type__picklist from "@salesforce/schema/Supplier__c.Select__c"
import template1 from './addSupplierDetailsComponen.html';
import template2 from './addVATDetailsComponent.html';
import template3 from './addRequestOverviewDetailsComponent.html';
import ToastContainer from 'lightning/toastContainer';
import { NavigationMixin,CurrentPageReference } from 'lightning/navigation';
import { getRecord,getFieldValue } from "lightning/uiRecordApi";

//getrecords
import NAME_FIELD from '@salesforce/schema/Supplier__c.Name';
import SUPPLIER_EMAIL_FIELD from '@salesforce/schema/Supplier__c.Supplier_Email__c';
import SELECT_FIELD from '@salesforce/schema/Supplier__c.Select__c';
import COMPANY_REG_NUM from "@salesforce/schema/Supplier__c.Company_Registration_Number__c";
import Holding_Company_Group_Name1 from "@salesforce/schema/Supplier__c.Holding_Company_Group_Name__c";
import Registered_Business_Name1 from "@salesforce/schema/Supplier__c.Registered_Business_Name__c";
import Select_the_Supplier_Type1 from "@salesforce/schema/Supplier__c.Select__c";
import IsRegistered_VAT1 from "@salesforce/schema/Supplier__c.Registered_for_VAT__c";
import VAT_Reg_Number1 from "@salesforce/schema/Supplier__c.VAT_Registration_Number__c";
import Supplier_ID_Number1 from "@salesforce/schema/Supplier__c.Supplier_ID_Number__c";
import Commodity_Type1 from "@salesforce/schema/Supplier__c.Commodity_Type__c";
import Cost_Centre1 from "@salesforce/schema/Supplier__c.Cost_Center__c";
import Estimate_Amount1 from "@salesforce/schema/Supplier__c.Estimated_Contract_Amount_ZAR__c";
import Req_Type1 from "@salesforce/schema/Supplier__c.Request_Type__c";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;




export default class AddSupplierDetailsComponen extends NavigationMixin(LightningElement) {
	
	@api pageName;
    validFlag=false;
    @api recordId;

    
    

    connectedCallback() {
        const toastContainer = ToastContainer.instance();
        toastContainer.maxShown = 5;
        toastContainer.toastPosition = 'top-center';
    }

    render(){
        if(this.pageName=="supplierdetails")
        {
            return template1;
        }
       else if(this.pageName=="vatdetails"){
            return template2;
        }
        else if(this.pageName="requestdetails"){
            return template3;
        }
        else{
            return template1;
        }
        
    }

    //value to hold the draft status
    @track draftStatus='InDraft';
	
    //supplier details
    @track SupplierName='';
    @track SupplierEmail='';
    @track CompanyRegistrationNumber='';
    @track HoldingCompany_GroupName='';
    @track RegisterdBusinessName='';
    @track selectedSupplierType = '';

    //VAT Details
    @track IsRegistered='';
    @track VATRegNum='';
    @track SupplierIDNum='';

    //Req Overview
    @track CommodityType='';
    @track CostCentre='';
    @track EstimateAmount='';
    @track ReqType='';

    error;

            @wire(CurrentPageReference)
            getStateParameters(currentPageReference) {
            if (currentPageReference) {  
                    console.log("inside curentpagerefernece addsuppliercomp");
                    console.log(currentPageReference);
                    if(currentPageReference.state?.recordId!='' && currentPageReference.state?.recordId!= undefined){
                        this.recordId = currentPageReference.state?.recordId;
                        }
                
                }
            }

            @wire(getRecord, { recordId: "$recordId", fields: [NAME_FIELD, SUPPLIER_EMAIL_FIELD, SELECT_FIELD,COMPANY_REG_NUM,Holding_Company_Group_Name1,
                Registered_Business_Name1,Select_the_Supplier_Type1,IsRegistered_VAT1,VAT_Reg_Number1,Supplier_ID_Number1,
                Commodity_Type1,Cost_Centre1,Estimate_Amount1,Req_Type1] })
            wiredSupplier({ error, data }) {
                console.log(data);
                console.log(error);
            if (data) {
                    // this.record = data;
                    this.SupplierName=getFieldValue(data, NAME_FIELD);
                    this.SupplierEmail=getFieldValue(data, SUPPLIER_EMAIL_FIELD);
                    this.CompanyRegistrationNumber=getFieldValue(data, COMPANY_REG_NUM);
                    this.HoldingCompany_GroupName=getFieldValue(data, Holding_Company_Group_Name1);
                    this.RegisterdBusinessName=getFieldValue(data, Registered_Business_Name1);
                    this.selectedSupplierType=getFieldValue(data, Select_the_Supplier_Type1);
                    this.IsRegistered=getFieldValue(data, IsRegistered_VAT1);
                    console.log("after isregister wire "+this.IsRegistered);
                    console.log(data);
                    this.VATRegNum=getFieldValue(data, VAT_Reg_Number1);
                    this.SupplierIDNum=getFieldValue(data, Supplier_ID_Number1);
                    
                    this.CommodityType=getFieldValue(data, Commodity_Type1);
                    this.CostCentre=getFieldValue(data, Cost_Centre1);
                    this.EstimateAmount=getFieldValue(data, Estimate_Amount1);
                    this.ReqType=getFieldValue(data, Req_Type1);

                    this.error = undefined;
                } 
        }


    get supplierType(){
        return[
            {label : 'PSP-Company', value: 'PSP-Company'},
            {label : 'PSP', value: 'PSP'},
        ];
    }

    get selectedPicklistValue_PSP_Company(){
        console.log("inside getter selectedPicklistValue_PSP_Company"+ this.selectedSupplierType);
        return this.selectedSupplierType=="PSP-Company"?true:false;
    }

    get selectedPicklistValue_PSP(){
        return this.selectedSupplierType=="PSP"?true:false;
    }
 
 
    get isRegVat(){
        return[
           
            {label : 'Yes', value: 'Yes'},
            {label : 'No', value: 'No'},
        ];
    }
 
 
 
    get requtype(){
        return[
           
            {label : 'RFP-Contract', value: 'RFP-Contract'},
            {label : 'CRP-Contract', value: 'CRP-Contract'},
        ];
    }
 
    get commodType(){
        return[
           
            {label : 'Catering_and_Hospitality', value: 'Catering_and_Hospitality'},
           
        ];
    }
 
 
    get RelCost(){
        return[
           
            {label : '10224819- Group Technologies', value: '10224819- Group Technologies'},
        ];
    }
   

   
        @track SupplierDetails={
            //supplier details
              SupplierName:Supplier_Name,        
              SupplierEmail:Supplier_Email,
              CompanyRegistrationNumber:Company_Registration_Number,
              HoldingCompany_GroupName :Holding_Company_Group_Name,
              RegisterdBusinessName :Registered_Business_Name,
              SelectTheSupplierType:Select_the_Supplier_Type,
              // VAT Details
              IsRegistered:IsRegistered_VAT,
              VATRegNum:VAT_Reg_Number,
              SupplierIDNum:Supplier_ID_Number,
              //Req Overview
              ReqType:Req_Type,
              CommodityType:Commodity_Type,
              CostCentre:Cost_Centre,
              EstimateAmount:Estimate_Amount
            };

        
        //Handlers for Supplier Details 
         Supplier_NameChangeHandler(event){
            this.SupplierName=event.target.value;
        }
        Supplier_EmailChangeHandler(event){
         this.SupplierEmail=event.target.value;  
        }
        Company_Registration_NumberChangeHandler(event){
            this.CompanyRegistrationNumber=event.target.value;
        }
        HoldingCompany_GroupNameChangeHandler(event){
            this.HoldingCompany_GroupName=event.target.value;
        }
        RegisterdBusinessNameChangeHandler(event){
            this.RegisterdBusinessName=event.target.value;
        }
        SelectTheSupplierTypeChangeHandler(event){
            this.selectedSupplierType=event.target.value;
        }


        // Handlers for VAT Details

        IsRegisteredVATChangeHandler(event){
            this.IsRegistered=event.target.value;
        }
        VATRegNumberChangeHandler(event){
            this.VATRegNum=event.target.value;
        }
        SupplierIDNumberChangeHandler(event){
            this.SupplierIDNum=event.target.value;
        }


        //Handlers for Req Overview

        RequestTypeChangeHandler(event){
            this.ReqType=event.target.value;
        }
        CommodityTypeChangeHandler(event){
            this.CommodityType=event.target.value;
        }
        RelevantCostCentreChangeHandler(event){
            this.CostCentre=event.target.value;
        }
        EstimatedContractAmountChangeHandler(event){
            this.EstimateAmount=event.target.value;
        }
        
      @api
      handleValidationPage1(){
        this.validFlag=false;
        console.log("before handleValidationPage1 : "+this.validFlag);
        this.handleClick();
        console.log("after handleValidationPage1 : "+this.validFlag);
        return this.validFlag;
      }

      @api
      handleValidationPage2(){
        this.validFlag=false;
        console.log("before handleValidationPage2 : "+this.validFlag);
        this.VAThandleNEXTClick();
        console.log("after handleValidationPage2 : "+this.validFlag);
        return this.validFlag;
      }

      @api
      handleValidationPage3(){
        console.log("before handleValidationPage3 : "+this.validFlag);
        this.validFlag=false;
        this.REQhandleSubmitClick();
        console.log("after handleValidationPage3 : "+this.validFlag);
        return this.validFlag;
      }

      @api
      handleApexSubmitDetailsPublicMethod(){
        if(this.validFlag){
            this.draftStatus='Complete';
            this.handleApexSubmitAllDetails();
        }
        else{
            const event = new ShowToastEvent({
                title: 'Submitting record details',
                message: 'Please fill all the mandatory fields',
                variant: 'warning',
                
            });
            this.dispatchEvent(event);
        }
      }

      @api
      handleApexSaveDraftDetailsPublicMethod(){
        if(this.validFlag){
            this.draftStatus='InDraft';
            this.handleApexSubmitAllDetails();
        }
        else{
            const event = new ShowToastEvent({
                title: 'Saving Draft',
                message: 'Please fill all the mandatory fields',
                variant: 'warning',
                
            });
            this.dispatchEvent(event);
        }

      }

      handleApexSubmitAllDetails(){
        // Call the backend data storage function with the selected value
        // this.draftStatus='Complete';
        if(!(this.recordId!=''&& this.recordId!=undefined && this.recordId!= null)){
                insertAllSupplierDetails({


                    //draft status
                    //request details
                    ReqReqType:this.ReqType,
                    ReqCommodityType:this.CommodityType,
                    ReqCostCentre:this.CostCentre,
                    ReqEstimateAmount:this.EstimateAmount,

                    //supplier
                    SName:this.SupplierName,
                    SEmail:this.SupplierEmail,
                    SCompanyRegistrationNumber:this.CompanyRegistrationNumber,
                    SHoldingCompanyGroupName:this.HoldingCompany_GroupName,
                    SRegisterdBusinessName:this.RegisterdBusinessName,
                    S_SelectTheSupplierType:this.selectedSupplierType,

                    //VAT
                    VIsReg:this.IsRegistered,
                    VRegNum:this.VATRegNum,
                    VSupplierID:this.SupplierIDNum,
                    draftStatus:this.draftStatus
                })

                    .then(result => {
                        
                        console.log(result);
                        console.log(result.Id);
                        this.recordId=result.Id;
                        // this is for uploading file attachment.
                        this.template.querySelector("c-file-attachment-component").handleFileAttachClick(this.recordId);

                        const event = new ShowToastEvent({
                            title: 'Supplier Details',
                            message: 'Supplier Details added successfully',
                            variant: 'success',
                            
                        });
                        this.dispatchEvent(event);
                        // if(this.draftStatus=="Complete"){
                        // //navigate to vendor management screen
                        // // setTimeout(() => {
                        //     console.log("inside set timeout");
                        //     this[NavigationMixin.Navigate]({
                        //         type: 'standard__webPage',
                        //         attributes: {
                        //             url: '/vendormanagement'
                        //         }
                        //       });
                        //     // }, 350);
                        // }


                    })

                    .catch(error => {
                        const event = new ShowToastEvent({
                            title: 'Error',
                            message: 'Error while submitting supplier details. Please check your details',
                            variant: 'error'
                        });
                        this.dispatchEvent(event);

                    });
        }
        else{
            updateSupplierDraftStatus({
                    recordId:this.recordId,
                    ReqReqType:this.ReqType,
                    ReqCommodityType:this.CommodityType,
                    ReqCostCentre:this.CostCentre,
                    ReqEstimateAmount:this.EstimateAmount,

                    //supplier
                    SName:this.SupplierName,
                    SEmail:this.SupplierEmail,
                    SCompanyRegistrationNumber:this.CompanyRegistrationNumber,
                    SHoldingCompanyGroupName:this.HoldingCompany_GroupName,
                    SRegisterdBusinessName:this.RegisterdBusinessName,
                    S_SelectTheSupplierType:this.selectedSupplierType,

                    //VAT
                    VIsReg:this.IsRegistered,
                    VRegNum:this.VATRegNum,
                    VSupplierID:this.SupplierIDNum,
                    draftStatus:this.draftStatus
                })
                .then(result => {
                    // this is for uploading file attachment.
                    this.template.querySelector("c-file-attachment-component").handleFileAttachClick(this.recordId);
                    const event = new ShowToastEvent({
                        title: 'Supplier Registered',
                        message: 'New Supplier registered successfully',
                        variant: 'success'
                    });
                    this.dispatchEvent(event);
                })

            .catch(error => {
                const event = new ShowToastEvent({
                    title: 'Error',
                    message: 'Error saving details. Please check details ',
                    variant: 'error'
                });
                this.dispatchEvent(event);
            });

        }
        
      }


      handleApexSubmitDetails(){
        // Call the backend data storage function with the selected value
        addNewSupplier({
            SName:this.SupplierName,
            SEmail:this.SupplierEmail,
            SCompanyRegistrationNumber:this.CompanyRegistrationNumber,
            SHoldingCompanyGroupName:this.HoldingCompany_GroupName,
            SRegisterdBusinessName:this.RegisterdBusinessName,
            S_SelectTheSupplierType:this.selectedSupplierType
        })

            .then(result => {
                const event = new ShowToastEvent({
                    title: 'Supplier Registered',
                    message: 'New Supplier registered successfully',
                    variant: 'success',
                    actions: [{ label: 'Click Here', name: 'View Details' }]
                });
                this.dispatchEvent(event);
            })

            .catch(error => {
                const event = new ShowToastEvent({
                    title: 'Error',
                    message: 'Error saving details. Please check details ',
                    variant: 'error'
                });
                this.dispatchEvent(event);
            });

            addVATDetails({
                VIsReg:this.IsRegistered,
                VRegNum:this.VATRegNum,
                VSupplierID:this.SupplierIDNum
            })

                .then(result => {
                    const event = new ShowToastEvent({
                        title: 'Details Saved',
                        message: 'VAT Details saved successfully',
                        variant: 'success',
                        
                    });
                    this.dispatchEvent(event);
                })

                .catch(error => {
                    const event = new ShowToastEvent({
                        title: 'Error',
                        message: 'Error! saving VAT Details. Please check your Details',
                        variant: 'error'
                    });
                    this.dispatchEvent(event);
                });

                addVATDetails({
                    VIsReg:this.IsRegistered,
                    VRegNum:this.VATRegNum,
                    VSupplierID:this.SupplierIDNum
                })

                    .then(result => {
                        const event = new ShowToastEvent({
                            title: 'Details Saved',
                            message: 'VAT Details saved successfully',
                            variant: 'success',
                            
                        });
                        this.dispatchEvent(event);
                    })

                    .catch(error => {
                        const event = new ShowToastEvent({
                            title: 'Error',
                            message: 'Error! saving VAT Details. Please check your Details',
                            variant: 'error'
                        });
                        this.dispatchEvent(event);
                    });

                    // Call the backend data storage function with the selected value
                addReqOverview({
                    ReqReqType:this.ReqType,
                    ReqCommodityType:this.CommodityType,
                    ReqCostCentre:this.CostCentre,
                    ReqEstimateAmount:this.EstimateAmount,

                    //supplier
                    SName:this.SupplierName,
                    SEmail:this.SupplierEmail,
                    SCompanyRegistrationNumber:this.CompanyRegistrationNumber,
                    SHoldingCompanyGroupName:this.HoldingCompany_GroupName,
                    SRegisterdBusinessName:this.RegisterdBusinessName,
                    S_SelectTheSupplierType:this.selectedSupplierType,

                    //VAT
                    VIsReg:this.IsRegistered,
                    VRegNum:this.VATRegNum,
                    VSupplierID:this.SupplierIDNum
                })

                    .then(result => {
                        const event = new ShowToastEvent({
                            title: 'Overview Complete',
                            message: 'Request Overview Done',
                            variant: 'success',
                            
                        });
                        this.dispatchEvent(event);
                    })

                    .catch(error => {
                        const event = new ShowToastEvent({
                            title: 'Error',
                            message: 'Overview not complete. Please check your details',
                            variant: 'error'
                        });
                        this.dispatchEvent(event);

                    });

      }

        // HandleClick For Supplier Details
            handleClick() {
                console.log("inside handleclick page1");

                if (!this.SupplierName) {
                    console.log("supplier name is empty");
                    // Show an error message if the Supplier Name is not Entered
                    const event = new ShowToastEvent({
                        title: 'Error',
                        message: 'Please Enter Supplier Name',
                        variant: 'error'
                    });
                    this.dispatchEvent(event);
                    return;
                }

                if (!this.SupplierEmail) {
                    // Show an error message if the Supplier Email is not Provided
                    const event = new ShowToastEvent({
                        title: 'Error',
                        message: 'Please Enter Email',
                        variant: 'error'
                    });
                    this.dispatchEvent(event);
                    return;
                }
                if (!emailRegex.test(this.SupplierEmail)) {
                    // Show an error message if the email is not in a valid format
                    const event = new ShowToastEvent({
                        title: 'Error',
                        message: 'Please enter Email in valid format',
                        variant: 'error'
                    });
                    this.dispatchEvent(event);
                    return;
                }

                if (!this.CompanyRegistrationNumber) {
                    // Show an error message if the Company Registration is not Provided
                    const event = new ShowToastEvent({
                        title: 'Error',
                        message: 'Please Enter Registration Number',
                        variant: 'error'
                    });
                    this.dispatchEvent(event);
                    return;
                }

                if (!this.HoldingCompany_GroupName) {
                    // Show an error message if the Holdong Company Name is not Provided
                    const event = new ShowToastEvent({
                        title: 'Error',
                        message: 'Please Enter Holding Company/Group Name',
                        variant: 'error'
                    });
                    this.dispatchEvent(event);
                    return;
                }

                if (!this.RegisterdBusinessName) {
                    // Show an error message if the Registered Business Name is not Provided.
                    const event = new ShowToastEvent({
                        title: 'Error',
                        message: 'Please Enter Registered Business Name',
                        variant: 'error'
                    });
                    this.dispatchEvent(event);
                    return;
                }


                if (!this.selectedSupplierType) {
                    // Show an error message if the picklist value is not selected
                    const event = new ShowToastEvent({
                        title: 'Error',
                        message: 'Please select a Supplier Type',
                        variant: 'error'
                    });
                    this.dispatchEvent(event);
                    return;
                }
                this.validFlag=true;                
            }

        // VAThandleNEXTClick For VAT Details
            VAThandleNEXTClick() {

                if (!this.IsRegistered) {
                    // Show an error message if the Supplier not Select option
                    const event = new ShowToastEvent({
                        title: 'Error',
                        message: 'Please select Registered for VAT option',
                        variant: 'error'
                    });
                    this.dispatchEvent(event);
                    return;
                }

                if (!this.VATRegNum) {
                    // Show an error message if the Supplier not Provided Reg No
                    const event = new ShowToastEvent({
                        title: 'Error',
                        message: 'Please Provide Registration Number',
                        variant: 'error'
                    });
                    this.dispatchEvent(event);
                    return;
                }

                if (!this.SupplierIDNum && this.IsRegistered=='No') {
                    // Show an error message if the supplier not provide supplier ID
                    const event = new ShowToastEvent({
                        title: 'Error',
                        message: 'Please provide Supplier ID Number',
                        variant: 'error'
                    });
                    this.dispatchEvent(event);
                    return;
                }
                this.validFlag=true;

                
                // Call the backend data storage function with the selected value
                
            }
           
        // REQhandleSubmitClick For VAT Details

            REQhandleSubmitClick() {

                if (!this.ReqType) {                    
                    const event = new ShowToastEvent({
                        title: 'Error',
                        message: 'Please select Req Type',
                        variant: 'error'
                    });
                    this.dispatchEvent(event);
                    return;
                }

                if (!this.CommodityType) {
                    const event = new ShowToastEvent({
                        title: 'Error',
                        message: 'Please select Commodity Type',
                        variant: 'error'
                    });
                    this.dispatchEvent(event);
                    return;
                }

                if (!this.CostCentre) {
                    const event = new ShowToastEvent({
                        title: 'Error',
                        message: 'Please Provide Cost Centre',
                        variant: 'error'
                    });
                    this.dispatchEvent(event);
                    return;
                }

                if (!this.EstimateAmount) {
                    const event = new ShowToastEvent({
                        title: 'Error',
                        message: 'Please Provide Estimate Amount',
                        variant: 'error'
                    });
                    this.dispatchEvent(event);
                    return;
                }
                this.validFlag=true;

                
                
            }
         
        }

