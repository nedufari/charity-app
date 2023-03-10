import { Date } from "mongoose"

export class MoneydonationDto{ //update
    amount:string
    currecy:string 
    reciept:string
    date:Date

}

export class paymentResponse extends MoneydonationDto{
    status:string="money donation recieved "
    appreciation:string ="thank you so much for your your charitable donation. May the good lord continue to bless and reward you."
}

