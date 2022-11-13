import { api, LightningElement ,track,wire} from 'lwc';
import { getPicklistValues, getObjectInfo } from 'lightning/uiObjectInfoApi';
import TEMP_USER_OBJECT from '@salesforce/schema/TemporaryUser__c';
import COUNTRYCODE1_FIELD from '@salesforce/schema/TemporaryUser__c.CountryCode1__c';
import COUNTRYCODE2_FIELD from '@salesforce/schema/TemporaryUser__c.CountryCode2__c';
import getUserByEmail from '@salesforce/apex/DSPF_UserDAO.getUserByEmail';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
export default class TemporaryRegistrationInputScreen extends LightningElement {
    //get picklist value for countrycode 1 and countrycode 2
    countryCode1Options = [];
    countryCode2Options = [];
    countValidation = 0;
    @api
    screenNo;

    @api userInfo;
    
    @wire(getObjectInfo, { objectApiName: TEMP_USER_OBJECT })
    objectInfo;
    
    @wire(getPicklistValues, { recordTypeId: "$objectInfo.data.defaultRecordTypeId", fieldApiName: COUNTRYCODE1_FIELD })
    countrycode1PickListValues({ error, data }) {
        if (data) {
            this.countryCode1Options = data.values;
            console.log(data);  
        } else if (error) {
            console.log(error);
        }
    }
    @wire(getPicklistValues, { recordTypeId: "$objectInfo.data.defaultRecordTypeId", fieldApiName: COUNTRYCODE2_FIELD })
    countrycode2PickListValues({ error, data }) {
        if (data) {
            this.countryCode2Options = data.values;
            console.log(data);  
        } else if (error) {
            console.log(error);
        }
    }

     // Handle for input Email
     showInfoEmail = false;
     enableEmail;
     emailValid;
     @api emailValue = '';
     handleCheckSOKAID(event){
         this.emailValue = event.target.value;
         console.log(this.emailValue);
         if(event.target.checkValidity()){
             this.showInfoEmail = true;
             getUserByEmail({email: this.emailValue})
             .then(result=>{
                this.emailValid = result;
                 if(result){
                     this.enableEmail = false;
                 } else{
                     this.enableEmail = true;
                 }
             });
         } else{
             this.showInfoEmail = false;
         }
     }

      //Handle for confirm Email
      showInfoConfirmEmail =false;
      @api confirmEmailValue;
      enableConfirmEmail;
      handleConfirmEmail(event){
          this.confirmEmailValue = event.target.value;
          if(this.confirmEmailValue){
              this.showInfoConfirmEmail = true;
          } else{
              this.showInfoConfirmEmail = false;
          }
          if(this.confirmEmailValue == this.emailValue){
              this.enableConfirmEmail = true;
          } else{
              this.enableConfirmEmail = false;
          }
      }

      //Hanlde for Password
      @api passwordValue;
      handlePassword(event){
          this.passwordValue = event.target.value;
      }
  
      // Hanlde for confirm Password
      showInfoConfirmPassword = false;
      @api confirmPasswordValue;
      enableConfirmPassword;
      handleConfirmPassword(event){
          this.confirmPasswordValue = event.target.value;
          if(this.confirmPasswordValue){
              this.showInfoConfirmPassword = true;
          } else{
              this.showInfoConfirmPassword = false;
          }
          if(this.confirmPasswordValue == this.passwordValue){
              this.enableConfirmPassword = true;
          } else if(this.confirmPasswordValue){
              this.enableConfirmPassword = false;
          }
      }

    
    // Handler for groupButton with choosing Japanese or Alphabet

    value = '';
    get options() {
        return [
            { label: '氏名を日本語で登録', value: 'japanese' },
            { label: '氏名をアルファベットで登録', value: 'alphabet' },
        ];
    }
    value = 'japanese';
    @api japaneseVisible;
    handleChangeButton(event) {
        const selectOption = event.detail.value;
        if(selectOption == 'japanese'){
            this.japaneseVisible = true;
        }
        else if(selectOption == 'alphabet'){
            this.japaneseVisible = false;
            console.log("JPNvisible false " + this.japaneseVisible);

        }
    }

    // Handler for choosing Japanese
    @api surnameValue;
    handleSurname(event){
        this.surnameValue = event.target.value;
    }
    @api nameValue;
    handleName(event){
        this.nameValue = event.target.value;
    }
    @api surnameKanaValue;
    handleSurnameKana(event){
        this.surnameKanaValue = event.target.value;
    }
    @api firstNameKanaValue;
    handleFirstnameKana(event){
        this.firstNameKanaValue = event.target.value;
    }
    // Handler for choosing Alphabet
    @api lastNameValue;
    handleLastName(event){
        this.lastNameValue = event.target.value;
    }
    @api firstNameValue;
    handleFirstName(event){
        this.firstNameValue = event.target.value;
    }
    // Handler for choosing Year
    get optionYear() {
        let optionsYear = [];
        const startYear = 1900;
        const endYear = 2200;
        for(let i = startYear; i <= endYear; i++) {
            optionsYear.push({ label: i.toString(), value: i.toString() });
          }
        return optionsYear;
    }
    @api valueYear;
    handleChangeYear(event){
        this.valueYear = event.detail.value;
    }

    // Handler for choosing Month
    get optionMonth() {
        let optionsMonth = [];
        const startMonth = 1;
        const endMonth = 12;
        for(let i = startMonth; i <= endMonth; i++) {
            optionsMonth.push({ label: i.toString(), value: i.toString() });
          }
        return optionsMonth;
    }
    @api valueMonth;
    handleChangeMonth(event){
        this.valueMonth = event.detail.value;
    }

    //Handler for choosing Day
    get optionDay() {
        let optionsDay = [];
        const startDay = 1;
        let endDay = 31;
        let month = parseInt(this.valueMonth);
        //Check the leap year and February
        if((parseInt(this.valueYear)%400==0)||(parseInt(this.valueYear)%4==0 && parseInt(this.valueYear)%100!=0)){
            if(month==2){
                endDay = 29;
            }
        } else{
            if(month==2){
                endDay = 28;
            }
        }
        if(month==1 || month==3 || month==5 || month==7 || month==8 || month==10 || month==12){
            endDay = 31;
        }else if(month != 2){
            endDay = 30;
        }
        for(let i = startDay; i <= endDay; i++) {
            optionsDay.push({ label: i.toString(), value: i.toString() });
          }
        return optionsDay;
    }
    @api valueDay;
    handleChangeDay(event){
        this.valueDay = event.detail.value;
    }

    //Handler for choosing Mobile phone
    @api countryCode1Value;
    @api isPhoneJapanese1;
    handleChangePhone1(event){
        this.countryCode1Value = event.detail.value;
       if(this.countryCode1Value == '日本（+81）'){
        this.isPhoneJapanese1 = true;
       } else{
        this.isPhoneJapanese1 = false;
       }
    }
    @api firstNumberPhoneJpn1;
    handlefirstNumberPhoneJpn1(event){
        this.firstNumberPhoneJpn1 = event.target.value;
    }
    @api secondNumberPhoneJpn1;
    handlesecondNumberPhoneJpn1(event){
        this.secondNumberPhoneJpn1 = event.target.value;
    }
    @api thirdNumberPhoneJpn1;
    handlethirdNumberPhoneJpn1(event){
        this.thirdNumberPhoneJpn1 = event.target.value;
    }
    @api numberPhone1;
    handlenumberPhone1(event){
        this.numberPhone1 = event.target.value;
    }
    //Handler for choosing Home phone
    @api countryCode2Value;
    @api isPhoneJapanese2;
    handleChangePhone2(event){
        this.countryCode2Value = event.detail.value;
       if(this.countryCode2Value == '日本（+81）'){
        this.isPhoneJapanese2 = true;
       } else{
        this.isPhoneJapanese2 = false;
       }
    }
    @api firstNumberJpn2;
    handlefirstNumberJpn2(event){
        this.firstNumberJpn2 = event.target.value;
    }
    @api secondNumberJpn2;
    handlesecondNumberJpn2(event){
        this.secondNumberJpn2 = event.target.value;
    }
    @api thirdNumberJpn2;
    handlethirdNumberJpn2(event){
        this.thirdNumberJpn2 = event.target.value;
    }
    @api numberPhone2;
    handlenumberPhone2(event){
        this.numberPhone2 = event.target.value;
        console.log(this.numberPhone2);
    }
    // Handle for the button Return to back to TermOfUseScreen
    switchTermOfUseScreen(event){
        const changeScreenNoEvent = new CustomEvent("switchtermscreen", {
            detail : {screenNo: 1, 
                }
          });
          this.dispatchEvent(changeScreenNoEvent);
    }

    //Handle for the button Proceed to confirm 
    switchTempConfirmScreen(event){
        const isInputsCorrect = [...this.template.querySelectorAll('lightning-input')]
            .reduce((validSoFar, inputField) => {
                inputField.reportValidity();
                return validSoFar && inputField.checkValidity();
            }, true);
        if (isInputsCorrect&&!this.emailValid) {
         //perform success logic

         // Process to hide password value
         let hiddenPassword = '';
         for(let i = 0; i < this.passwordValue.length; i++) {
            hiddenPassword += '*';
         }
         const changeScreenNoEvent = new CustomEvent("switchconfirmscreen", {
             detail : {screenNo: 3, 
                    userInfo: {
                        emailValue : this.emailValue,
                        confirmEmailValue : this.confirmEmailValue,
                        passwordValue : this.passwordValue,
                        hiddenPassword : hiddenPassword,
                        confirmPasswordValue : this.confirmPasswordValue,
                        japaneseVisible : this.japaneseVisible,
                        surnameValue: this.surnameValue,
                        nameValue: this.nameValue,
                        surnameKanaValue : this.surnameKanaValue,
                        firstNameKanaValue : this.firstNameKanaValue,
                        lastNameValue : this.lastNameValue,
                        firstNameValue : this.firstNameValue,
                        valueYear : this.valueYear,
                        valueMonth : this.valueMonth,
                        valueDay : this.valueDay,
                        countryCode1Value : this.countryCode1Value,
                        isPhoneJapanese1: this.isPhoneJapanese1,
                        firstNumberPhoneJpn1 : this.firstNumberPhoneJpn1,
                        secondNumberPhoneJpn1 : this.secondNumberPhoneJpn1,
                        thirdNumberPhoneJpn1 : this.thirdNumberPhoneJpn1,
                        countryCode2Value : this.countryCode2Value,
                        isPhoneJapanese2 : this.isPhoneJapanese2,
                        firstNumberJpn2 : this.firstNumberJpn2,
                        secondNumberJpn2 : this.secondNumberJpn2,
                        thirdNumberJpn2: this.thirdNumberJpn2,
                        numberPhone1 : this.numberPhone1,
                        numberPhone2 : this.numberPhone2,
                    }}
           });
           this.dispatchEvent(changeScreenNoEvent);
        } else {
            const toastEvent = new ShowToastEvent({
                title:'WARNING!',
                message:'PLEASE INPUT CORRECTLY!',
                variant:'warning'
            });
            this.dispatchEvent(toastEvent);
        }
    }

}