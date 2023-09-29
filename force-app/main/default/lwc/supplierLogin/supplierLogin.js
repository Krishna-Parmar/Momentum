import { LightningElement ,track} from 'lwc';

export default class SupplierLogin extends LightningElement {
    
    
    @track username = '';
    @track password = '';

    handleUsernameChange(event) {
        this.username = event.target.value;
    }

    handlePasswordChange(event) {
        this.password = event.target.value;
    }

    handleLoginClick() {
        // Implement your authentication logic here
        // You can use Apex to make a call to your backend or authenticate with an external system
        // Example: Call an Apex method for authentication
        // import authenticateUser from '@salesforce/apex/AuthenticationController.authenticateUser';
        // authenticateUser({ username: this.username, password: this.password })
        //     .then(result => {
        //         // Handle the authentication result
        //     })
        //     .catch(error => {
        //         // Handle authentication error
        //     });
    }


}