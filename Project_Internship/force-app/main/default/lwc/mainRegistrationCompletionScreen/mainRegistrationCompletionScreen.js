import { LightningElement } from 'lwc';
import { NavigationMixin } from "lightning/navigation";
export default class MainRegistrationCompletionScreen extends NavigationMixin(
    LightningElement
  ){
    handleCompletion(event){
        console.log('This is redirection link!');
        this[NavigationMixin.Navigate]({
            type: "standard__webPage",
            attributes: {
              url: "https://cunning-narwhal-t1xof3-dev-ed.my.site.com/project/s/login"
            }
          });
        console.log('Direct complete!');
    }
}