import { LightningElement, api, wire } from 'lwc';
import getRelatedFilesByRecordId from '@salesforce/apex/CustomFileController.getRelatedFilesByRecordId';
import {NavigationMixin} from 'lightning/navigation';
// import basePath from "@salesforce/community/basePath";

export default class CustomShowFiles extends  NavigationMixin(LightningElement) {

    @api recordId;
    filesList =[];
    @wire(getRelatedFilesByRecordId, {recordId: '$recordId'})
    wiredResult({data, error}){ 
        if(data){ 
            console.log(data)
            // let sitePrefix = basePath.replace(/\/s$/i, "");
            // sitePrefix = basePath.replace(/\/approverpage$/i, ""); // site prefix is the site base path without the trailing "/s"
            // console.log(sitePrefix);
            // return sitePrefix + "/secur/logout.jsp";
            this.filesList = Object.keys(data).map(item=>({"label":data[item],
             "value": item,
             "url":`/sfc/servlet.shepherd/document/download/${item}`
            }))
            console.log(this.filesList)
        }
        if(error){ 
            console.log(error)
        }
    }
    previewHandler(event){
        console.log(event.target.dataset.id)
        this[NavigationMixin.Navigate]({ 
            type:'comm__namedPage',
            attributes:{ 
                pageName:'filePreview'
            },
            state:{ 
                selectedRecordId: event.target.dataset.id
            }
        })
    }

}