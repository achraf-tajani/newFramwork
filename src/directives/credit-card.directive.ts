import { CreditCardVerifierService } from "../services/credit-card-verifier.service";
import { FormatterService } from "../services/formatter.service";

export class CreditCardDirective{
    static selector = '[credit-card]';
    constructor(
        private verifyCreditCardService:CreditCardVerifierService,
        public element:HTMLElement,
        private formatterService:FormatterService
        )
    {}

    init(){
        this.element.style.borderColor= 'blue';
        this.element.addEventListener('input',(event)=>{
            const element = event.target as HTMLInputElement;
            element.value = this.formatterService.formatPhoneNumber(element.value,16,4,true);
        })
    }
}