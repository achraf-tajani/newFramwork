import { ProvideModel } from "../models/provide.model";
import { FormatterService } from "../services/formatter.service";


export class PhoneNumberDirective{
    static selector = '[phone-number]';
    static providers:ProvideModel[] = [
        {
            provide:"formatterService",
            construct: ()=> new FormatterService("specifique")
        },
    ]
    withHaveSpace = true;
    borderColor="red";
    constructor(
            public element:HTMLElement,
            private formatterService:FormatterService)
    {}

    init(){
        if(this.element.hasAttribute('with-spaces')){
            this.withHaveSpace = this.element.getAttribute('with-spaces') === "true";
        }
        if(this.element.hasAttribute('border-color')){
            this.borderColor = this.element.getAttribute('border-color')!;
        }
        this.element.style.borderColor= this.borderColor;
        this.element.addEventListener('input',(event)=>{
            const element = event.target as HTMLInputElement;
            element.value = this.formatterService.formatPhoneNumber(element.value,10,2,this.withHaveSpace);
        })
    }
}