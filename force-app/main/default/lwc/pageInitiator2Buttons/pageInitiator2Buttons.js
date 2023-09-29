import { LightningElement, api } from 'lwc';

export default class PageInitiator2Buttons extends LightningElement {

    @api pageName;
    buttonAction;

    get displaybackbutton(){
        if(this.pageName=="vatdetails" || this.pageName=="requestdetails"){
            return true;
        }
        else{
            return false;
        }

    }
    get displaynextbutton(){
        if(this.pageName=="vatdetails" || this.pageName=="supplierdetails"){
            return true;
        }
        else{
            return false;
        }
        
    }
    get displaysubmitbutton(){
        if(this.pageName=="requestdetails"){
            return true;
        }
        else{
            return false;
        }
        
    }

    handleBack(){
        this.buttonAction="back";
        let detailobj={buttonAction:this.buttonAction};
        this.dispatchEvent(new CustomEvent("handlebtnclick",{detail:detailobj}));

    }

    handleNext(){
        this.buttonAction="next";
        let detailobj={buttonAction:this.buttonAction};
        console.log("initator : "+this.buttonAction);
        this.dispatchEvent(new CustomEvent("handlebtnclick",{detail:detailobj}));
    }

    handleSubmit(){
        this.buttonAction="submit";
        let detailobj={buttonAction:this.buttonAction};
        this.dispatchEvent(new CustomEvent("handlebtnclick",{detail:detailobj}));

    }

}