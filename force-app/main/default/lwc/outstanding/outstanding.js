import { LightningElement, track } from 'lwc';

export default class Outstanding extends LightningElement 
{
    @track selectedOption = ' ';
    handleOptionChange(event) {
        this.selectedOption = event.target.value;
    }
}