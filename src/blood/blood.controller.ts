import { Controller, HttpStatus, Post } from "@nestjs/common";
import { BloodDonationDto, bloodResponse } from "./blood.dto";
import { Blood, BloodDocument } from "./blood.schema";
import { BloodService } from "./blood.service";

@Controller("blood")
export class BloodController{
    constructor(private bloodservice:BloodService){}

    @Post("/donate")
    
    async donation(dto:BloodDonationDto):Promise<BloodDocument>{
        return await this.bloodservice.donateblood(dto)
    }
}