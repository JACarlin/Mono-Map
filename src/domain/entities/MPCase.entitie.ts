export interface IMPCase{
    lat:number;
    lng:number;
    isSent:boolean;
    genre:string;
    age:number;
    creationDate:Date;
}

export interface IMPCaseDocument extends Document, IMPCase {}