export class BloodDonationDto{ //update
    bloodtype:string
    amount:string
    date:string

}


export class bloodResponse extends BloodDonationDto{
    status:string="blood donation info recieved. "
    appreciation:string ="looking foward to the donation date. Thank you so much ad god bless You"
}