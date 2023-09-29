import { LightningElement ,api} from 'lwc';
import BackgroundImg from '@salesforce/resourceUrl/LandingPageBig';

export default class LandingPageParent extends LightningElement {
    @api BackgroundImg;
    imgUrl = BackgroundImg;
    get getBackgroundImage(){
        console.log(this.imgUrl);
        return `background-image:url("${this.imgUrl}");background-size:'cover';height:720px;`;
    }
}