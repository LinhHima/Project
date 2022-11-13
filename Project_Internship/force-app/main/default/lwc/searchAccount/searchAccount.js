import { LightningElement,wire,track } from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';
import { getPicklistValues, getObjectInfo } from 'lightning/uiObjectInfoApi';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
export default class SearchAccount extends LightningElement {
    industryOptions = [];
    arrayAccount = [];
    accountnameValue = '';
    accountnumberValue = '';
    phoneValue = '';
    industryOptionsValue = '';
    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    objectInfo;
    
    @wire(getPicklistValues, { recordTypeId: "$objectInfo.data.defaultRecordTypeId", fieldApiName: INDUSTRY_FIELD })
    industryPickListValues({ error, data }) {
        if (data) {
            this.industryOptions = data.values;
            console.log(data);  
        } else if (error) {
            console.log(error);
        }
    }

    handleChange(event) {
        this.industryOptionsValue = event.detail.value;
    }

    handleChangeName(event){
        this.accountnameValue = event.detail.value;
    }

    handleChangeNumber(event){
        this.accountnumberValue = event.detail.value;
    }

    handleChangePhone(event){
        this.phoneValue = event.detail.value;
    }

    handleClick(event){
        console.log("run");
        
        console.log(this.accountnameValue);
        console.log(this.accountnumberValue);
        console.log(this.phoneValue);
        console.log(this.industryOptionsValue);
    }
}