export class PersonDetails{
    firstName!:string;
    lastName!:string;
    emailAddress!:string;
    phoneNumber!:string;
    address!:string;
    demographics:Array<Demographics>=new Array<Demographics>();
    totalRecords!:number;
}

export class Demographics{
    age!:number;
    gender!:string;
    maritalStatus!:string;
    education!:string
}