import { LightningElement,wire ,track, api} from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import getTemporaryUser from '@salesforce/apex/createUser.getTemporaryUser';
import checkUserEmail from '@salesforce/apex/createUser.checkUserEmail';
import createSiteUser from '@salesforce/apex/createUser.createSiteUser';
export default class DspfCompletionScreen extends LightningElement {
    pageRef;
    tempUser;
    communityNickName;
    tempLink;
    @wire(CurrentPageReference)
    wirePageRef(data){
        if(data){
            this.pageRef = data;
            this.tempLink = this.pageRef.state.temporaryUserId + '==';
        }
    }
   
    @track isScreenSuccess = false;
    @track isScreenError = false;
    @track isScreenExpirationDate = false;
    connectedCallback(){
        console.log('link: ',JSON.stringify(this.pageRef));
        console.log('temporaryUserId: '+this.pageRef.state.temporaryUserId);
        console.log('tempLink: '+this.tempLink);
        if(this.tempLink)  {
                    console.log('TempLink in the If: '+this.tempLink);
                    getTemporaryUser({hashData: this.tempLink})
                    .then(result=>{
                        let aliasUser = '';
                        this.tempUser = result;
                        console.log('Get Tem User: ', JSON.stringify(this.tempUser));
                        aliasUser = this.tempUser.LastName__c + this.tempUser.FirstName__c;
                        console.log('print AliasUser before: '+aliasUser);
                        let lenghtOfAlias = aliasUser.length;
                        console.log('length of Alias: '+lenghtOfAlias);
                        if(lenghtOfAlias > 8){
                            aliasUser =  aliasUser.substring(aliasUser.length - 8);
                        }
                        console.log('print AliasUser after: '+aliasUser);
                        this.communityNickName = this.tempUser.LastName__c + this.tempUser.FirstName__c + this.tempUser.AutoNumberCommonUserId__c;
                        if(this.communityNickName.length>40){
                            this.communityNickName =  this.communityNickName.substring(0,24);
                        }
                        let userSF = {
                            Username : this.tempUser.Email__c,
                            CommonUserId__c : this.tempUser.AutoNumberCommonUserId__c,
                            Email : this.tempUser.Email__c,
                            LastName : this.tempUser.LastName__c,
                            FirstName : this.tempUser.FirstName__c,
                            Alias : aliasUser,
                            CommunityNickname : this.communityNickName,
                            NameInputType__c : this.tempUser.NameInputType__c,
                            LastNameKana__c	: this.tempUser.LastNameKana__c,
                            FirstNameKana__c : this.tempUser.FirstNameKana__c,
                            BirthDay__c : this.tempUser.BirthDay__c,
                            CountryCode1__c: this.tempUser.CountryCode1__c,
                            Phone1__c : this.tempUser.Phone1__c,
                            CountryCode2__c : this.tempUser.CountryCode2__c,
                            Phone2__c : this.tempUser.Phone2__c,
                        }
                        console.log('Get User after asigning: ', JSON.stringify(userSF));
                        let isExistEmail = true;
                        checkUserEmail({email: userSF.Username })
                        .then(result=>{
                            isExistEmail = result;
                            console.log('Result: '+result);
                            console.log('isExistEmail: '+isExistEmail);
                            if(isExistEmail){
                                // if email exist in User, show Error Screen 
                                console.log('Email exist in User, cannot insert User !');
                                this.isScreenSuccess = false;
                                this.isScreenError = true;
                            } else{
                                // if email doesn't exist in User, insert User in Salesforce then show Success screen
                                createSiteUser({userSF: userSF, passwordUser: this.tempUser.Password__c})
                                .then(result=>{
                                    console.log('Insert successfully!'+result);
                                    this.isScreenSuccess = true;
                                    this.isScreenError = false;
                                })
                                .catch(error=>{
                                    this.error=error.message;
                                    console.log('Cannnot insert User!', error);
                                    this.isScreenSuccess = false;
                                    this.isScreenError = true;
                                 });
                            }
                        })
                      })

        }
        console.log('gf' ,this.tempLink);
        }
}