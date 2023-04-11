import { IsString } from "class-validator"
import { Date } from "mongoose"

export class MoneydonationDto{ 
    //update
    @IsString()
    amount:string

    @IsString()
    currency:string 

    @IsString()
    reciept:string
    

}

export class paymentResponse extends MoneydonationDto{
    status:string="money donation recieved "
    appreciation:string ="thank you so much for your your charitable donation. May the good lord continue to bless and reward you."
}

