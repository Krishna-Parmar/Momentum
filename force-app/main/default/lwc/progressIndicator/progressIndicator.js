import { LightningElement, track } from 'lwc';

export default class ProgressIndicator extends LightningElement {
    @track progressItems = [
        { id: 1, heading: '1. Details', isActive: false },
        { id: 2, heading: '2. VAT', isActive: true },
        { id: 3, heading: '3. Requests', isActive: false }
    ];
}