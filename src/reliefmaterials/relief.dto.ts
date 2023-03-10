import { Date } from "mongoose"

export class ReliefMaterialDto{ //update
    description:string 
    image:string
    date:Date
}

export class ReliefResponse extends ReliefMaterialDto{
    status:string="relief material info recieved "
    appreciation:string ="thank you so much for your your charitable donation. May the good lord continue to bless ad reward you."
}

