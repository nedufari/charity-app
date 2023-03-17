import { Date } from "mongoose"

export class MoneydonationDto{ //update
    amount:string
    currency:string 
    reciept:string
    

}

export class paymentResponse extends MoneydonationDto{
    status:string="money donation recieved "
    appreciation:string ="thank you so much for your your charitable donation. May the good lord continue to bless and reward you."
}

