import { LightningElement,wire } from 'lwc';
import { CurrentPageReference,NavigationMixin } from 'lightning/navigation';
import { getRecord } from 'lightning/uiRecordApi';
import USER_ID from '@salesforce/user/Id';
import basePath from "@salesforce/community/basePath";
import getLogoutUrl from '@salesforce/apex/applauncher.IdentityHeaderController.getLogoutUrl';

const fields = ['User.FirstName', 'User.LastName', 'User.SmallPhotoUrl'];

export default class CustomUserProfileDetails extends NavigationMixin(LightningElement) {
    @wire(CurrentPageReference) pageRef;


    userName;
    showLogout = false; 
    userProfilePicUrl;

    @wire(getRecord, {
        recordId: USER_ID,
        fields
    })
    wireUser({ error, data }) {
        if (data) {
            const user = data.fields;
            this.userName = `${user.FirstName.value} ${user.LastName.value}`;
            this.userProfilePicUrl = user.SmallPhotoUrl.value;
        } else if (error) {
            console.error(error);
        }
    }

    toggleLogout() {
        this.showLogout = !this.showLogout;
    }

    get logoutLink() {
        const sitePrefix = basePath.replace(/\/s$/i, ""); // site prefix is the site base path without the trailing "/s"
        console.log(sitePrefix);
        return sitePrefix + "/secur/logout.jsp";
    }

    handleLogout() {
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: this.logoutLink
            }
        });
    }

    
}