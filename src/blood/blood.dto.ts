import { IsDate, IsNotEmpty, IsString } from "class-validator"

export class BloodDonationDto{ 
    //update
    @IsString()
    @IsNotEmpty()
    bloodtype:string

    @IsString()
    @IsNotEmpty()
    amount:string

    
    

}


export class bloodResponse extends BloodDonationDto{
    status:string="blood donation info recieved. "
    appreciation:string ="looking foward to the donation date. Thank you so much and god bless You"
}