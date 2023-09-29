import { LightningElement , api} from 'lwc';

export default class CustomProgressIndicator extends LightningElement {

    @api status; // The status value to determine progress
    steps = [
        { id: 'step1', label: 'Step 1', iconUrl: '/resource/step1-icon.png' },
        { id: 'step2', label: 'Step 2', iconUrl: '/resource/step2-icon.png' },
        { id: 'step3', label: 'Step 3', iconUrl: '/resource/step3-icon.png' },
        { id: 'step4', label: 'Step 4', iconUrl: '/resource/step4-icon.png' }
    ];

    stepClass(step) {
        if (this.status === step.id) {
            return 'active-step';
        } else if (this.status && this.steps.findIndex(s => s.id === this.status) > this.steps.findIndex(s => s.id === step.id)) {
            return 'completed-step';
        } else {
            return 'inactive-step';
        }
    }

    pathClass(step) {
        if (this.status && this.steps.findIndex(s => s.id === this.status) > this.steps.findIndex(s => s.id === step.id)) {
            return 'completed-path';
        } else {
            return 'incomplete-path';
        }
    }
}