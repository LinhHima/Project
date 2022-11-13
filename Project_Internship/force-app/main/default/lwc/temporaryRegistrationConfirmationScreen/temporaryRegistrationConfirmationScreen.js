import { api, LightningElement } from 'lwc';
import insertTemporaryUser from '@salesforce/apex/createTemporaryUser.insertTemporaryUser';
import sendEmail from '@salesforce/apex/createTemporaryUser.sendEmail';
import encryptDataAES128 from '@salesforce/apex/createTemporaryUser.encryptDataAES128';
import hashDataSHA512 from '@salesforce/apex/createTemporaryUser.hashDataSHA512';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
export default class TemporaryRegistrationConfirmationScreen extends LightningElement {
    @api userInfo;
    @api screenNo;
    initVector;
    hashData;
    linkData;
    
    
      connectedCallback(){
        this.initVector = this.randomnumber(16);
        this.encryptData =  encryptDataAES128({
            stringInitializationVector: this.initVector,
            stringData: this.userInfo.passwordValue
        });
        this.hashData =  hashDataSHA512({
            stringData: this.userInfo.emailValue + this.randomnumber(18)
        });
        this.linkData = 'https://cunning-narwhal-t1xof3-dev-ed.my.site.com/project/s/register-sokaId-complete'+ 
                        '?temporaryUserId=' + this.hashData;
        console.log('Print the link: '+this.linkData);
        console.log('vector: ', JSON.stringify(this.initVector));
        console.log('hashData: ', JSON.stringify(this.hashData));

    }
    randomnumber(size){
        let result = '';
        for(let i=0; i<size; i++){
            result += Math.floor(Math.random() * 10);
            console.log(result);
        }
        console.log('Result: '+result);
        return result;
    }
          
   
    //Handle the button return to Input Screen
    switchBackInputScreen(event){
        const changeScreenNoEvent = new CustomEvent("backinputscreen", {
            detail : {screenNo: 2, 
                }
          });
          this.dispatchEvent(changeScreenNoEvent);
    }
    //Handle button register 
    saveTemporaryUserAction(event){
        let tempUser = {
            Email__c : this.userInfo.emailValue,
            Name : this.userInfo.emailValue,
            Password__c : this.userInfo.passwordValue,
            NameInputType__c : (this.userInfo.japaneseVisible) ? '1' : '2',
            FirstName__c : (this.userInfo.japaneseVisible) ? this.userInfo.surnameValue : this.userInfo.firstNameValue,
            LastName__c : (this.userInfo.japaneseVisible) ? this.userInfo.nameValue :this.userInfo.lastNameValue,
            FirstNameKana__c : (this.userInfo.japaneseVisible) ? this.userInfo.surnameKanaValue : null,
            LastNameKana__c : (this.userInfo.japaneseVisible) ? this.userInfo.FirstNameKana__c : null,
            BirthDay__c	: new Date(this.userInfo.valueYear, this.userInfo.valueMonth,this.userInfo.valueDay),
            CountryCode1__c : this.userInfo.countryCode1Value,
            Phone1__c : (this.userInfo.isPhoneJapanese1) ? this.userInfo.firstNumberPhoneJpn1 + '-' + 
            this.userInfo.secondNumberPhoneJpn1 + '-' + 
            this.userInfo.thirdNumberPhoneJpn1 : this.userInfo.numberPhone1,
            CountryCode2__c : this.userInfo.countryCode2Value,
            Phone2__c : (this.userInfo.isPhoneJapanese2) ? this.userInfo.firstNumberJpn2 + '-' + 
            this.userInfo.secondNumberJpn2 + '-' + 
            this.userInfo.thirdNumberJpn2 : this.userInfo.numberPhone2,
            InitializationVector__c : this.initVector,
            HashingTemporaryUserId__c : this.hashData,
        }
        console.log('tempUser', JSON.stringify(tempUser));
        insertTemporaryUser({temUserObject: tempUser})
        .then(result=>{
            console.log('successfully create tempUser!' + result);
            const toastEvent = new ShowToastEvent({
                title:'Success!',
                message:'Account created successfully',
                variant:'success'
            });
            this.dispatchEvent(toastEvent);
            console.log('Print email need to send: '+tempUser.Email__c);
            console.log('print the link to be sent: '+this.linkData);
            sendEmail({address: tempUser.Email__c, linkData: this.linkData})
            .then(result=>{
                console.log('successfully sending Email!' + result);
                const changeScreenNoEvent = new CustomEvent("switchregistrationcompletionscreen", {
                    detail : {screenNo: 4, 
                        }
                    });
                    this.dispatchEvent(changeScreenNoEvent);
            });
        })
        .catch(error=>{
            this.error=error.message;
            console.log('eror', error);
         });
        
    }
}