import { LightningElement, api } from 'lwc';

export default class CustomProgressIndicatorIconComp extends LightningElement {
    progress;
    circles;
    prev;
    next;

    currentActive = 1;

    isLoaded = false;

    steps = [
        {
            name: '1. Details',
            iconName: 'utility:company',
        },
        {
            name: '2.VAT',
            iconName: 'utility:budget_category_value',
        },
        {
            name: '3. Request',
            iconName: 'utility:identity',
        },
    ];


    renderedCallback(){
        if(this.isLoaded){
            return;
        }

        this.isLoaded = true;
        this.progress = this.template.querySelector(".progress");
        this.circles = this.template.querySelectorAll(".circle");
        this.prev = this.template.querySelector("#prev");
        this.next = this.template.querySelector("#next");
        this.updateUI();

    }

    get stepsWithClasses() {
        return this.steps.map((step, index) => ({
            ...step,
            className: index < this.currentStep - 1 ? 'circle active' : 'circle',
        }));
    }

    @api
    handleNext() {
        this.currentActive++;
        if (this.currentActive > this.circles.length) {
            this.currentActive = this.circles.length;
        }
        this.updateUI();

    }
    @api
    handleBack() {
        this.currentActive--;
        if (this.currentActive < 1) {
            this.currentActive = 1;
        }
        this.updateUI();
    }

    updateUI() {
        console.log("inside update ui");
        console.log("circle element"+this.circles.length);
        this.circles.forEach((circle, index) => {
            if (index < this.currentActive) 
            {
                circle.classList.add("active");
            }
            else{ 
                circle.classList.remove("active");
            }
        });

        const actives = this.template.querySelectorAll(".active");
        this.progress.style.width = ((actives.length - 1) / (this.circles.length - 1)) * 100 + "%";
        // if (this.currentActive === 1){
        //      this.prev.disabled = true;
        // }
        // else if (this.currentActive === this.circles.length)
        // { 
        //     this.next.disabled = true;
        // }
        // else {
        //     this.prev.disabled = false;
        //     this.next.disabled = false;
        // }
    }
}