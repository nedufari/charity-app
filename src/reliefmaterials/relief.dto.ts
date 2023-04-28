import { IsNotEmpty, IsString } from "class-validator"
import { Date } from "mongoose"

export class ReliefMaterialDto{ 
    
    @IsString()
    @IsNotEmpty()
    description:string 

    @IsString()
    image:string


}

export class ReliefResponse extends ReliefMaterialDto{
    status:string="relief material info recieved "
    appreciation:string ="thank you so much for your your charitable donation. May the good lord continue to bless ad reward you."
}

