import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class LandingPageActionButtons extends NavigationMixin(LightningElement) {

    handleVendorManagement() {
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: '/vendormanagement'
            }
        });
    }
}