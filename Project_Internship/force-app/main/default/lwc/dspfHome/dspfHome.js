import { LightningElement, api, track } from 'lwc';

export default class DspfHome extends LightningElement {
    @track screenNo = 1;
    userInfo = {
        emailValue : '',
        japaneseVisible : true,
        valueYear : '1980',
        valueMonth : '1',
        valueDay : '1',
        isPhoneJapanese1 : true,
        countryCode1Value : '日本（+81）',
        countryCode2Value : '日本（+81）',
        isPhoneJapanese2 : true
    };

    handleChangeScreen1ToScreen2(event){
        this.screenNo = event.detail.screenNo;
    }
    handleChangeScreen2ToScreen1(event){
        this.screenNo = event.detail.screenNo;
        this.userInfo = {
        emailValue : '',
        japaneseVisible : true,
        valueYear : '1980',
        valueMonth : '1',
        valueDay : '1',
        isPhoneJapanese1 : true,
        countryCode1Value : '日本（+81）',
        countryCode2Value : '日本（+81）',
        isPhoneJapanese2 : true
        };
    }
    handleChangeScreen2ToScreen3(event) {
        this.screenNo = event.detail.screenNo;
        this.userInfo = event.detail.userInfo;
        console.log(this.userInfo);
    }
    handleChangeScreen3ToScreen2(event){
        this.screenNo = event.detail.screenNo;

    }
    handleChangeScreen3ToScreen4(event) {
        console.log('screenNo3: '+ this.screenNo);
        this.screenNo = event.detail.screenNo;
        console.log('screenNo4: '+ this.screenNo);
    }
    get isScreenOn1() {
        return this.screenNo == 1;
    }

    get isScreenOn2() {
        return this.screenNo == 2;
    }

    get isScreenOn3() {
        return this.screenNo == 3;
    }

    get isScreenOn4() {
        return this.screenNo == 4;
    }
}