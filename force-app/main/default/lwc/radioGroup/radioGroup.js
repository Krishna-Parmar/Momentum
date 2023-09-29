import { LightningElement } from 'lwc';

export default class RadioGroupBasic extends LightningElement {


    value = '';

    get options() {
        return [
            { label: 'All', value: 'option1' },
            { label: 'Active on JDE', value: 'option2' },
            { label: 'Inactive on JDE', value: 'option3' },
            { label: 'Blocked on JDE', value: 'option4' },
            { label: 'Not on JDE', value: 'option5' },
        ];
    }
    
}



