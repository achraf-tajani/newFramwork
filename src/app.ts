import { CreditCardDirective } from "./directives/credit-card.directive";
import { PhoneNumberDirective } from "./directives/phone-number.directive";
import { Angular } from "./framework/framwork";
import { ProvideModel } from "./models/provide.model";
import { CreditCardVerifierService } from "./services/credit-card-verifier.service";
import { FormatterService } from "./services/formatter.service";
const providers:ProvideModel[] = [
    {
        provide:"formatterService",
        construct: ()=> new FormatterService("global")
    },
    {
        provide:"verifyCreditCardService",
        construct: ()=> new CreditCardVerifierService()
    }
    
];
const directives = [PhoneNumberDirective,CreditCardDirective];

Angular.bootstrapApplication({
    declarations:directives,
    providers:providers
})

