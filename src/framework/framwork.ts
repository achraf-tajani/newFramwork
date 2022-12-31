
import { ProvideModel } from "../models/provide.model";
import { ServiceModel } from "../models/service.model";

export class MyFramwork{
    directives:any[] = []; 
    /**
     * le tableau qui contient les instances  de service  deja construites 
     * (pour ne pas les reconstruire a nouveau)
     */

    services:ServiceModel[] = [];
    /**
    * le tableau qui contient les definitions de mes services
    */
    providers:ProvideModel[] = [];

    /**
     * Le traitement qui va instancier les  directives et les greffer 
     * aux elements Html ciblés par les selecteurs CSS
     */
    bootstrapApplication(metadata:{providers?:any[],declarations:any[]}){
        this.providers = metadata.providers || [];
        this.directives = metadata.declarations;
        this.directives.forEach(directive=>{
            const elements = document.querySelectorAll<HTMLElement>(directive.selector);
        
            elements.forEach(element=>{
                const params = this.analyseDirectiveConstructor(directive,element);
                const objetDirecrtive:any = Reflect.construct(directive,params);
                objetDirecrtive.init();
            });
        });
    }

    /** Perlet d'analyser les besoins d'un  constructeur et de creer les instances necessaires
    * @param directive la classe de la directive a instancier
    * @param  element l'element html  sur lequel on veut greffer le comportent front
    * @returns un tableau de parametres necessaire pour instancier une directive
    **/
    private analyseDirectiveConstructor(directive,element:HTMLElement){
        const hasConstructor = /constructor\(.*\)/g.test(directive.toString());
        if(!hasConstructor){
            return [];
        }
        const paramsConstrcutNames = this.extractParamsFromConstructDirective(directive);
        const params = paramsConstrcutNames.map( param => {
            // si on souhaite l'element on le retourne
            if(param === 'element') return element;
            // on cherche si on a un provider privé a la directive
            const directiveProviders = directive.providers || [];
    
            const directiveProvider:ProvideModel =   directiveProviders.find(d=>d.provide == param);
    
            if(directiveProvider){
                const instance = directiveProvider.construct();
                return instance;
            }
    
    
            // si on a un service on le retourne
            const service = this.services.find(s=>s.name == param);
            if(service) return service.instance;
            // si on souhaite un service qui n'est pas deja instancié on va le chercher depuis les 
            // les providers
            const provider = this.providers.find(p=>p.provide === param);
            if(!provider) throw new Error("Aucun fournisseur de serivce pour "  + param);
            const instance = provider.construct();
            this.services.push({name:param,instance:instance});
            return instance; 
        });
        return params;
    }
    /**
     * Extrait les noms des parametres du constructeur dune directive 
     * @param directive la directive dont je veux connaitre les parametres
     * @returns un tableau avec les noms des parametres du constructeur
     */
    private extractParamsFromConstructDirective(directive){
        const params = /constructor\((.*)\)/g.exec(directive.toString());
        if(!params) return [];
        return params[1].split(', ');
    }
}

export const  Angular  = new MyFramwork();