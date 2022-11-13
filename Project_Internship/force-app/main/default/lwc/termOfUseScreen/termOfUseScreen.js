import { LightningElement, wire ,track, api} from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import getInSeMa from '@salesforce/apex/termOfUseScreenController.getIndividualServiceMasterBySystemId';
export default class TermOfUseScreen extends LightningElement {        
    @wire(CurrentPageReference)
    pageRef;
    @wire(getInSeMa)
    resultInSeMa;
    transitionSourceURL;
    transitionDestinationURL;
    error = false;
    @track isExistBackUrl = false;
    @api screenNo;

    connectedCallback(){
      console.log(this.pageRef);
      if(this.pageRef.state.backUrl || this.pageRef.state.ReturnUrl){
        if(this.pageRef.state.systemId){
            if(this.resultInSeMa){
                // Display the termOfUseScreen -> generate URL
                this.generateURL();
            } else{
              // Exception Handler
              this.error = true;
            }
        } else{
            //Exception Handler
            this.error = true;
        }
      } else{
        //Display the termOfUseScreen ->generate URL
        this.generateURL();
      }
   }   

   //function of processing of display the termOfUseScreen
   generateURL(){
    if(this.pageRef.state.backUrl){
    this.transitionSourceURL = this.resultInSeMa.Domain__c + "/" + this.pageRef.state.backUrl;
    this.isExistBackUrl = true;
    } else{
      this.transitionSourceURL = '';
      this.isExistBackUrl = false;
    }
    if(this.pageRef.state.ReturnUrl){
      this.transitionDestinationURL = this.resultInSeMa.Domain__c + "/" + this.pageRef.state.ReturnUrl;
      } else{
        this.transitionDestinationURL = '';
      }
   }

  // Handler button Agree to switch to Input Screen
  switchToInputScreen(event){
    console.log('run');
    const changeScreenNoEvent = new CustomEvent("screen1switchtoscreen2", {
      detail : {
        screenNo : 2
      }
    });
    this.dispatchEvent(changeScreenNoEvent);
  }
}