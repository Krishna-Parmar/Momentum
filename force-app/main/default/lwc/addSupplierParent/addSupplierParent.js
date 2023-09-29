import { LightningElement,track,api,wire } from 'lwc';
import { NavigationMixin,CurrentPageReference } from 'lightning/navigation';

export default class AddSupplierParent extends NavigationMixin(LightningElement) {

    pageStatus;
    pageNumber;
    pageValues=["supplierdetails","vatdetails","requestdetails"];
    pageName="supplierdetails";
    validFlag =false;
    @api recordId;

    @wire(CurrentPageReference)
    getStateParameters(currentPageReference) {
       if (currentPageReference) {  
            console.log("inside curentpagerefernece");
            console.log(currentPageReference);
            if(currentPageReference.state?.recordId!='' && currentPageReference.state?.recordId!= undefined){
                this.recordId = currentPageReference.state?.recordId;
                }
          
         }
    }

    handleHeaderButtonClick(event){
        console.log("inside parent handleButtonClick");
        console.log(event.detail);
        let buttonAction=event.detail.buttonAction;
        console.log(buttonAction);
        if(buttonAction=="submit"){
            this.template.querySelector("c-add-supplier-details-componen").handleApexSubmitDetailsPublicMethod();
            console.log("inside submitdetailsbuttonclick1");
            this[NavigationMixin.Navigate]({
                type: 'standard__webPage',
                attributes: {
                    url: '/vendormanagement'
                }
            });
        }
        else if(buttonAction=="savedraft")
        {
            this.template.querySelector("c-add-supplier-details-componen").handleApexSaveDraftDetailsPublicMethod();
        }
                

    }

    handleButtonClick(event)
    {
        console.log("inside parent handleButtonClick");
        console.log(event.detail);
        let buttonAction=event.detail.buttonAction;
        console.log(buttonAction);
        if(buttonAction=="back"){
            if(this.pageName=="vatdetails"){
                this.pageName="supplierdetails";

            }
            else if(this.pageName=="requestdetails"){
                this.pageName="vatdetails";
            }
            this.template.querySelector("c-custom-progress-indicator-icon-comp").handleBack();
        }
        else if(buttonAction=="submit"){
            if(this.pageName=="requestdetails"){
                this.validFlag=this.template.querySelector("c-add-supplier-details-componen").handleValidationPage3();
                if(!this.validFlag){
                    return;
                }
                this.template.querySelector("c-model-popup").openModal();
        }
    }

        else{
            if(this.pageName=="vatdetails"){
                console.log("before vatdetails validFlag: "+this.validFlag);
                this.validFlag=this.template.querySelector("c-add-supplier-details-componen").handleValidationPage2();
                console.log("after vatdetails validFlag: "+this.validFlag);
                if(!this.validFlag){
                    return;
                }
                this.pageName="requestdetails";
                
            }
            else if(this.pageName=="supplierdetails"){
                this.validFlag=this.template.querySelector("c-add-supplier-details-componen").handleValidationPage1();
                if(!this.validFlag){
                    return;
                }
                this.pageName="vatdetails";
            }
            this.template.querySelector("c-custom-progress-indicator-icon-comp").handleNext();
        }
    }

        submitDetailsButtonClick() {
        // Show "ComponentB" when the button is clicked
        // this.showsuccessfulPopup = true;
        console.log("inside submitdetailsbuttonclick method");
        this.template.querySelector("c-add-supplier-details-componen").handleApexSubmitDetailsPublicMethod();
        this.template.querySelector("c-successful-popup").openModal();

    }

    submitDetailsButtonClick1(){
        console.log("inside submitdetailsbuttonclick1");
            this[NavigationMixin.Navigate]({
                type: 'standard__webPage',
                attributes: {
                    url: '/vendormanagement'
                }
            });

    }


}