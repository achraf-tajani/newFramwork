export class FormatterService{
    constructor(name:string){
        console.log("je suis construit", name)
    }
    formatPhoneNumber(initalValue:string,length:number,groupeLength:number,haveSpace:boolean){
        const value = initalValue.replace(/[^\d+]/g,'').substring(0,length);
        const groups:string[] = [];

        for(let i=0;i<value.length;i+=groupeLength){
            groups.push(value.substring(i,i+groupeLength))
        }
        return groups.join(haveSpace ? ' ': '');
    }
}